# Auditoría UX y Rediseño - Aplicación de Notas

## 1. Tabla de Auditoría (Cinco Heurísticas)

| Heurística / Ley | Problema Detectado (Antes) | Solución Aplicada (Después) |
| :--- | :--- | :--- |
| **Ley de Fitts** | Botones de acción muy pequeños o muy juntos, difíciles de clickear rápidamente. | Se incrementó el tamaño de los botones a un mínimo de **44px de alto** y se añadió espaciado. |
| **Ley de Hick** | Demasiadas opciones visibles al mismo tiempo que saturan la toma de decisiones del usuario. | Se simplificó la interfaz ocultando acciones secundarias o agrupando elementos lógicos. |
| **Ley de Miller** | Exceso de notas o elementos organizados en una sola lista masiva sin categorización clara. | Se organizó la información en bloques o categorías accesibles para no saturar la memoria de trabajo. |
| **Prevención de Errores** | El usuario podía enviar o guardar una nota completamente vacía sin ninguna restricción. | Se desactiva el botón de guardar o se valida en tiempo real para **impedir agregar una nota vacía**. |
| **Control y Libertad del Usuario** | Al eliminar una nota, la acción era inmediata y destructiva, sin posibilidad de enmendar el error. | Se añadió un **mensaje visible de confirmación («Nota eliminada»)** junto con la opción de **Deshacer / Cancelar**. |

---

## 2. Checklist de Requerimientos Técnicos y de Diseño

### Interfaz y Feedback
- [ ] **Mensajes de feedback:** Mensaje visible después de cada acción (ej. *«Nota agregada»*).
- [ ] **Acciones reversibles:** Opción clara para deshacer o cancelar una acción destructiva (como eliminar).
- [ ] **Validación previa:** Bloqueo o validación de campos para evitar que se envíen notas vacías.

### Estilos y CSS
- [ ] **Variables CSS:** Colores de la aplicación definidos centralizadamente dentro de `:root`.
- [ ] **Estructura semántica:** Uso de **un solo elemento `<h1>`** principal en toda la página.
- [ ] **Espaciado:** Márgenes y paddings consistentes en todos los componentes.

### Accesibilidad (a11y)
- [ ] **Etiquetas de formularios:** Cada campo de entrada cuenta con su respectiva etiqueta (`<label>`).
- [ ] **Texto alternativo:** Todas las imágenes o iconos descriptivos incluyen el atributo `alt`.
- [ ] **Navegación por teclado:** Foco visible definido en CSS al recorrer la página con `Tab`.
- [ ] **Contraste de color:** Ratio mínimo de **4.5:1** entre el texto y el fondo.
- [ ] **Zonas interactivas:** Botones con dimensiones mínimas de **44px de alto**.

---

## 3. Reporte de Accesibilidad (Lighthouse)

> *Instrucciones: Reemplaza las rutas de abajo con tus capturas de pantalla reales guardadas en tu repositorio.*

| Estado | Puntaje Lighthouse | Captura de Pantalla |
| :--- | :---: | :--- |
| **Antes** | *[Puntaje]* | `![Lighthouse Antes](docs/assets/lighthouse-antes.png)` |
| **Después** | **90 o más** | `![Lighthouse Después](docs/assets/lighthouse-despues.png)` |

---

## 4. Control de Versiones (Git)

- **URL de la página activa:** [Enlace a tus GitHub Pages](https://github.io)
- **Commits requeridos en la entrega:**
  1. *[Primer commit descriptivo con push]*
  2. *[Segundo commit descriptivo con push]*
