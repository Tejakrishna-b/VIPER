// Cloudflare Worker for GitHub OAuth Authentication
// Deploy this on Cloudflare Workers: https://workers.cloudflare.com/

// CONFIGURATION - Your credentials are already configured!
const GITHUB_CLIENT_ID = 'Ov23licjO6ph0IxnBL8Y';
const GITHUB_CLIENT_SECRET = '5b62adff184f9d0372e730bf941221637a8769c8';
const ALLOWED_ORIGIN = 'https://Tejakrishna-b.github.io';

export default {
  async fetch(request) {
    return handleRequest(request);
  }
};

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    })
  }

  // Handle GitHub OAuth callback
  if (request.method === 'POST' && url.pathname === '/auth/github') {
    try {
      const { code } = await request.json()
      
      if (!code) {
        return new Response(JSON.stringify({ error: 'Code is required' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        })
      }

      // Exchange authorization code for access token
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code: code
        })
      })

      const data = await tokenResponse.json()

      if (data.error) {
        return new Response(JSON.stringify({ error: data.error_description || 'Authentication failed' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        })
      }
      
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })

    } catch (error) {
      return new Response(JSON.stringify({ 
        error: 'Authentication failed',
        details: error.message 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }
  }

  // Health check endpoint
  if (request.method === 'GET' && url.pathname === '/health') {
    return new Response(JSON.stringify({ 
      status: 'ok',
      service: 'GitHub OAuth Proxy',
      timestamp: new Date().toISOString()
    }), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  }

  return new Response('Not Found', { status: 404 })
}
