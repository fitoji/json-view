# Visor JsonTests

Aplicación web para practicar con tests en formato JSON. Dos modos de uso: **Pregunta Respuesta** (feedback inmediato) y **Examen** (sin feedback, revisión al final).

## Quick start

1. **Cargá un archivo JSON** arrastrándolo o haciendo click
2. **Elegí el modo** — Practicar o Examen
3. **Empezá a responder**

## Modos de test

| Modo | Feedback inmediato | Orden | Timer | Navegación |
|------|--------------------|-------|-------|-------------|
| Pregunta Respuesta | ✅ | Aleatorio | No | Lineal |
| Examen | ❌ | Correlativo (1→N) | Count-up | Libre |

## Navegación

- **/** — Landing (almacén de tests)
- **/docs** — Documentación

## Setup local

```bash
pnpm install
pnpm dev
```

## Deploy

Vercel: `pnpm install --ignore-scripts --ignore-optional && pnpm build`