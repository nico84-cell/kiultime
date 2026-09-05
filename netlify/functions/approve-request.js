const { createClient } = require('@supabase/supabase-js');

function generatePassword() {
  return Math.random().toString(36).slice(-4).toUpperCase() + Math.random().toString(36).slice(-4).toUpperCase();
}

exports.handler = async (event) => {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  const { requestId, decision } = JSON.parse(event.body);

  if (decision === 'approved') {
    const password = generatePassword();
    const { data: req } = await supabase.from('requests').select('*').eq('id', requestId).single();

    await supabase.from('users').insert({ pseudo: req.discord_tag, role: 'JOUEUR', password });
    await supabase.from('requests').update({ status: 'approved', password }).eq('id', requestId);

    return { statusCode: 200, body: JSON.stringify({ password }) };
  } else {
    await supabase.from('requests').update({ status: 'rejected' }).eq('id', requestId);
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  }
};
