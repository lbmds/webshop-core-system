
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.24.0'

// MercadoPago SDK
import { MercadoPagoConfig, Preference } from 'https://esm.sh/mercadopago@2.0.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Configurar CORS para preflight requests
Deno.serve(async (req) => {
  // Tratamento para requests OPTIONS (CORS preflight)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get the authorization header
    const authorization = req.headers.get('Authorization')
    
    // Get MercadoPago access token from environment
    const mercadoPagoAccessToken = Deno.env.get('MERCADOPAGO_ACCESS_TOKEN')
    
    if (!mercadoPagoAccessToken) {
      throw new Error('Missing MercadoPago access token')
    }
    
    // Initialize Supabase client for authentication validation
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || ''
    
    // We don't need to verify JWT for this function since we're getting user info from the session
    // Get items from request body
    const { items } = await req.json()
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('Invalid cart items')
    }
    
    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: authorization ? { Authorization: authorization } : {},
      },
    })
    
    // Verify user session
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      console.error('Authentication error:', userError?.message)
      return new Response(
        JSON.stringify({ error: 'Unauthorized - User not authenticated' }), 
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Configure MercadoPago
    const client = new MercadoPagoConfig({ accessToken: mercadoPagoAccessToken })
    const preference = new Preference(client)
    
    // Base URL for callbacks (assuming a secure HTTPS URL for production)
    const baseUrl = Deno.env.get('SITE_URL') || 'https://8481aab8-f1b8-4c1a-81a1-43479e4da6a4.lovableproject.com'
    
    // Create payment preference
    const preferenceData = await preference.create({
      body: {
        items: items.map((item: any) => ({
          id: String(item.id),
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          currency_id: 'BRL',
          picture_url: item.image,
        })),
        back_urls: {
          success: `${baseUrl}/checkout/success`,
          failure: `${baseUrl}/checkout/failure`,
          pending: `${baseUrl}/checkout/pending`,
        },
        auto_return: 'approved',
        statement_descriptor: 'E-Commerce Store',
        external_reference: user.id,
      },
    })
    
    console.log('Preference created successfully:', preferenceData.id)
    
    return new Response(JSON.stringify(preferenceData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error creating preference:', error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
