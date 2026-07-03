---
name: frontend-feature-architecture
description: Implement or refactor React + Vite frontend features in this repository using its established responsibility boundaries and naming conventions. Use for new pages, feature components, interaction state, hooks, pure data transformations, feature constants, component CSS, SVG controls, backend-provided media fields, or refactors that decide what belongs in pages, features, shared, components, hooks, utils, constants, and assets.
---

# Frontend Feature Architecture

Build features with clear responsibilities from the start while avoiding speculative folders and abstractions. Inspect the current repository before applying these rules; use `src/features/collection` as a responsibility-splitting reference only while it remains representative.

## Workflow

1. Read the target page or feature, its stylesheet, related hooks, constants, utilities, routes, and nearby implementations.
2. Search all references before renaming props, fields, selectors, or exports.
3. Identify rendering, stateful workflow, pure transformation, static data, and shared concerns.
4. Keep the change within the user's requested behavior.
5. Add structure only where a real responsibility exists.
6. Validate imports, stale references, behavior, and repository scripts.

Prefer current neighboring conventions when they conflict with older examples in this skill.

## Place Code by Responsibility

- `src/pages`: Compose route-level screens and feature components. Keep domain workflows out of page components.
- `src/features/<feature>`: Own domain-specific UI, state, utilities, constants, and styles.
- `src/shared`: Hold code already reused across multiple features or truly application-wide. Do not move code here based only on possible future reuse.
- `components`: Render JSX, compose children, pass intent-revealing props, and keep short DOM adapters close to the JSX.
- `hooks`: Own React state, refs, effects, timers, document listeners, and multi-step interaction workflows.
- `utils`: Hold React-independent pure functions such as immutable reorder, filter, normalization, and mapping operations.
- `constants`: Hold static definitions, options, and temporary default data. Label mock or backend-replacement data clearly.
- Component CSS: Keep layout and visual states with the component that renders those classes.
- `src/assets/icons`: Hold reusable SVG UI glyphs. Do not model backend-provided logos or content images as SVG icon components.

Do not create empty `hooks`, `utils`, or `constants` directories for every feature. Start with the minimum coherent structure and extract when state, effects, pure logic, reuse, or component complexity creates a real boundary.

## Keep Components Focused

Components should primarily describe rendering and local DOM wiring.

Keep short, component-specific adapters local, including `preventDefault`, `stopPropagation`, callback-prop invocation, and click handlers that map directly to one UI command.

Extract code when it:

- Owns state, refs, effects, timers, or cleanup
- Coordinates multiple component events
- Performs a meaningful pure data transformation
- Is reused or independently testable
- Materially obscures the JSX

Do not move a one-line handler to another file merely to make the component shorter.

## Choose React Primitives Deliberately

- Use `useState` when a value change must alter rendered JSX or CSS state.
- Use `useRef` for mutable values that must survive renders without triggering rendering, such as drag IDs, timer IDs, DOM references, or one-shot event flags.
- Use `useEffect` to synchronize with external systems such as document listeners, storage, network lifecycle, or timers requiring cleanup.
- Place feature-level state and external synchronization in a feature hook when leaving them in a component would mix rendering with workflow management.
- Do not replace visible state with refs merely to reduce renders.

Typical choices:

- Item arrays, edit mode, loading, errors, and visible press state: `useState`
- Current dragged item ID and timeout handle: `useRef`
- Document-level outside press listener and cleanup: `useEffect`

## Structure Interactive Lists

For grid, list, board, or collection-like interfaces:

1. Let the parent component render the layout and map data to item components.
2. Let each item attach its own DOM events and render its item-level visual states.
3. Let a feature hook own list state, edit mode, drag coordination, external listeners, and item mutations.
4. Let an item interaction hook own timers and transient interaction state when that behavior is substantial.
5. Let pure utilities perform immutable reorder, remove, filter, and normalization operations.

Use intent-revealing callbacks such as `onEnterEditMode`, `onRemove`, and `onDrop`. Keep `enter`, `exit`, and `toggle` actions separate when callers require deterministic intent; never use toggle where an action must always enable or disable a mode.

## Name by Meaning

- Use `Icon` and `icon` for SVG controls and UI glyphs.
- Use `logo` for a shortcut, organization, or service logo URL.
- Use `image`, `thumbnail`, `avatar`, or another domain-specific term for content media.
- Treat presigned URLs and backend media as data, not source-controlled icon components.
- Update data fields, props, JSX classes, CSS selectors, tests, and comments together after a rename.

## Handle Backend and Incomplete Work

- Base integrations only on an actual API contract, existing client, or confirmed environment configuration.
- Do not invent API modules, response fields, environment variables, loading behavior, or completed features.
- Preserve clear temporary defaults until backend data is available.
- Write precise TODOs that state what contract or data must replace the temporary code.
- Add compatibility layers only when current code or a confirmed contract requires them.

## Protect Scope and Existing Work

- Do not add UI, icons, logos, APIs, abstractions, or refactors the user did not request.
- Preserve user changes and unrelated dirty-worktree files.
- Follow existing aliases, naming, exports, formatting, and CSS conventions unless changing them is required.
- Avoid broad formatting or comment removal during focused work.
- Explain any necessary adjacent change before making it.

## Validate

1. Search for stale names and selectors after renames.
2. Confirm imports and exports resolve.
3. Run the narrowest relevant checks first.
4. Read `package.json` and run only scripts that exist, commonly `npm run lint` and `npm run build`.
5. If a dev server is already running, reuse it rather than starting a duplicate.
6. Separate pre-existing failures from failures introduced by the change.

Before finishing, confirm:

- Components mainly render and perform local DOM wiring.
- Hooks own stateful workflows and cleanup.
- Refs hold only non-rendering mutable values.
- Utils remain pure and React-independent.
- Constants are static or clearly temporary.
- Naming distinguishes SVG icons from backend-provided media.
- No unnecessary directories or abstractions were added.
- The implementation stayed within the requested scope.
