# Tailwind CSS v4 Configuration

Este proyecto utiliza **Tailwind CSS v4** integrado con Astro v5.

## Configuración

### Tailwind v4 + Astro

Tailwind v4 funciona de forma nativa con Vite, por lo que no necesita la integración
`@astrojs/tailwind`.

### Archivos de configuración

- **`astro.config.ts`**: Configurado para usar Tailwind v4 nativamente
- **`src/styles/tailwind.css`**: Archivo principal de estilos usando sintaxis v4
- **NO hay archivo de configuración**: Tailwind v4 no requiere `tailwind.config.js`

### Sintaxis Tailwind v4

```css
/* src/styles/tailwind.css */
@import 'tailwindcss';

/* Custom styles can be added here */
```

### Diferencias con Tailwind v3

| Aspecto           | Tailwind v3                                                            | Tailwind v4                  |
| ----------------- | ---------------------------------------------------------------------- | ---------------------------- |
| Importación       | `@tailwind base;`<br>`@tailwind components;`<br>`@tailwind utilities;` | `@import "tailwindcss";`     |
| Configuración     | `tailwind.config.js` requerido                                         | Sin archivo de configuración |
| Integración Astro | `@astrojs/tailwind`                                                    | Nativo con Vite              |

## Características v4

- **Sin archivo de configuración**: Tailwind v4 usa configuración automática
- **Mejor rendimiento**: Procesamiento más rápido
- **CSS nativo**: Mejor integración con herramientas modernas
- **Sintaxis simplificada**: Una sola importación

## Uso

Las clases de Tailwind funcionan exactamente igual que en v3:

```astro
<div class="p-6 max-w-5xl mx-auto">
  <h1 class="text-3xl font-bold mb-4">
    Welcome to Exavatar
  </h1>
</div>
```

## Verificación

Para verificar que Tailwind funciona:

1. **Desarrollo**: `npm run dev`
2. **Build**: `npm run build`
3. **Inspeccionar elementos**: Verificar que las clases CSS se generen correctamente

## Personalización

Si necesitas personalizar Tailwind v4, puedes hacerlo directamente en el CSS:

```css
@import 'tailwindcss';

/* Custom theme */
@theme {
	/* Custom colors, fonts, etc. */
}

/* Custom utilities */
@utility {
	/* Custom utility classes */
}
```

## Estado Actual

✅ **Configurado correctamente**

- Tailwind v4.0.4 instalado
- Configuración de Astro actualizada
- CSS usando sintaxis v4
- Build y dev funcionando
- Sin archivos de configuración obsoletos
