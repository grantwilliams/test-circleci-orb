#!/usr/bin/env node
const { getProjectId } = require("./must-import");

const isEqual = require("lodash.isequal");
console.log(`Checking missing for ${getProjectId()}`);
console.log(`Is equal???:: {} and {} === ${isEqual({}, {})}`);
process.exit(1);
