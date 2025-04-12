
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
    // Get MercadoPago access token from environment
    const mercadoPagoAccessToken = Deno.env.get('MERCADOPAGO_ACCESS_TOKEN')
    
    if (!mercadoPagoAccessToken) {
      throw new Error('Missing MercadoPago access token')
    }
    
    // Get request body
    const { items, shippingAddress, shippingMethod } = await req.json()
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('Invalid cart items')
    }
    
    // Initialize Supabase client for authentication validation
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase configuration')
    }

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      console.error('No authorization header provided')
      return new Response(
        JSON.stringify({ error: 'Unauthorized - No authorization header' }), 
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Extract JWT token from header
    const token = authHeader.replace('Bearer ', '')
    
    // Initialize Supabase admin client to verify the token
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
    
    // Verify the JWT token and get user information
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      console.error('Authentication error:', authError?.message || 'User not found')
      return new Response(
        JSON.stringify({ error: 'Unauthorized - Invalid token' }), 
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    console.log('User authenticated successfully:', user.id)
    
    // Configure MercadoPago
    const client = new MercadoPagoConfig({ accessToken: mercadoPagoAccessToken })
    const preference = new Preference(client)
    
    // Base URL for callbacks
    const baseUrl = Deno.env.get('SITE_URL') || 'https://8481aab8-f1b8-4c1a-81a1-43479e4da6a4.lovableproject.com'
    
    // Format shipping address for MercadoPago
    let formattedAddress = '';
    if (shippingAddress) {
      formattedAddress = `${shippingAddress.street}, ${shippingAddress.number}`;
      if (shippingAddress.complement) {
        formattedAddress += ` - ${shippingAddress.complement}`;
      }
      formattedAddress += `, ${shippingAddress.neighborhood}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.zipCode}`;
    }
    
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
        shipments: {
          cost: shippingMethod?.price || 0,
          mode: "not_specified",
        },
        payer: {
          address: shippingAddress ? {
            street_name: shippingAddress.street,
            street_number: shippingAddress.number,
            zip_code: shippingAddress.zipCode
          } : undefined
        },
        back_urls: {
          success: `${baseUrl}/checkout/success`,
          failure: `${baseUrl}/checkout/failure`,
          pending: `${baseUrl}/checkout/pending`,
        },
        auto_return: 'approved',
        statement_descriptor: 'E-Commerce Store',
        external_reference: user.id,
        metadata: {
          user_id: user.id,
          shipping_address: formattedAddress,
          shipping_method: shippingMethod?.name || 'Standard'
        }
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
