const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  const { pseudo, password } = JSON.parse(event.body);

  const { data } = await supabase.from('users').select('*').eq('pseudo', pseudo).eq('password', password).single();
  if (!data) return { statusCode: 401, body: JSON.stringify({ error: 'Identifiants incorrects' }) };

  return { statusCode: 200, body: JSON.stringify({ role: data.role }) };
};
