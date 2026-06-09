# FAQ

## ¿Qué formato de archivo acepta la app?

Archivos `.json` o `.txt` con contenido en formato JSON. Ver [Formato JSON](json-format.md).

---

## ¿Y cómo obtenés el código de asignatura ("COA", "GEO"...)? ¿Acepta cualquier valor?

Sí, podés poner el valor que corresponda. En `asignatura` y `tema` poné lo que indica el cuestionario. También podés pedirle a ChatGPT que lo cambie automáticamente en todas las preguntas.

---

## ¿Qué significa el campo `ans`?

Es el índice de la respuesta correcta: `a=1`, `b=2`, `c=3`, `d=4`. Normalmente ChatGPT lo detecta automáticamente, pero conviene verificar.

---

## ¿No sé nada de programación, ¿cómo uso la app?

Usá el **Método Rápido**: pedile a ChatGPT que cree el cuestionario en formato JSON siguiendo las instrucciones de [Formato JSON](json-format.md). Solo necesitás copiar y pegar.

---

## El formato no queda bien, ChatGPT dice que no puede arreglarlo

Podés subir un archivo `.txt` y la app lo interpreta como JSON. También podés revisar el JSON manualmente y corregirlo.

---

## ¿El examen tiene límite de tiempo?

No. El timer es count-up (elapsed, cuenta desde 0). Solo registra cuánto tardaste. Al entregar se muestra el tiempo total en la revisión final.

---

## ¿Puedo cambiar una respuesta antes de entregar el examen?

Sí. En modo Examen podés navegar libremente entre preguntas y cambiar tu respuesta las veces que quieras antes de entregar.

---

## Si cierro la página durante un examen, ¿pierdo el progreso?

No. El progreso se guarda automáticamente en `localStorage`. Al volver, te pregunta si querés continuar el examen o empezar uno nuevo.

---

## ¿Puedo usar la app sin conexión a internet?

Sí. Una vez cargada la página, todo funciona offline. Los cuestionarios se almacenan en el navegador.

---

## ¿Mis datos se suben a algún servidor?

No. Todo está en tu navegador (`localStorage`). No se envía nada a ningún servidor.

---

## ¿Cuántos cuestionarios puedo guardar?

Tanto como soporte el `localStorage` de tu navegador (~5MB aproximadamente). Podés ver el uso en la parte inferior de la pantalla.

---

## ¿Cómo ordeno los cuestionarios almacenados?

Arrastrá las tarjetas para cambiar el orden. El orden se guarda automáticamente.

---

## ¿El examen guarda el orden de las preguntas?

No. En modo Examen las preguntas van en orden correlativo por `id` (1, 2, 3... N), sin aleatoriedad. En modo Pregunta Respuesta podés activar/desactivar el orden aleatorio desde el menú.