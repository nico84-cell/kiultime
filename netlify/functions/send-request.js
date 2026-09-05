const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  const { discordTag } = JSON.parse(event.body);

  const { error } = await supabase.from('requests').insert({ discord_tag: discordTag });
  if (error) return { statusCode: 500, body: JSON.stringify({ error: error.message }) };

  return { statusCode: 200, body: JSON.stringify({ success: true }) };
};
