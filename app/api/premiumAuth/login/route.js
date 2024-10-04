import axios from 'axios';

export async function POST(request) {
  try {
    const body = await request.json();
    const { phone_number, password } = body;

    if (!phone_number || !password) {
      return new Response(JSON.stringify({ error: 'Le numéro de téléphone et le mot de passe sont requis' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }


    const username = `216${phone_number}`;

    const auth = Buffer.from(`${username}:${password}`).toString('base64');

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-U-App-Key': process.env.apiKey,
      'X-U-Service-Id': process.env.serviceId,
      'Authorization': `Basic ${auth}`,
    };

    const url = `${process.env.apiUrl}/hydra/api/v2/token?grant_type=client_credentials&client_id=98123456&channel=SMS&app_version=quizit-1.0&advertising_id=0001727811237`;

    const response = await axios.post(url, null, { headers });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });


  } catch (error) {
    console.error('Erreur lors de l\'authentification :', error);

    return new Response(JSON.stringify({
      error: error.response?.data?.error || 'Erreur lors de la connexion à l\'API',
      description: error.response?.data?.description || 'Aucune description disponible',
    }), {
      status: error.response?.status || 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}




