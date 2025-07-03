// netlify/functions/proxy-qr.js

// ← replace this with your Apps Script exec URL:
const AS_URL = 'https://script.google.com/macros/s/AKfycbz-ePNtU2s_3M_cQwiyPlyYXZWU_5PDQOZ7uKSymPcd-srbmYJh007I_BPnKFTPUmQf/exec';

exports.handler = async (event) => {
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
    // forward the JSON body to Apps Script
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
