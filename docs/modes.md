# Modos de test

## Pregunta Respuesta (práctica)

Modo de aprendizaje con feedback inmediato.

**Características:**
- Orden aleatorio de preguntas (configurable en menú)
- Orden aleatorio de opciones (configurable)
- Feedback instantáneo: verde si acertaste, rojo si fallaste
- Puntuación en tiempo real
- Al final: opción de **Repetir** o **Revisar errores**

**Flujo:**
```
Seleccionar modo → Responder → Feedback inmediato → Siguiente → ... → Resultado → Repetir/Revisar
```

**Navegación:** Lineal. Solo avanzar con "Siguiente" o `Space`/`Enter`.

---

## Examen

Modo de simulación de examen real.

**Características:**
- Orden correlativo (1 → N), sin aleatoriedad
- Sin feedback durante el exam — no se muestra si acertaste o no
- Timer count-up (elapsed, no countdown)
- Navegación libre entre preguntas (podes cambiar respuestas antes de entregar)
- Persistencia automática cada vez que navegás o respondés
- Revisión final al entregar: todas las preguntas con tu respuesta y la correcta

**Flujo:**
```
Seleccionar modo → Navegar/responder → Entregar (confirma) → Revisión final
```

**Timer:** Cuenta elapsed desde que empezaste. Se muestra como `MM:SS`. No hay límite — es solo informativo.

**Navegación:**
- `←` `→` — Anterior / Siguiente
- Grid numerado — Ir a pregunta específica
- `1-5` — Seleccionar opción
- `Ctrl+Enter` — Abrir confirmación de entrega

**Persistencia:**
- Si cerrás la página, al volver te pregunta si querés continuar el examen o empezar uno nuevo
- El progreso se guarda en `localStorage` con clave `quiz-exam-v1`

**Revisión final:**
- Puntuación: correctas / total
- Tiempo total elapsed
- Cada pregunta muestra: texto, opciones, tu respuesta, respuesta correcta, "Sin responder" si no contestaste