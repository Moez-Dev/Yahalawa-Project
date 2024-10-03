import axios from 'axios';

export async function POST(request) {
  const body = await request.json();
  const { phone_number } = body;

  if (!phone_number) {
    return new Response(JSON.stringify({ error: 'Le numéro de téléphone est requis' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = "TTY_Yahalawa_KEY";
  const serviceId = "TTY_Yahalawa";
  const apiUrl = "https://tta-basil.sup.gg";
  const username = `216${phone_number}`;
  const timestamp = new Date().toISOString(); // Utiliser une date ISO pour le timestamp
  const uid = `f5d${new Date().getMinutes()}${new Date().getSeconds()}a-9${new Date().getDate()}e-11e7-abc4-cec${new Date().getSeconds()}8b6b${new Date().getHours()}d`;

  try {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-U-App-Key': apiKey,
      'X-U-Service-Id': serviceId,
    };

    const url = `${apiUrl}/hydra/api/v2/account/credentials/remind?msisdn=${username}&reset=true`;
    const data = {
      msisdn: username,
      reset: false,
      uid: uid,
      client_info: {
        client_id: "554",
        channel: "Web",
        app_version: "quizit-1.0",
        advertising_id: "0001727811237",
      },
    };

    const response = await axios.post(url, data, { headers });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe :', error.response?.data || error.message);

    return new Response(JSON.stringify({
      error: error.response?.data?.error || 'Erreur lors de la connexion à l\'API',
      description: error.response?.data?.description || 'Aucune description disponible',
    }), {
      status: error.response?.status || 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
