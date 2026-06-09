# Crear tests con IA

Cualquier inteligencia artificial (ChatGPT, Claude, Gemini, etc.) puede generar cuestionarios en formato JSON siguiendo las instrucciones de la app.

## Prompt básico

Copiá y pegá esto en ChatGPT:

```
Considerando la siguiente documentación:
https://visortests-gpt.vercel.app/docs

Crea un cuestionario de [N] preguntas sobre el tema [TEMA] en formato JSON.
Usa este formato para cada pregunta:

{
  "id": 1,
  "question": "texto de la pregunta",
  "option1": "opción a",
  "option2": "opción b",
  "option3": "opción c",
  "option4": "opción d",
  "option5": "",
  "ans": 1,
  "asignatura": "[CÓDIGO]",
  "tema": "[TEMA]"
}

Guarda el resultado como un archivo .json.
```

## Ejemplo real

```
Considerando la siguiente documentación:
https://visortests-gpt.vercel.app/docs

Crea un cuestionario de 10 preguntas sobre el tema "Comunicación no verbal" en formato JSON.
Usa este formato para cada pregunta:

{
  "id": 1,
  "question": "texto de la pregunta",
  "option1": "opción a",
  "option2": "opción b",
  "option3": "opción c",
  "option4": "opción d",
  "option5": "",
  "ans": 1,
  "asignatura": "COM",
  "tema": "Comunicación no verbal"
}

Guarda el resultado como un archivo .json.
```

## Tips para mejores resultados

1. **Sé específico con el tema** — Cuanto más específico, más precisas las preguntas
2. **Indicá el número de preguntas** — `10 preguntas` o `5 preguntas`
3. **Pedí que valide el `ans`** — pedile que verifique que el `ans` coincida con la respuesta correcta
4. **Pedí que evite respuestas ambiguas** — Así el `ans` será 1-4 y no 0
5. **Si el JSON tiene errores** — Pedile que lo corrija o usá un validator JSON online

## Ejemplo de respuesta esperada

```json
[
  {
    "id": 1,
    "question": "¿Qué porcentaje de la comunicación es no verbal según Mehrabian?",
    "option1": "7%",
    "option2": "38%",
    "option3": "55%",
    "option4": "93%",
    "option5": "",
    "ans": 3,
    "asignatura": "COM",
    "tema": "Comunicación no verbal"
  },
  {
    "id": 2,
    "question": "¿Cuál de los siguientes axiomas de Watzlawick afirma que no es posible no comunicarse?",
    "option1": "Primer axioma",
    "option2": "Segundo axioma",
    "option3": "Tercer axioma",
    "option4": "Cuarto axioma",
    "option5": "",
    "ans": 2,
    "asignatura": "COM",
    "tema": "Comunicación no verbal"
  }
]
```

## Cómo guardar el archivo

1. Copiá el JSON que te da ChatGPT
2. Creá un archivo nuevo en un editor de texto (Notepad, TextEdit, VS Code)
3. Pegá el contenido
4. Guardá como `test.json` (o el nombre que prefieras, siempre con extensión `.json`)
5. Arrastrá el archivo a la app

## Errores comunes

| Problema | Solución |
|----------|----------|
| ChatGPT no guarda como archivo | Copiá el JSON, creá el archivo manually y pegá el contenido |
| El JSON tiene errores de sintaxis | Pedile a ChatGPT que lo corrija o usá un validator JSON online |
| Las opciones tienen números adelante (1. opción) | Pedile que quite los números y deje solo el texto |
| Las respuestas incluyen "la correcta es..." | Pedile que solo dé el JSON puro sin texto adicional |

## IA alternativas

El mismo prompt funciona en:
- **ChatGPT** (OpenAI)
- **Claude** (Anthropic)
- **Gemini** (Google)
- **Copilot** (Microsoft)
- Cualquier otra IA que pueda generar texto