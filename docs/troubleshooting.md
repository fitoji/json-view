# Solución de problemas

## El archivo no carga

**Causa:** El JSON no es válido.

**Solución:**
- Verificá que el archivo sea JSON válido (podés usar un validator online)
- Probá con un archivo `.txt` en vez de `.json`
- Revisá que no haya errores de sintaxis (comas, llaves, etc.)

---

## El test no muestra las opciones

**Causa:** Algún `option#` está vacío o mal definido.

**Solución:**
- Asegurate de que todas las opciones tengan texto
- Verificá que `ans` esté entre 1 y el número de opciones disponibles

---

## El deploy en Vercel falla con `pnpm install` exit 1

**Causa:** Paquetes que necesitan build scripts (como `msgpackr-extract` de `@huggingface/inference`).

**Solución:**
En Vercel, cambiá el **Install Command** a:
```
pnpm install --ignore-scripts --ignore-optional
```

---

## El timer del examen no funciona

**Causa:** El timer requiere `Date.now()` y puede no actualizar correctamente en algunos navegadores.

**Solución:**
Refrescá la página. Si persiste, verificá que el reloj del sistema esté correcto.

---

## No puedo cambiar una respuesta en modo Examen

**Solución:**
En modo Examen hacé click en otra opción — se reemplaza automáticamente. Podés navegar a cualquier pregunta y cambiar antes de entregar.

---

## El tour de inicio aparece cada vez

**Solución:**
Desactivá el tour desde el botón con ícono de ayuda (pregunta) que aparece al lado del menú.

---

## El examen guardado no aparece al volver

**Causa:** El `localStorage` se limpió o cambió de dominio.

**Solución:**
No hay recuperación automática. Comenzá un nuevo examen.

---

## Otros problemas

Si encontrás un bug, contactá a **fitoji@protonmail.com** con:
- Descripción del problema
- Pasos para reproducirlo
- Captura de pantalla si es posible