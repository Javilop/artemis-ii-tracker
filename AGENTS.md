# Coding Agent Guide

This repo is a config-driven space/event tracker centered on `index.html`.

## Scope
- Make UI and behavior changes in `index.html`.
- Define event-specific content in `events/`, not in hardcoded branches when config can express it.
- Put reusable 3D assets in `spacecraft/`.

## Preferred Patterns
- Prefer generic event logic over one-off event code.
- Use the URL hash for state such as `event` and `focus`, and preserve unrelated hash keys when updating one value.
- Keep titles, button labels, video, and event metadata driven by the selected event config.
- Avoid adding duplicate scene objects when an existing object can be reused.

## Event Configs
- Add or update event files in `events/`.
- Keep config names lowercase with no spaces.
- Put mission/event labels, dates, colors, object paths, and other per-event values in config whenever possible.

## Validation
- After editing `index.html`, extract the module script and run:
- `node --check /tmp/space-index-check.mjs`
- Confirm there are no leftover references after refactors with `rg`.

## Editing Rules
- Keep changes minimal and local to the request.
- Do not remove user content or unrelated behavior.
- Match the existing visual language unless the request says otherwise.
