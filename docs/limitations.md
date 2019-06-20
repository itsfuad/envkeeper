# Supported syntax

This checker reads *names* from `NAME=value` and `export NAME=value` lines.
Values are never printed or parsed. It intentionally does not implement shell
interpolation, multi-line values, or environment variable expansion.

Invalid lines are reported by line number. Committed examples must never
contain production credentials.
