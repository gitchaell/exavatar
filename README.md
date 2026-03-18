# Exavatar

> *Una API de generación de avatares dinámicos construida sobre principios de Arquitectura Hexagonal y Domain-Driven Design (DDD).*

[📸 Insertar captura: Vista de la interfaz o Playground de Exavatar]

**Exavatar** es un servicio enfocado en la generación dinámica de avatares a través de una API REST. Su propósito principal es proveer una solución estandarizada y fácilmente integrable para aplicaciones que requieren imágenes de perfil por defecto (placeholders) cuando un usuario no ha subido una propia.

El proyecto permite obtener imágenes pre-renderizadas o generar SVGs de iniciales basados en parámetros de URL, abstrayendo la lógica de renderizado del lado del cliente.

---

## Características Principales

- **Generación Dinámica:** Capacidad para generar SVGs de iniciales (hasta 2 caracteres) con fondos de colores sólidos.
- **Sets de Avatares Predefinidos:** Soporte para colecciones de imágenes estáticas (ej. animales, personajes) en formatos óptimos como WEBP, SVG o PNG.
- **Parametrización Flexible:** Control granular sobre atributos como el estilo (set), identificador (id), tamaño en píxeles, formato y color de fondo.
- **Resolución Automática:** El sistema decide inteligentemente si debe servir una imagen preexistente de su repositorio o generar un SVG al vuelo basándose en los parámetros de la petición.

## Arquitectura y Stack Tecnológico

El proyecto no es solo una utilidad, sino también una demostración práctica de patrones de diseño de software avanzados en un entorno de JavaScript/TypeScript moderno.

### Estructura del Código (Domain-Driven Design y Arquitectura Hexagonal)

El núcleo de Exavatar está estrictamente separado de la capa de presentación (Astro), organizado bajo el patrón de **Arquitectura Hexagonal (Ports and Adapters)** dentro del directorio `src/core/`:

- **Capa de Dominio (`domain`):** Contiene la lógica central de negocio. Entidades como `Avatar`, y Objetos de Valor (Value Objects) como `AvatarSize`, `AvatarColor`, `AvatarId`, y `AvatarSet` garantizan que las reglas de negocio (ej. validación de formatos, límites de tamaño, cálculo de contraste de colores) estén fuertemente tipadas y encapsuladas.
- **Capa de Aplicación (`application`):** Coordina los flujos de trabajo. El `AvatarService` actúa como el punto de entrada, orquestando la creación de la entidad Avatar a partir de una URL y delegando la carga al repositorio apropiado.
- **Capa de Infraestructura (`infrastructure`):** Implementa las interfaces (puertos) definidas por el dominio. Cuenta con implementaciones dinámicas de repositorios como `GitHubAvatarRepository` para el entorno de producción y `LocalAvatarRepository` para entornos de desarrollo.

[📸 Insertar diagrama o esquema: Diagrama simplificado de la Arquitectura Hexagonal mostrando la separación entre Astro, Core/Domain, e Infrastructure]

### Tecnologías Clave

- **Astro (Server-Side Rendering):** Maneja el enrutamiento API y el renderizado SSR ultrarrápido sin sobrecargar de JavaScript al cliente.
- **TypeScript:** Fuertemente tipado, especialmente en las capas de dominio para evitar estados inválidos.
- **Vitest:** Framework de testing moderno empleado para validar el comportamiento del `AvatarService` y las entidades del dominio de forma aislada.
- **BiomeJS:** Utilizado como la única herramienta para el formateo y análisis estático (linting) del código, garantizando consistencia (indentación con tabs, comillas simples) y rendimiento.
- **Vercel:** Plataforma de despliegue que utiliza Edge Functions y su red global de CDN para asegurar tiempos de respuesta bajos a nivel mundial.

---

## Uso de la API

La API es accesible mediante solicitudes GET simples. No requiere autenticación.

```bash
# Obtener un avatar aleatorio por defecto
curl https://exavatar.vercel.app/api/avatar

# Obtener un avatar de la colección "animals"
curl "https://exavatar.vercel.app/api/avatar?set=animals&id=cat&size=256&format=webp"

# Generar un avatar SVG con iniciales "JD" y fondo azul
curl "https://exavatar.vercel.app/api/avatar?text=JD&color=%233b82f6&size=128"
```

### Parámetros Soportados

| Parámetro | Tipo | Descripción |
| :--- | :--- | :--- |
| `set` | string | El estilo o colección del avatar (ej. `animals`, `rick_morty`). |
| `id` | string | El identificador específico del avatar dentro de un set. |
| `size` | number | El tamaño de la imagen en píxeles (entre 16 y 512). |
| `format` | string | Formato de salida para avatares basados en imágenes (`webp`, `png`, `svg`). |
| `color` | string | Código de color Hexadecimal (con o sin `#`) para el fondo. |
| `text` | string | Iniciales a renderizar en un avatar SVG (máximo 2 caracteres). Si está presente, anula las imágenes de set. |

---

## Enlaces del Proyecto

👉 **[Demo y Playground](https://exavatar.vercel.app)**
🔍 **[Repositorio en GitHub](https://github.com/exavatar/exavatar)**
