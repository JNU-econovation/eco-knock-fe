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
4. Before adding another workflow to an existing component or hook, check whether its current responsibilities should be extracted first.
5. If the UI can be affected by viewport height, safe areas, the software keyboard, scrolling, or touch gestures, identify the Android Chrome and iOS Safari risks before editing.
6. Keep the change within the user's requested behavior.
7. Add structure only where a real responsibility exists.
8. Validate imports, stale references, behavior, and repository scripts.

Prefer current neighboring conventions when they conflict with older examples in this skill.

## Repository Structure

Use the current repository shape as the placement baseline:

```text
src
├─ app
│  ├─ router
│  └─ styles
├─ assets
│  ├─ icons
│  └─ img
├─ features
│  └─ <feature>
│     ├─ components
│     ├─ hooks
│     ├─ constants
│     └─ utils
├─ pages
└─ shared
   ├─ components
   ├─ constants
   ├─ contexts
   └─ hooks
```

The feature child folders describe available responsibility boundaries, not folders that must always exist. Create only the folders backed by real code, and add a new category such as `api`, `services`, or `tests` only after the repository has an actual contract and implementation that needs it.

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

## Reassess Structure As Features Grow

Small features may begin in one component. Before extending a file that has grown beyond straightforward rendering, reassess its responsibilities and extract the relevant code instead of continuing to accumulate behavior.

- Extract an independent visual unit into its own component when it has a distinct purpose, state, or interaction surface.
- Extract a feature hook when a component gains timers, effects, refs, document or pointer listeners, cleanup, or a multi-event workflow.
- Move static copy, options, definitions, and temporary feature data into `constants` when they form a meaningful set or are used outside one local expression.
- Move React-independent transformations and calculations into `utils` when they are meaningful, reusable, or independently testable.
- Keep component-specific CSS beside the component that renders the selectors.
- Keep feature code inside its feature until it is genuinely reused across features or is application-wide.

Do not use file length alone as the extraction rule. The trigger is mixed responsibility: when a requested change adds a second workflow or makes rendering, DOM coordination, state management, and pure logic compete in one file, split those boundaries before or as part of the change.

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

## Mobile Browser Considerations

Apply this section when a feature is affected by viewport size or height, fixed positioning, bottom controls, text input, scrolling, or touch gestures. Do not add browser-specific complexity to an unaffected component merely to satisfy a checklist.

- Design mobile-first and verify narrow widths without horizontal overflow, clipped controls, overlapping text, or hover-only interactions.
- For full-height screens, sheets, and overlays, account for dynamic browser chrome with `dvh` or another appropriate dynamic viewport unit. Keep a compatible fallback when the supported browser range requires one.
- Apply `env(safe-area-inset-*)` where fixed or bottom-aligned content can collide with iOS device cutouts or the home indicator.
- Avoid fixed-height assumptions that break when Android Chrome or iOS Safari changes the visible viewport as the address bar or software keyboard appears.
- Keep text inputs and their primary actions visible and usable with the software keyboard open. On iOS Safari, avoid unintended input zoom; normally use at least a 16 CSS pixel input font instead of disabling page zoom.
- Prefer Pointer Events when one interaction must support touch, pen, and mouse. Use pointer capture only for an active gesture and always handle release, cancellation, and cleanup.
- Scope `touch-action`, pointer capture, and `preventDefault` to the smallest necessary interaction surface. Do not block page scrolling or native input behavior globally.
- Keep drag and swipe gestures out of inputs, buttons, attachment controls, and scrollable message or list regions unless their conflict behavior is explicitly designed.
- Provide non-gesture controls for essential actions, such as a close button alongside swipe-to-close.
- Respect `prefers-reduced-motion` for nonessential movement and preserve the same final state when motion is reduced.
- Prefer responsive CSS over `window` or `visualViewport` listeners. Add JavaScript viewport handling or browser-specific branches only when CSS cannot provide the required behavior, and keep their effects and cleanup in a feature hook.

## Prevent Duplicate Side Effects

Protect asynchronous actions whose duplicate execution can cause side effects, including API requests, form submissions, deletion, and payment.

- Lock the action immediately when the request starts.
- Keep the visible pending state in rendering state and connect it to the trigger's `disabled` attribute and, when useful, `aria-busy`.
- Treat the shared `ButtonSpinner` as the standard feedback for any button waiting on asynchronous work, including API requests, link metadata resolution, form submission, deletion, and similar actions.
- Before adding spinner markup or keyframes, search for the shared spinner and an existing button component with an `isPending` interface. Reuse them instead of creating feature-specific loading visuals.
- While pending, replace the visible button label with the spinner, preserve the action through an accessible pending label, set `disabled` and `aria-busy`, and keep the button's dimensions stable.
- Guard inside the event handler as well as disabling the rendered control so repeated events cannot start another request.
- Release the lock in `finally` when the flow supports retry after either success or failure.
- Do not apply blanket debouncing or locking to repeat-safe interactions such as toggles, cancellation, navigation, or setting the same state again.
- Treat client-side locking as protection against accidental repeated input, not as a replacement for server-side idempotency or a confirmed API contract.

## Preserve Shared Layout Contracts

- When a page uses a shared layout specifically to match established width, header position, spacing, or typography, keep those layout-owned values intact.
- Do not override the shared layout's core geometry in page CSS merely to approximate a screenshot. Add page-specific layout overrides only when the design explicitly differs from the shared contract.

## Integrate APIs Through the Shared Client

- Use the shared Axios client for JSON APIs and keep endpoint functions grouped by backend domain. Keep navigation-based SSO redirects separate from Axios request modules.
- Treat access and refresh tokens as HttpOnly cookies: send credentials through the shared client and do not copy tokens into React state or browser storage.
- Let endpoint functions accept `AbortSignal` for cancellable reads. Abort in hook cleanup, ignore cancellation errors, and prevent state updates after unmount.
- When known role or prerequisite data determines whether a read is allowed, let the hook accept an explicit `enabled` option. Wait until the prerequisite is resolved and skip predictably forbidden requests instead of generating an expected 403 or suppressing its global error afterward.
- On protected-request 401 responses, share one token reissue request, retry each original request at most once, and avoid refresh recursion for public auth endpoints.
- Use backend `message` values for 4XX errors. Use `알 수 없는 오류가 발생했습니다.` for 5XX, network failures, or missing messages.
- While an error modal is open, share its pending promise for concurrent errors with the same backend `errorCode` or HTTP fallback code. Do not merge network errors that have no stable code.
- When unauthorized handling requires navigation, await dismissal of the error modal before replacing the route with the login page.
- For GET 403 responses, await the deduplicated error modal and then replace the route with the home page. Keep mutation 403 responses on the current page unless the product contract explicitly says otherwise.

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
6. For mobile-sensitive UI, verify narrow viewport layout, dynamic address-bar height, software-keyboard behavior, safe areas, scrolling, and touch cancellation in representative Android Chrome and iOS Safari conditions.
7. Separate pre-existing failures from failures introduced by the change.

Before finishing, confirm:

- Components mainly render and perform local DOM wiring.
- Hooks own stateful workflows and cleanup.
- Refs hold only non-rendering mutable values.
- Utils remain pure and React-independent.
- Constants are static or clearly temporary.
- Naming distinguishes SVG icons from backend-provided media.
- No unnecessary directories or abstractions were added.
- Mobile-sensitive UI does not rely on hover, clip at narrow widths, collide with safe areas, or break native scrolling and input behavior.
- Gesture workflows handle pointer cancellation and retain an accessible non-gesture action.
- The implementation stayed within the requested scope.
