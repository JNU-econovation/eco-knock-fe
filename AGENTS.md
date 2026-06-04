# AGENTS.md

## Skills

A skill is a set of local instructions to follow that is stored in a `SKILL.md` file. Below is the list of repository-local skills that can be used in this project.

### Available skills

- `readme-maintainer`: Create or update this React + Vite frontend repository's README so it matches the current implemented scope.
  Use when the user asks to create, rewrite, refresh, or validate README content, document setup or run commands, summarize the current frontend structure, or keep README content aligned with the actual code and configuration. (file: `./.agents/skills/readme-maintainer/SKILL.md`)

## How to use skills

- Discovery: The list above is the repository-local skill registry for this project.
- Trigger rules: If the user names a skill directly, or the task clearly matches a listed skill, read that `SKILL.md` and follow it for the current turn.
- Scope: Do not carry a skill across turns unless the user mentions it again or the next task still clearly matches it.
- Missing or blocked: If a listed skill file cannot be opened, say so briefly and continue with the best fallback.

## Local guidance

- For README work, use `./.agents/skills/readme-maintainer/SKILL.md` before drafting or editing `README.md`.
- Prefer repository-local skills in `./.agents/skills` before inventing ad-hoc workflow rules.
- When adding a new local skill under `./.agents/skills`, also add it to the `Available skills` list in this file so it can be auto-discovered in future sessions.
- Keep this file short. Put detailed task instructions in the skill's `SKILL.md`, not here.
