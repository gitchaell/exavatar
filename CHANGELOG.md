# Changelog

All notable changes to this project will be documented in this file.

## [1.4.0](https://github.com/gitchaell/exavatar/compare/v1.3.4...v1.4.0) (2025-07-09)

### ✨ Features

- custom code component for URL highlighting
  ([2a7d7e1](https://github.com/gitchaell/exavatar/commit/2a7d7e1113b40a8feb2247f51ac30c600d64aa12))

## [1.3.4](https://github.com/gitchaell/exavatar/compare/v1.3.3...v1.3.4) (2025-07-08)

### ♻️ Code Refactoring

- rename AvatarSizeType to AvatarSize for better clarity
  ([d3dc435](https://github.com/gitchaell/exavatar/commit/d3dc43570920b0d6bd793e8e98dd01a08c1227ed))
- reorganize avatar domain with new builders and environment config
  ([4422567](https://github.com/gitchaell/exavatar/commit/44225679285d5b41ad2d7e346f5d3c14caafe06a))

## [1.3.3](https://github.com/gitchaell/exavatar/compare/v1.3.2...v1.3.3) (2025-07-07)

### ♻️ Code Refactoring

- simplify environment configuration and base URL handling for avatar service
  ([49ae4b4](https://github.com/gitchaell/exavatar/commit/49ae4b405d92c00363dfc30ccdbcbe70aa3a3a48))

## [1.3.2](https://github.com/gitchaell/exavatar/compare/v1.3.1...v1.3.2) (2025-07-07)

### 🐛 Bug Fixes

- use external URL for avatar fetching in production environment
  ([8ed980a](https://github.com/gitchaell/exavatar/commit/8ed980af3aae913224682a66a2aae3a3bf0e7c33))

## [1.3.1](https://github.com/gitchaell/exavatar/compare/v1.3.0...v1.3.1) (2025-07-07)

### ♻️ Code Refactoring

- replace process.env with Deno.env and add env file support
  ([ac97158](https://github.com/gitchaell/exavatar/commit/ac97158c5a49f20f3dd19322e9d04a933f4fa63e))

## [1.3.0](https://github.com/gitchaell/exavatar/compare/v1.2.2...v1.3.0) (2025-07-07)

### ✨ Features

- improve error logging and update default form values for avatar creation
  ([0cb4fdb](https://github.com/gitchaell/exavatar/commit/0cb4fdbee69676ea235f33186f89037b4e44cf7d))

## [1.2.2](https://github.com/gitchaell/exavatar/compare/v1.2.1...v1.2.2) (2025-07-07)

### ♻️ Code Refactoring

- move avatar file loading logic from Avatar to AvatarService
  ([511c23f](https://github.com/gitchaell/exavatar/commit/511c23fda6f6fd3e517b3cc06494f6a9d89daf74))

## [1.2.1](https://github.com/gitchaell/exavatar/compare/v1.2.0...v1.2.1) (2025-07-07)

### ♻️ Code Refactoring

- remove unused options and replace static HTML with Astro page
  ([6f9bd07](https://github.com/gitchaell/exavatar/commit/6f9bd0773085bd8822f95921d8f11db7a7c10602))

## [1.2.0](https://github.com/gitchaell/exavatar/compare/v1.1.1...v1.2.0) (2025-07-07)

### ✨ Features

- configure avatar file URL based on NODE_ENV environment variable
  ([46d951f](https://github.com/gitchaell/exavatar/commit/46d951fd6bbfa1e520331468574baa86df87bf4c))

### ♻️ Code Refactoring

- update default avatar text and HTTP request parameters
  ([ed74fbd](https://github.com/gitchaell/exavatar/commit/ed74fbd109cc8568d369e018999a363b70448bf4))

## [1.1.1](https://github.com/gitchaell/exavatar/compare/v1.1.0...v1.1.1) (2025-07-07)

### 🐛 Bug Fixes

- correct deployment path and simplify Deno Deploy workflow steps
  ([c5ef9eb](https://github.com/gitchaell/exavatar/commit/c5ef9eb30e0cca6d674991d10c7b25298c688196))

## [1.1.0](https://github.com/gitchaell/exavatar/compare/v1.0.3...v1.1.0) (2025-07-07)

### ✨ Features

- create landing page with basic info and API link
  ([afdb40a](https://github.com/gitchaell/exavatar/commit/afdb40a2f98a1325870775bc73b93c5bc66b044e))

## [1.0.3](https://github.com/gitchaell/exavatar/compare/v1.0.2...v1.0.3) (2025-07-07)

### ♻️ Code Refactoring

- reorganize HTTP request files into separate dev and prod environments
  ([136dc4a](https://github.com/gitchaell/exavatar/commit/136dc4acee5d507351cd366ec15bdc376c608bab))

## [1.0.2](https://github.com/gitchaell/exavatar/compare/v1.0.1...v1.0.2) (2025-07-07)

### 🐛 Bug Fixes

- update avatar URL to use raw GitHub content and simplify deploy workflow
  ([e94c6af](https://github.com/gitchaell/exavatar/commit/e94c6af6f739647c2606db98a22e7dbc975679fc))

## [1.0.1](https://github.com/gitchaell/exavatar/compare/v1.0.0...v1.0.1) (2025-07-07)

### 🐛 Bug Fixes

- change filename to fileurl
  ([6bf32cf](https://github.com/gitchaell/exavatar/commit/6bf32cf8490925e980e646c425f041b7ebee15b5))

## 1.0.0 (2025-07-07)

### ✨ Features

- add animal avatar assets
  ([c9b4cad](https://github.com/gitchaell/exavatar/commit/c9b4cad6ca8029bbabc3594bf394e859e8ee9f60))
- add interactive avatar playground
  ([c1ebb7e](https://github.com/gitchaell/exavatar/commit/c1ebb7ebac0f6b4c48bb44e21a15779b14da907e))
- add TypeScript types for color-parse and optimize project configuration
  ([a96051b](https://github.com/gitchaell/exavatar/commit/a96051beb3af1d95f7a7d5c45fa1bea5fdd9e26c))
- complete semantic-release configuration
  ([b1c8e5d](https://github.com/gitchaell/exavatar/commit/b1c8e5d0e2c1ce551e4d9f780f4e9e99c6881f64))
- configure husky, prettier, and linting setup
  ([2091ce1](https://github.com/gitchaell/exavatar/commit/2091ce1c5f7f4b33f070a885b54f9aaee167c0f2))
- configure Tailwind CSS v4 with Astro
  ([7f92fdc](https://github.com/gitchaell/exavatar/commit/7f92fdcac85cd2eabfc97a8dd52a412180b73b66))
- reorganize animal avatar assets into size-based directories and add new image formats
  ([984d65e](https://github.com/gitchaell/exavatar/commit/984d65ea9307af37c74dc785eb587953a96b6712))

### 🐛 Bug Fixes

- resolve test issues and TypeScript configuration
  ([e215d8d](https://github.com/gitchaell/exavatar/commit/e215d8de4800e773262548361614e79d1533fffd))
- restore deno scripts and add lint
  ([e1e75df](https://github.com/gitchaell/exavatar/commit/e1e75df79be91879bdce575cca6c478f62213f3b))

### ♻️ Code Refactoring

- improve caching logic and deployment workflow organization
  ([dec6cbe](https://github.com/gitchaell/exavatar/commit/dec6cbea6842cb0365c5aa1a8d33332b66db2c0b))
- reorganize core domain and application layers with improved folder structure
  ([e55c420](https://github.com/gitchaell/exavatar/commit/e55c4208b25050b3ad0b9e3fc19fdff1b771cf42))
- streamline CI/CD pipeline and improve avatar text handling logic
  ([edcd190](https://github.com/gitchaell/exavatar/commit/edcd19051311e5e21e6bfbab9419b5713d5f2d7c))
- switch default avatar format from webp to svg and update tests
  ([04298b3](https://github.com/gitchaell/exavatar/commit/04298b30fb31f79be3daed43aa2a35c08af9f9dd))
- unify release and deploy workflows
  ([61e116c](https://github.com/gitchaell/exavatar/commit/61e116c646247ea001fba65267e317cea897550f))
