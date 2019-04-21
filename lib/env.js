/* No npm dependency: we only need assignment keys, not shell expansion. */
'use strict';
function parseEnv(input) {
  const keys = {}, duplicates = [], badLines = [];
  String(input).split(/\r?\n/).forEach(function (line, index) {
    const clean = line.trim();
    if (!clean || clean.charAt(0) === '#') return;
    const match = /^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=/.exec(clean);
    if (!match) { badLines.push(index + 1); return; }
    const name = match[1];
    if (Object.prototype.hasOwnProperty.call(keys, name)) duplicates.push(name);
    keys[name] = true;
  });
  return { keys: Object.keys(keys).sort(), duplicates: duplicates.sort(), invalidLines: badLines };
}
function difference(actual, expected) {
  const a = actual.keys, b = expected.keys;
  return {
    missing: b.filter(function (key) { return a.indexOf(key) === -1; }),
    extra: a.filter(function (key) { return b.indexOf(key) === -1; }),
    duplicateActual: actual.duplicates,
    duplicateExpected: expected.duplicates,
    invalidActual: actual.invalidLines,
    invalidExpected: expected.invalidLines
  };
}
module.exports = { parseEnv: parseEnv, difference: difference };
