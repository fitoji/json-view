import { HfInference } from "@huggingface/inference";
import { toast } from "sonner";



const hf = new HfInference(import.meta.env.VITE_REACT_HUGGINGFACE)

//const MODEL = 'iagovar/roberta-base-bne-sqac-onnx'
const MODEL = 'microsoft/Phi-3.5-mini-instruct'
//const MODEL ='pankajmathur/orca_mini_phi-4"'
//const MODEL = 'deepseek-ai/DeepSeek-R1'


let out = "";

export const generateResponse = async (message) => {
  try {
    if (!hf.apiKey) {
      toast.error("¡Se han agotado los tokens disponibles o necesitas iniciar sesión! Por favor, verifica tu token de acceso o intenta más tarde.", {
        duration: 10000,
        style: {
          backgroundColor: "#ff0066",
          color: "#fff",
        },
      });
      //alert("no hay key")
      throw new Error('429: Please log in or use a HF access token, error sale por aca');
    }
    out = ""
    const messages = [
      {
        role: "system",
        content: `Instrucciones:
          - Eres un nutricionista experto y profesional
          - Responde siempre en español
          - Sé conciso y claro
          - Destaca las frases importantes en **negrita**
          - Mantén un tono profesional pero accesible
          - Evita usar frases como "como nutricionista"
          - Limita las respuestas a información precisa y relevante`
      },
      {
        role: "user",
        content: message
      }
    ];
    const stream = hf.chatCompletionStream({
      model: MODEL,
      messages: messages,
      max_tokens: 400,
      temperature: 0.4,
      seed: 0,
      stream: true,
    });

    for await (const chunk of stream) { // Asegúrate de que 'stream' se itere correctamente
      if (chunk.choices && chunk.choices.length > 0) {
        out += chunk.choices[0].delta.content; // Acumula el contenido de la respuesta
      }
    }

    // console.log(out)
    let response = { generated_text: out }
    //const result = await response.json();
    return response.generated_text || "Lo siento, no pude entender tu mensaje.";


  } catch (error) {
    console.log("error al generar el texto", error)
  }





  /* "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
  {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${HUGGINGFACE_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: message }),
  } */




};