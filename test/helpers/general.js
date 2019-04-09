"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_1 = require("../../package.json");
function findProblemMatcher(problemMatcherName) {
    const problemMatcher = package_json_1.contributes.problemMatchers.find(p => p.name === problemMatcherName);
    if (problemMatcher === undefined) {
        throw new Error(`Could not find problem matcher '${problemMatcherName}'`);
    }
    return problemMatcher;
}
exports.findProblemMatcher = findProblemMatcher;
function blobToLines(blob) {
    return blob.trim().split('\n');
}
exports.blobToLines = blobToLines;
//# sourceMappingURL=general.js.map