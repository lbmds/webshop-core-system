
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create a Supabase client with the Auth context of the function
const supabaseClient = createClient(
  // Supabase API URL - env var exported by default.
  Deno.env.get('SUPABASE_URL') ?? '',
  // Supabase API ANON KEY - env var exported by default.
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  // Create client with Auth context of the user that called the function.
  { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the user ID from the request
    const authorization = req.headers.get('Authorization');
    
    if (!authorization) {
      throw new Error('No authorization header provided');
    }

    // Verify the JWT token
    const token = authorization.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error('Invalid token or user not found');
    }

    const { data: body, error: parseError } = await req.json()
      .then(data => ({ data, error: null }))
      .catch(error => ({ data: null, error }));
      
    if (parseError) {
      throw new Error('Error parsing request body: ' + parseError.message);
    }

    const { productId } = body || {};
    
    if (!productId) {
      throw new Error('Product ID is required');
    }

    // Get the target product category
    const { data: productData, error: productError } = await supabaseClient
      .from('products')
      .select('category')
      .eq('id', productId)
      .single();

    if (productError || !productData) {
      throw new Error('Product not found');
    }

    // Get similar products in the same category (excluding the current product)
    const { data: recommendedProducts, error: recommendationsError } = await supabaseClient
      .from('products')
      .select('*')
      .eq('category', productData.category)
      .neq('id', productId)
      .order('rating', { ascending: false })
      .limit(4);

    if (recommendationsError) {
      throw new Error('Error fetching recommendations');
    }

    // Log activity for the user
    await supabaseClient
      .from('user_activities')
      .insert({
        user_id: user.id,
        activity_type: 'view_recommendations',
        product_id: productId,
      })
      .select();

    return new Response(
      JSON.stringify({ 
        recommendations: recommendedProducts || [],
        category: productData.category
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error in product-recommendations function:', error.message);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400, 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
