---
name: readme-maintainer
description: Create or update this React + Vite frontend repository's README so it matches the current implemented scope. Use when the user asks to create, rewrite, refresh, or validate README content, document setup or run commands, summarize the current frontend structure, or keep README content aligned with the actual code and configuration.
---

# README Maintainer

Use this skill when creating or editing `README.md` for this frontend repository.

## Core Rules

1. Write the README in Korean.
2. Base every statement on the current code and configuration files only.
3. Do not describe unimplemented features as complete.
4. Do not highlight temporary configuration, placeholder assets, or provisional resources as confirmed product features.
5. Put uncertain content under `확인 필요`, `준비되지 않은 항목`, or `추후 정리 예정`.
6. If the project is still under development, focus on development environment, run commands, current implementation scope, and caveats instead of a polished service introduction.
7. Do not create standalone table-of-contents entries for topics that are not actually ready.
8. If backend API integration, tests, deployment, or route-backed pages are not supported by real code and configuration yet, gather them near the bottom under `준비되지 않은 항목` or `추후 정리 예정`.
9. Split a not-yet-ready topic into its own README section only after related code, configuration, scripts, or documents are actually added.
10. Create README table-of-contents items only for sections that contain real, explainable implementation details.
11. Use the repository name as the first-level README title and as the subject of the opening sentence. For this frontend repository, prefer `# eco-knock-fe` and start the description with `eco-knock-fe`. Treat `ECO-KNOCK` as the app or UI display name only when that is what the code shows.

## Files To Inspect Before Writing

Always inspect these before creating or updating README content:

- `package.json`
- `vite.config.js`
- `src`
- `public`
- `index.html`
- `eslint.config.js`

When relevant, also inspect nearby files that prove implementation details, such as route definitions, page components, feature components, hooks, constants, assets, CSS, environment files, or existing documentation.

## What To Derive From Each Source

- `package.json`
  - Use `scripts` as the only source of runnable commands.
  - Use `dependencies` and `devDependencies` as the starting point for the technology stack.
  - Mention `npm test` only if a `test` script actually exists.
- `vite.config.js`
  - Confirm Vite plugins, aliases, build-related settings, and PWA configuration.
  - Mention PWA only when `vite-plugin-pwa` or equivalent configuration is present.
  - If PWA icons, app name, manifest values, or comments look temporary, describe them cautiously, for example: `PWA 기본 설정이 포함되어 있으며, 아이콘 및 manifest 세부값은 추후 변경 가능`.
- `src`
  - Confirm implemented pages, routes, layout, components, hooks, constants, and feature folders from actual files.
  - Distinguish between working UI, static mock data, partial interaction, and completed backend-connected behavior.
- `public`
  - Confirm only static assets that actually exist.
  - Do not treat placeholder icons or temporary files as final branding.
- `index.html`
  - Confirm root element, title, favicon reference, language setting, and entry script.
  - Mention mismatches or temporary metadata as caveats when useful.
- `eslint.config.js`
  - Confirm linting setup and supported file patterns.

## Commands

Before documenting setup or execution, read `package.json` and include only commands that actually exist.

Allowed examples only when backed by `scripts` or standard package installation needs:

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
- `npm test`

Do not invent commands for testing, deployment, API generation, formatting, storybook, or environment setup unless the repository actually contains the matching script or configuration.

## Technology Stack Rules

Document technologies only when both conditions are satisfied:

1. The dependency or devDependency exists in `package.json`, or the tool is part of the standard project runtime.
2. The code or configuration shows actual usage.

For this repository type, verify before mentioning:

- React
- Vite
- JavaScript and JSX
- React Router
- ESLint
- Vite PWA plugin or service worker behavior
- CSS structure and shared styling

Do not describe a library as part of a completed feature just because it appears in `package.json`.

## Feature Documentation Rules

Before documenting a feature, inspect the relevant code in `src`.

- Backend API integration: mention only if actual API client code, fetch/axios calls, environment variables, or integration configuration exist.
- Route-backed pages and navigation: document only the current implementation scope proven by route definitions, page components, constants, hooks, and state handling.
- If mentioning pages that still need implementation, limit them to pages already implied by this repository's route constants or navigation code, such as 부서모집, 마이페이지, ECNV 코인 로그, or AI/챗봇 채팅.
- Static data or UI-only screens: label them as static, UI-only, mock, or partial as appropriate.
- Work in progress: prefer `현재 구현 범위` and `준비되지 않은 항목` over confident product language.

## Tests

Check `package.json` for a `test` script and test-related dependencies before writing about tests.

- If tests are configured, document the real command and the actual test framework.
- If tests are not configured, do not create a standalone `테스트` section.
- Instead, add a short note under `준비되지 않은 항목`, such as: `테스트 환경은 아직 구성되지 않았으며, 추후 Vitest 또는 React Testing Library 등을 도입한 뒤 별도 항목으로 분리 예정`.

## Backend Integration

Check for API integration code, environment variable usage, API base URL settings, and related documentation before writing about backend integration.

- If backend integration is not ready, do not create a standalone `백엔드 연동` section.
- Instead, add a short note under `준비되지 않은 항목`, such as: `백엔드 API 연동 방식은 추후 API 명세와 환경 변수 구성이 확정된 뒤 별도 항목으로 분리 예정`.
- Do not claim backend-dependent flows are complete unless the integration code proves it.

## Recommended README Shape

Use only the sections that can be supported by current files. A typical early-stage README can use:

1. `# eco-knock-fe`
2. Short project description that avoids overclaiming.
3. `현재 구현 범위`
4. `기술 스택`
5. `프로젝트 구조`
6. `실행 전 요구사항`
7. `실행 방법`
8. `준비되지 않은 항목` or `추후 정리 예정`

Do not include sections such as `주의사항`, `테스트`, `배포`, `백엔드 연동`, `API`, or `환경 변수` unless real scripts, code, configuration, or user requirements support them.

## Validation Checklist

Before finishing a README task:

1. Re-check that every command exists in `package.json` or is a standard install command.
2. Re-check that every technology listed is present in dependencies/devDependencies and used in code or config.
3. Re-check that PWA wording is cautious when manifest or icon values look temporary.
4. Re-check that unfinished areas are not promoted to standalone sections.
5. Re-check that UI-only or partial features are not described as backend-connected or complete.
6. Re-check that the README is Korean.
7. If possible, run `npm run lint` when README-related code examples or configuration claims depend on lint behavior. Do not run unavailable scripts.

## Editing Notes

- Keep wording concrete and operational.
- Prefer short sections over long explanations.
- Preserve useful existing README content when updating, but correct anything that no longer matches the code.
- If terminal output or comments show encoding issues, do not rewrite the README in English. Keep README content Korean unless the user says otherwise.
- When uncertain, write the uncertainty explicitly instead of smoothing it into a confident claim.
