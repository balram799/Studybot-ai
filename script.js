const OPENAI_API_URL = "/api";

async function askAI() {
  const prompt = document.getElementById("prompt").value.trim();
  if (!prompt) return;

  const res = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();
  const reply = data.response || "❌ No response from AI.";
  const ytLink = `https://www.youtube.com/results?search_query=${encodeURIComponent(prompt)}+lecture`;

  document.getElementById("response").innerText = reply + "\n\n📺 YouTube Link: " + ytLink;
}
