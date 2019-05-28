# EnvKeeper

Compare keys in `.env` and `.env.example` before deploying a project.
Reports missing, extra and duplicate keys **without exposing their values**.
Requires Node.js 10 or later; no package installation.

## Usage

```
node bin/envkeeper.js examples/.env.development examples/.env.example
node bin/envkeeper.js examples/.env.development examples/.env.example --json
node tests/env.test.js
```

Exits `0` on a match, `1` on drift and `2` for wrong arguments or unreadable files.
Your actual `.env` should be ignored by version control.
