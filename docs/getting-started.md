# Primeros pasos

## Cargar un cuestionario

1. Arrastrá un archivo `.json` o `.txt` al área de drop, o hacé click para seleccionar
2. El archivo aparece en **JSON almacenados** abajo
3. Click en **Practicar**, **Examen** o **Ver** para empezar

## Elegir el modo

Al abrir un test, aparece el **Selector de modo**:

- **Practicar** — Feedback inmediato después de cada respuesta. Ideal para aprender.
- **Examen** — Sin feedback, navegación libre, revisión final con todas las respuestas y tiempo elapsed.

## En modo Pregunta Respuesta

1. Respondé la pregunta
2. Obtenés feedback inmediato (verde = correcto, rojo = incorrecto)
3. Click en **Siguiente pregunta** o usá `Space`/`Enter`
4. Al final: repetir todo o repasar solo los errores

## En modo Examen

1. Navegá entre preguntas con `←` `→` o el grid de navegación
2. Seleccioná opciones con clicks o teclas `1-5`
3. El timer cuenta elapsed (no hay límite)
4. **Entregar examen** muestra revisión con todas las respuestas

## Crear tests con ChatGPT

La forma más fácil es pedírle a ChatGPT (u otra IA) que genere el cuestionario en formato JSON.

**Prompt para usar con ChatGPT:**

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

- Reemplazá `[N]` con el número de preguntas que querés
- Reemplazá `[TEMA]` con el tema específico del cuestionario
- Reemplazá `[CÓDIGO]` con el código de la asignatura (ej: "COA", "BIO")

**Ejemplo de respuesta de ChatGPT:**

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
  }
]
```

Guardá el JSON en un archivo `.json` y arrastrálo a la app.

## Atajos de teclado

| Tecla | Acción |
|-------|--------|
| `1-5` | Seleccionar opción |
| `Space` / `Enter` | Siguiente pregunta |
| `←` `→` | Navegar preguntas |
| `Ctrl+Enter` | Abrir confirmación de entrega (solo examen) |

## Persistencia

Los tests se guardan en `localStorage` del navegador. No se suben a ningún servidor.

- En **modo examen**: el progreso se guarda automáticamente cada vez que respondés o navegás
- Si cerrás la página, podés continuar el examen al volver