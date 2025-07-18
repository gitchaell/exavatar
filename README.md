# Exavatar - Dynamic Avatar Generation API

[![Deploy to Deno Deploy](https://github.com/gitchaell/exavatar/actions/workflows/deploy.yml/badge.svg)](https://github.com/gitchaell/exavatar/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Exavatar** is a powerful, lightning-fast avatar generation API built with Deno and Astro. Create
beautiful, customizable profile pictures instantly with our comprehensive set of avatar styles,
colors, and formats.

🌐 **Live Demo**: [https://exavatar.deno.dev](https://exavatar.deno.dev)

## ✨ Features

- 🎯 **Multiple Avatar Sets**: Choose from various artistic styles and designs
- 🎨 **Customizable Colors**: Full color palette support with hex codes
- 📏 **Flexible Sizes**: Generate avatars from 16x16 to 512x512 pixels
- 🖼️ **Multiple Formats**: Support for PNG, WEBP, and SVG formats
- ⚡ **Lightning Fast**: Built on Deno for optimal performance
- 🔧 **Developer Friendly**: Simple REST API with comprehensive documentation
- 🎮 **Interactive Playground**: Test and customize avatars in real-time
- 📱 **Responsive Design**: Works perfectly on all devices

## 🚀 Quick Start

### Generate an Avatar

```bash
# Basic avatar
curl https://exavatar.deno.dev/api/avatar

# Customized avatar
curl "https://exavatar.deno.dev/api/avatar?set=animals&id=dinosaur&size=256&format=webp&color=%23000000"
```

### API Parameters

| Parameter | Type   | Default  | Description                       |
| --------- | ------ | -------- | --------------------------------- |
| `set`     | string | `random` | Avatar style set                  |
| `id`      | string | `random` | Unique avatar identifier          |
| `size`    | number | `256`    | Image size in pixels              |
| `format`  | string | `webp`   | Output format (png, webp, svg)    |
| `color`   | string | `random` | Background color (hex)            |
| `text`    | string |          | Custom text overlay (max 2 chars) |

## 🎨 Available Avatar Sets

- **animals**: Cartoon-style characters with accessories
- **rick_morty**: Character from the Rick and Morty series
