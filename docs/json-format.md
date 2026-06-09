# Formato JSON

## Estructura de una pregunta

```json
{
  "id": 1,
  "question": "¿Cuál es la capital de Francia?",
  "option1": "Madrid",
  "option2": "París",
  "option3": "Berlín",
  "option4": "Roma",
  "option5": "",
  "ans": 2,
  "asignatura": "GEO",
  "tema": "Europa"
}
```

## Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | number | Identificador único de la pregunta |
| `question` | string | Texto de la pregunta |
| `option1` - `option5` | string | Opciones de respuesta. `option5` puede estar vacío si hay 4 opciones |
| `ans` | number | Índice de la respuesta correcta (1-4). `0` = respuesta ambigua (no marca error) |
| `asignatura` | string | Código de la asignatura (ej: "COA", "GEO") |
| `tema` | string | Tema o capítulo (ej: "Valencia2022") |

## Generar JSON con ChatGPT

Prompt sugerido:

```
Considerando la siguiente documentación:
https://visortests-gpt.vercel.app/docs

Crea un cuestionario de [N] preguntas sobre [TEMA] en formato JSON.
Usa este formato por pregunta:

{
  "id": 1,
  "question": "...",
  "option1": "...",
  "option2": "...",
  "option3": "...",
  "option4": "...",
  "option5": "",
  "ans": 1,
  "asignatura": "[CODIGO]",
  "tema": "[TEMA]"
}
```

## Ejemplo de cuestionario válido

```json
[
  {
    "id": 1,
    "question": "¿Cuál es la capital de Francia?",
    "option1": "Madrid",
    "option2": "París",
    "option3": "Berlín",
    "option4": "Roma",
    "option5": "",
    "ans": 2,
    "asignatura": "GEO",
    "tema": "Europa"
  },
  {
    "id": 2,
    "question": "¿Qué planeta es el más grande?",
    "option1": "Tierra",
    "option2": "Marte",
    "option3": "Júpiter",
    "option4": "Saturno",
    "option5": "",
    "ans": 3,
    "asignatura": "SCI",
    "tema": "Sistema Solar"
  }
]
```

## Crear tests con ChatGPT

La forma más fácil de generar un cuestionario válido es pedírle a ChatGPT (u otra IA) que lo cree.

**Prompt para usar:**

```
Considerando la siguiente documentación:
https://visortests-gpt.vercel.app/docs

Crea un cuestionario de [N] preguntas sobre [TEMA] en formato JSON.
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

Reemplazá `[N]`, `[TEMA]` y `[CÓDIGO]` con los valores que necesites.

**Ejemplo de respuesta generada:**

```json
[
  {
    "id": 1,
    "question": "¿Cuál es la capital de Francia?",
    "option1": "Madrid",
    "option2": "París",
    "option3": "Berlín",
    "option4": "Roma",
    "option5": "",
    "ans": 2,
    "asignatura": "GEO",
    "tema": "Europa"
  },
  {
    "id": 2,
    "question": "¿Qué planeta es el más grande?",
    "option1": "Tierra",
    "option2": "Marte",
    "option3": "Júpiter",
    "option4": "Saturno",
    "option5": "",
    "ans": 3,
    "asignatura": "SCI",
    "tema": "Sistema Solar"
  }
]
```

Guardá el JSON en un archivo `.json` y arrastrálo a la app. También podés usar archivos `.txt` con contenido JSON.

## Notas

- Se aceptan archivos `.json` o `.txt` (el contenido debe ser JSON válido)
- `option5` vacío o ausente = 4 opciones. Con contenido = hasta 5 opciones
- `ans: 0` significa respuesta ambigua — al fallar no incrementa el contador de errores