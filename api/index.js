export default async function handler(req, res) {
  try {
    const { prompt } = await req.json();

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Make short notes for: ${prompt}` }],
        temperature: 0.7,
        max_tokens: 600
      })
    });

    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content;
    return res.json({ response: reply });
  } catch (error) {
    return res.json({ response: "❌ Error fetching from OpenAI." });
  }
}
