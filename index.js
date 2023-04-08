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
// Populate default (auto) registries for npm and GitHub Packages.
function populateDefaultRegistries(registries) {
  if (!hasRegex(registries, /^auto$/i)) return registries;
  registries = registries.filter(r => !/^auto$/i.test(r));
  const NPM_TOKEN    = E.NPM_TOKEN || '';
  const GITHUB_TOKEN = E.GH_TOKEN  || E.GITHUB_TOKEN || '';
  if (NPM_TOKEN)    registries.push(`//registry.npmjs.org/:_authToken=${NPM_TOKEN}`);
  if (GITHUB_TOKEN) registries.push(`//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}`);
  return registries;
}


// Fix a scope string.
function fixScope(txt) {
  var i = txt.lastIndexOf('=');
  var k = txt.substring(0, i).trim();
  var v = txt.substring(i+1) .trim();
  if (!k.startsWith('@')) k  = '@' + k;
  if (!k.includes(':'))   k += ':registry';
  if (!v.includes('//'))  v  = '//' + v;
  if (/^\w+:/.test(v))    v  = 'https:' + v;
  return `${k}=${v}`;
}
// Fix a registry string.
function fixRegistry(txt) {
  var i = txt.lastIndexOf(':');
  var k = txt.substring(0, i).trim();
  var v = txt.substring(i+1) .trim();
  k = k.replace(/^((\w+:)?\/\/)?/, '//').replace(/\/?$/, '/');
  v = v.replace(/^(_?authToken=)?/i, '_authToken=');
  return `${k}:${v}`;
}
// Fix an entry (config) string.
function fixEntry(txt) {
  var i = txt.lastIndexOf('=');
  var k = txt.substring(0, i).trim();
  var v = txt.substring(i+1) .trim();
  return `${k}=${v}`;
}


// Main function.
function main() {
  const HOME = E.HOME || E.HOMEPATH || E.USERPROFILE;
  const PATH = E.NPM_CONFIG_USERCONFIG || `${HOME}/.npmrc`;
  let   path = core.getInput('path')   || PATH;
  let  reset = core.getBooleanInput('reset') || false;
  let     scopes = core.getMultilineInput('scopes')     || [];
  let registries = core.getMultilineInput('registries') || [];
  let    entries = core.getMultilineInput('entries')    || [];
  let  npmrc = reset? '' : readFile(path);
  registries = populateDefaultRegistries(registries);
  for (let s of scopes)
    npmrc += fixScope(s) + '\n';
  for (let r of registries)
    npmrc += fixRegistry(r) + '\n';
  for (let e of entries)
    npmrc += fixEntry(e) + '\n';
  writeFile(path, npmrc);
}
main();
