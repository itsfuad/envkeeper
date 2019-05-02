#!/usr/bin/env node
'use strict';
const fs = require('fs');
const env = require('../lib/env');
function read(path) {
  try { return fs.readFileSync(path, 'utf8'); }
  catch (err) { console.error('Cannot read ' + path + ': ' + err.message); process.exit(2); }
}
const args = process.argv.slice(2);
if (args.length < 2) { console.error('Usage: envkeeper ACTUAL.env TEMPLATE.env [--json]'); process.exit(2); }
const diff = env.difference(env.parseEnv(read(args[0])), env.parseEnv(read(args[1])));
if (args.indexOf('--json') !== -1) console.log(JSON.stringify(diff, null, 2));
else {
  ['missing','extra','duplicateActual','duplicateExpected','invalidActual','invalidExpected'].forEach(function (key) {
    console.log(key + ': ' + (diff[key].length ? diff[key].join(', ') : 'none'));
  });
}
const hasProblem = Object.keys(diff).some(function (key) { return diff[key].length > 0; });
process.exitCode = hasProblem ? 1 : 0;
