const os   = require('os');
const fs   = require('fs');
const core = require('@actions/core');


// Globals.
const E = process.env;


// Read a file and normalize line endings to LF.
function readFile(pth) {
  var d = fs.readFileSync(pth, 'utf8');
  return d.replace(/\r\n?/g, '\n');
}
// Write a file and normalize line endings to the current OS.
function writeFile(pth, d) {
  d = d.replace(/\r\n?|\n/g, os.EOL);
  fs.writeFileSync(pth, d);
}


// Check if an array has a regex match.
function hasRegex(x, re) {
  for (var v of x)
    if (re.test(v)) return true;
  return false;
}
// Populate credentials for npm and GitHub Packages from environment variables.
function populateDefaultCredentials(xs) {
  if (!hasRegex(xs, /^(auto|default)$/i)) return xs;
  xs  = xs.filter(r => !/^auto$/i.test(r));
  const NPM_TOKEN    = E.NPM_TOKEN || '';
  const GITHUB_TOKEN = E.GH_TOKEN  || E.GITHUB_TOKEN || '';
  if (NPM_TOKEN)    xs.push(`//registry.npmjs.org/:_authToken=${NPM_TOKEN}`);
  if (GITHUB_TOKEN) xs.push(`//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}`);
  return xs;
}


// Fix a credential string.
function fixCredential(x) {
  var i = x.lastIndexOf(':');
  var k = x.substring(0, i).trim();
  var v = x.substring(i+1) .trim();
  k = k.replace(/^((\w+:)?\/\/)?/, '//').replace(/\/?$/, '/');
  v = v.replace(/^(_?authToken=)?/i, '_authToken=');
  return `${k}:${v}`;
}
// Fix an entry (config) string.
function fixEntry(x) {
  var i = x.lastIndexOf('=');
  var k = x.substring(0, i).trim();
  var v = x.substring(i+1) .trim();
  return `${k}=${v}`;
}


// Main function.
function main() {
  const HOME = E.HOME || E.HOMEPATH || E.USERPROFILE;
  const PATH = E.NPM_CONFIG_USERCONFIG || `${HOME}/.npmrc`;
  let   path = core.getInput('path')   || PATH;
  let  reset = core.getBooleanInput('reset') || false;
  let credentials = core.getMultilineInput('credentials') || [];
  let     entries = core.getMultilineInput('entries')     || [];
  let   npmrc = reset? '' : readFile(path);
  credentials = populateDefaultCredentials(credentials);
  for (let c of credentials)
    npmrc += fixCredential(c) + '\n';
  for (let e of entries)
    npmrc += fixEntry(e) + '\n';
  writeFile(path, npmrc);
}
main();
