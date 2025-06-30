# 🚀 Astro + 🦕 Deno Template

This sample project contains a recommended starting point for your Deno project using Astro.

## 🛠️ Using this template

This template requires the Deno runtime to be installed on your computer. If you haven't already,
please [install Deno first](https://deno.land/manual/getting_started/installation). Next, initialize
a new Astro project using this template with your favorite
[npm client](https://docs.npmjs.com/cli/v9/configuring-npm/install), as described in the
[Astro docs](https://docs.astro.build/en/getting-started/).

```
npm create astro@latest -- --template denoland/deno-astro-template
```

GitHub will also let you
[use this repository as a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template) -
use the green "Use this template" button near the top of the page to create your own copy of this
application.

#### Why use Astro with Deno?

This template is preconfigured to use Deno rather than Node.js as the JavaScript runtime for this
[server-side rendering Astro application](https://docs.astro.build/en/guides/server-side-rendering/).
This provides a few benefits:

- The ability to use built-in `Deno` namespace functions, notably the new built-in
  [Deno KV](https://deno.com/kv) database.
- The ability to run in production on [Deno Deploy](https://deno.com/deploy), a high performance,
  globally distributed platform for serverless JavaScript applications.
- [Compatibility with the majority of packages on npm](https://deno.land/manual@v1.17.2/npm_nodejs/compatibility_mode),
  both at the runtime level and via the Astro build process (thanks to Vite and esbuild).

#### Local development

To use this template for local development, you will use npm scripts in `package.json` in the same
way as described in the Astro documentation. However, these scripts are configured execute the same
commands using the Deno runtime instead of Node.js.

- Start the local development server with `npm start` or `npm run dev`
- Build a production-ready SSR site with `npm run build`
- After building, you can preview your SSR site locally with `npm run preview`

This project also exposes a dynamic avatar generation service.

## 🔌 Managing dependencies, integrations, and plugins

We recommend **using npm to manage dependencies for this project**. Astro was designed to be used
with npm, and enhanced with plugins and other tools also hosted on npm. Deno's Node/npm
compatibility layer should be able to handle this just fine. If you run into any compatibility
issues, [please let us know](https://github.com/denoland/deno/issues).

When you're ready to put this application on the Internet, you can run it on
[Deno Deploy](https://www.deno.com/deploy). You have two options for doing so.

#### Deploy via GitHub Actions

- Create a new project on the [Deno Deploy Dashboard](https://dash.deno.com/projects)
- Choose to "Deploy an existing GitHub repository"
- Choose your GitHub user and the repository where you are storing this application
- You will be prompted to add a `.github/workflows/deploy.yml` file that will automatically build
  and deploy your application on every push to the `main` branch.

The `yml` file's final build step should look like this:

```yml
- name: Upload to Deno Deploy
  uses: denoland/deployctl@v1
  with:
    # Replace with your Deno Deploy project name
    project: deno-astro-template
    entrypoint: server/entry.mjs
    root: dist
```

- The `project` property should be your new Deno Deploy project's name
- The `entrypoint` for our Astro SSR application is `server/entry.mjs`
- The `root` for our app is the `dist` folder

Once this file is committed to your repo, every push to `main` will result in a new version of your
application being pushed to production.

#### Deploy from your desktop using `deployctl`

- Install the command line tools for `deployctl` and configure an API token environment variable
  [as described here](https://deno.com/deploy/docs/deployctl).
- Create a new blank project at [dash.deno.com](https://dash.deno.com/projects) and note the
  generated project name
- Build the Astro site locally with `npm run build`
- Deploy the newly generated site in the `dist` folder with this command:

```
deployctl deploy --project=YOUR_PROJECT_NAME --no-static --include=./dist ./dist/server/entry.mjs
```

## 🤔 Caveats and limitations

The Astro build process still runs your Deno code through Vite and esbuild to generate your SSR
site. This means that not all JavaScript and TypeScript language features will work exactly the same
way - most notably,
[HTTPS module imports](https://deno.land/manual@v1.15.2/examples/import_export#remote-import).

If you encounter situations where you require a Deno module that is only available via HTTPS import,
or discover that there's a Deno runtime language feature that you can't live without, I would
recommend writing Deno-specific code in a separate folder (say `src-deno`) and then using
[dnt](https://github.com/denoland/dnt) to transpile that code into the main `src` folder, where you
can import it in your Astro code. In reality, this should not be necessary all that often.

This template also uses a patched version of Astro's Deno SSR adapter in `astro.config.js` - this
will eventually be removed once
[this pull request is merged](https://github.com/withastro/astro/pull/7687) and `@astrojs/deno` is
suitable for use!

## 👩‍⚖️ License

MIT

## Avatar Endpoint

A dynamic avatar service is available at `/api/avatar`. It can return the animal images located
under `src/assets/animals` or generate simple text-based placeholders.

Example usage:

```
/api/avatar?set=animals&id=dog&size=128&format=png
```

When an image with the requested `set` and `id` does not exist, you can provide a `text` parameter
to render an avatar with the given background and foreground colors.

```
/api/avatar?text=JS&bg=%23ff0&fg=%23000&size=256
```

Before starting the server you can pre-generate avatars for the common sizes and formats using
Sharp:

```bash
npm run generate
```

## Development

Format and lint the code before committing:

```bash
npm run format
npm run lint
```

Run the test suite:

```bash
npm test
```

# Release

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

El workflow **Release & Deploy** se ejecuta automáticamente cuando se hace push a `main`:

**Job 1: Release**

1. Ejecuta linting y tests
2. Construye el proyecto
3. Ejecuta semantic-release
4. Crea tag y release en GitHub
5. Actualiza CHANGELOG.md
6. Incrementa versión en package.json

**Job 2: Deploy** (se ejecuta después del release) 7. Clona el repositorio 8. Instala
dependencias 9. Construye el proyecto 10. Despliega a Deno Deploy

> **Nota**: Para Pull Requests, solo se ejecuta el deploy (sin release)

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
