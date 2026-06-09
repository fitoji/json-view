# Referencia rápida

## Archivos

| Extensión | Soportado |
|-----------|-----------|
| `.json` | ✅ |
| `.txt` | ✅ (contenido JSON) |

## JSON mínimo

```json
{
  "id": 1,
  "question": "texto",
  "option1": "a",
  "option2": "b",
  "option3": "c",
  "option4": "d",
  "ans": 1,
  "asignatura": "COD",
  "tema": "nombre"
}
```

## Campos

| Campo | Valores | Significado |
|-------|---------|-------------|
| `ans` | 1-4 | Respuesta correcta |
| `ans` | 0 | Respuesta ambigua (no cuenta error) |
| `option5` | texto o vacío | Si tiene contenido = 5 opciones |

## Modos

| Modo | Feedback | Orden | Timer |
|------|----------|-------|-------|
| Pregunta Respuesta | Inmediato | Aleatorio | No |
| Examen | Ninguno | Correlativo | Count-up |

## Atajos

| Tecla | Contexto | Acción |
|-------|----------|--------|
| `1-5` | Ambos modos | Seleccionar opción |
| `Space/Enter` | Práctica | Siguiente |
| `Space/Enter` | Examen | Siguiente |
| `←/→` | Examen | Navegar |
| `Ctrl+Enter` | Examen | Confirmar entrega |

## Almacenamiento

- **Práctica**: sin persistencia entre sesiones
- **Examen**: `localStorage` clave `quiz-exam-v1`, resume al volver