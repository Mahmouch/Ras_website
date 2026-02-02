import { serve } from "https://deno.land/std@0.203.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message, allMessages } = await req.json();
    const GROQ_API_KEY = Deno.env.get("GROQ_API_KEY");

    if (!GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY not configured");
    }

    // Build conversation history properly
    const conversationHistory = (allMessages || [])
      .slice(-10)
      .filter(m => m && m.text) // Filter out invalid messages
      .map((m) => ({
        role: m.isBot ? "assistant" : "user",
        content: m.text,
      }));

    // Build the messages array for Groq
    const messages = [
      {
        role: "system",
        content: "Tu es Falawla, l'assistant virtuel de IEEE RAS ISIMS. Tu réponds toujours en français. Tu es amical, serviable et professionnel. Tu aides les étudiants avec leurs questions sur IEEE RAS ISIMS."
      },
      ...conversationHistory,
      { role: "user", content: message }
    ];

    console.log("Sending to Groq:", { messageCount: messages.length });

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-70b-versatile",
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const responseText = await res.text();
    
    if (!res.ok) {
      console.error("Groq API error:", responseText);
      throw new Error(`Groq API returned ${res.status}: ${responseText}`);
    }

    const data = JSON.parse(responseText);
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Unexpected Groq response:", data);
      throw new Error("Invalid response from Groq API");
    }

    return new Response(
      JSON.stringify({ reply: data.choices[0].message.content }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Edge function error:", e.message);
    return new Response(
      JSON.stringify({ error: e.message }), 
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
}); 