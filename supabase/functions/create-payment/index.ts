
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
    const authorization = req.headers.get('Authorization')
    if (!authorization) {
      throw new Error('Missing Authorization header')
    }
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || ''
    const mercadoPagoAccessToken = Deno.env.get('MERCADOPAGO_ACCESS_TOKEN')
    
    if (!mercadoPagoAccessToken) {
      throw new Error('Missing MercadoPago access token')
    }
    
    // Inicializar cliente Supabase
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: authorization },
      },
    })
    
    // Verificar a sessão do usuário
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    
    if (userError || !user) {
      throw new Error('Unauthorized')
    }
    
    // Obter itens do carrinho do request body
    const { items } = await req.json()
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('Invalid cart items')
    }
    
    // Configurar MercadoPago
    const client = new MercadoPagoConfig({ accessToken: mercadoPagoAccessToken })
    const preference = new Preference(client)
    
    // Criar preferência de pagamento
    const preferenceData = await preference.create({
      body: {
        items: items.map((item: any) => ({
          id: item.id,
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          currency_id: 'BRL', // Moeda brasileira
          picture_url: item.image,
        })),
        back_urls: {
          success: `${Deno.env.get('SITE_URL') || 'https://localhost:3000'}/checkout/success`,
          failure: `${Deno.env.get('SITE_URL') || 'https://localhost:3000'}/checkout/failure`,
          pending: `${Deno.env.get('SITE_URL') || 'https://localhost:3000'}/checkout/pending`,
        },
        auto_return: 'approved',
        statement_descriptor: 'E-Commerce Store',
        external_reference: user.id,
      },
    })
    
    return new Response(JSON.stringify(preferenceData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
