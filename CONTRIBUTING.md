# Contributing Guide

## Conventional Commits

Este proyecto usa [Conventional Commits](https://www.conventionalcommits.org/) para mantener un
historial de commits limpio y semánticamente significativo.

### Formato

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Tipos de commit

- **feat**: Nueva funcionalidad
- **fix**: Corrección de bugs
- **docs**: Cambios en documentación
- **style**: Cambios de formato (espacios, comas, etc)
- **refactor**: Refactorización de código
- **test**: Agregar o modificar tests
- **chore**: Tareas de mantenimiento

### Ejemplos

```bash
feat: add user authentication
fix: resolve login button not working
docs: update README with installation steps
style: format code with prettier
refactor: extract user service logic
test: add unit tests for avatar service
chore: update dependencies
```

## Git Hooks

### Pre-commit Hook

Automáticamente ejecuta:

- `deno task format` - Formatea el código
- `deno task lint` - Ejecuta linting
- `git add .` - Agrega archivos formateados

### Commit-msg Hook

Valida que el mensaje de commit siga conventional commits.

## Comandos Útiles

```bash
# Formatear código
deno task format

# Ejecutar linting
deno task lint

# Ejecutar tests
deno task test

# Generar avatares
deno task generate
```
