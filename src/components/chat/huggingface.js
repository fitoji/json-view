import { HfInference } from "@huggingface/inference";



const hf = new HfInference(import.meta.env.VITE_REACT_HUGGINGFACE)

//const MODEL = 'iagovar/roberta-base-bne-sqac-onnx'
const MODEL ='microsoft/Phi-3.5-mini-instruct'
//const MODEL ='pankajmathur/orca_mini_phi-4"'
//const MODEL = 'deepseek-ai/DeepSeek-R1'


let out = "";

export const generateResponse = async (message) => {
  try {
    out=""
    const messages = [
      { role: "user", content: message },
      {
        role: "system", content:
      `Always answer on spanish` +
      `Be concise. ` +
      `no utilices la frase como nutricionista. ` +
      `Highlight relevant phrases in bold. ` +
      `Eres un nutricionista experto, responde como tal` +
      `no utilizes mas de 100 palabras`
          //"Por favor, responde siempre en español, como si fueras un nutricionista experto, explidando simple y claro. dame la respuesta sin el contexto"
      } // Añade un mensaje del sistema para indicar el idioma
    ];
    const stream = hf.chatCompletionStream({
      model: MODEL,
      messages: messages,
      max_tokens: 400,
      temperature: 0.1,
      seed: 0,
      stream: true,
    });

    for await (const chunk of stream) { // Asegúrate de que 'stream' se itere correctamente
      if (chunk.choices && chunk.choices.length > 0) {
        out += chunk.choices[0].delta.content; // Acumula el contenido de la respuesta
      }
    }
    
    console.log(out)
    let response = {generated_text: out}
    //const result = await response.json();
    return response.generated_text || "Lo siento, no pude entender tu mensaje.";
 

  }catch (error){
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