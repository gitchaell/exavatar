# Release Process

Este proyecto utiliza [semantic-release](https://semantic-release.gitbook.io/) para automatizar el
proceso de release basado en conventional commits.

## Configuración

### Archivos de configuración

- `.releaserc` - Configuración principal para CI/CD
- `.releaserc.local.json` - Configuración para pruebas locales (sin GitHub)

### Plugins configurados

1. **@semantic-release/commit-analyzer** - Analiza commits para determinar el tipo de release
2. **@semantic-release/release-notes-generator** - Genera notas de release automáticamente
3. **@semantic-release/changelog** - Mantiene un archivo CHANGELOG.md
4. **@semantic-release/git** - Commitea cambios de versión
5. **@semantic-release/github** - Crea releases en GitHub

## Tipos de Release

Basado en los commits:

- **Major** (1.0.0 → 2.0.0): Commits con `BREAKING CHANGE` o scope `breaking`
- **Minor** (1.0.0 → 1.1.0): Commits tipo `feat:`
- **Patch** (1.0.0 → 1.0.1): Commits tipo `fix:`, `perf:`, `revert:`, `refactor:`

## Workflow de Release

### En GitHub Actions

El workflow se ejecuta automáticamente cuando se hace push a `main`:

1. Ejecuta linting y tests
2. Construye el proyecto
3. Ejecuta semantic-release
4. Crea tag y release en GitHub
5. Actualiza CHANGELOG.md
6. Incrementa versión en package.json

### Configuración de GitHub Token

Para que funcione en GitHub Actions, necesitas:

1. Crear un Personal Access Token en GitHub
2. Agregar el token como secret `GITHUB_TOKEN` en el repositorio
3. El token debe tener permisos de escritura en el repositorio

## Comandos

```bash
# Release completo (CI/CD)
npm run release

# Dry run local (sin GitHub)
npm run release:dry

# Verificar qué se releaseará
npx semantic-release --dry-run
```

## Ejemplos de Commits

```bash
# Patch release
git commit -m "fix: resolve avatar generation bug"

# Minor release
git commit -m "feat: add new avatar shapes"

# Major release
git commit -m "feat: complete API redesign

BREAKING CHANGE: The API has been completely redesigned"
```

## Configuración Manual

Si necesitas configurar manualmente:

```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Configurar husky
npm run prepare
```
