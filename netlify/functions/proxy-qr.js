// netlify/functions/proxy-qr.js

// ← your updated Apps Script Web App URL:
const AS_URL = 'https://script.google.com/macros/s/AKfycbyIFrLJjHpf-LNTYvk5cCXQi5RUtorYLPBAGhhIMD5ZNFEugS2AGrTtujFW9Ue3tgPb/exec';

exports.handler = async (event) => {
  // Only accept POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        Allow: 'POST',
        'Access-Control-Allow-Origin': '*'
      },
      body: 'Method Not Allowed'
    };
  }
  try {
    // Forward the POST body to your Apps Script
    const resp = await fetch(AS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: event.body
    });
    const text = await resp.text();
    return {
      statusCode: resp.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: text
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ status: 'error', message: err.message })
    };
  }
};
