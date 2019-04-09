"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const general_1 = require("./helpers/general");
const mochaText = general_1.blobToLines(`
1..2
ok 1 mocha-problem-matcher exists in package.json
not ok 2 mocha-problem-matcher given mocha output with a failure pattern 5 has a sequence matching problemMatcher.pattern sequence
  Expected values to be strictly deep-equal:
  + actual - expected

    {
      column: '34',
  +   file: 'Folder\\Example.spec.ts',
  -   file: 'FolderExample.spec.ts',
      line: '13'
    }
  AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:
  + actual - expected

    {
      column: '34',
  +   file: 'Folder\\Example.spec.ts',
  -   file: 'FolderExample.spec.ts',
      line: '13'
    }
      at Context.it (Folder\\Example.spec.ts:114:12)
# tests 2
# pass 1
# fail 1
`);
describe('mocha-problem-matcher', () => {
    const matcherName = 'mocha';
    const createSUT = () => general_1.findProblemMatcher(matcherName);
    it('exists in package.json', () => {
        const sut = createSUT();
        assert_1.strict.ok(sut, `problemMatcher with name ${matcherName}`);
    });
    describe('given mocha output with a failure', () => {
        describe('pattern 1', () => {
            const index = 0;
            const text = mochaText[2];
            it(`has a problem match for text: '${text}'`, () => {
                const sut = createSUT();
                const pattern = sut.pattern[index];
                const actual = createProblem(pattern, text);
                const expected = {};
                assert_1.strict.deepEqual(actual, expected);
            });
        });
        describe('pattern 2', () => {
            const index = 1;
            const text = mochaText[3];
            it(`has a problem match for text: '${text}'`, () => {
                const sut = createSUT();
                const pattern = sut.pattern[index];
                const actual = createProblem(pattern, text);
                const expected = {
                    message: 'Expected values to be strictly deep-equal:'
                };
                assert_1.strict.deepEqual(actual, expected);
            });
        });
        describe('pattern 3', () => {
            const index = 2;
            for (let textIndex = 4; textIndex < 21; textIndex++) {
                const text = mochaText[textIndex];
                it(`has a problem match for text: '${text}'`, () => {
                    const sut = createSUT();
                    const pattern = sut.pattern[index];
                    const actual = createProblem(pattern, text);
                    const expected = {};
                    assert_1.strict.deepEqual(actual, expected);
                });
            }
            {
                const text = mochaText[21];
                it(`does not have a problem match for text: '${text}'`, () => {
                    const sut = createSUT();
                    const pattern = sut.pattern[index];
                    const actual = createProblem(pattern, text);
                    const expected = null;
                    assert_1.strict.deepEqual(actual, expected);
                });
            }
        });
        describe('pattern 4', () => {
            const index = 3;
            const text = mochaText[21];
            it(`has a problem match for text: '${text}'`, () => {
                const sut = createSUT();
                const pattern = sut.pattern[index];
                const actual = createProblem(pattern, text);
                const expected = {
                    column: '12',
                    file: 'Folder\\Example.spec.ts',
                    line: '114',
                };
                assert_1.strict.deepEqual(actual, expected);
            });
        });
    });
    function createProblem(pattern, text) {
        const regexp = new RegExp(pattern.regexp);
        const message = pattern.message;
        const file = pattern.file;
        const line = pattern.line;
        const column = pattern.column;
        const match = regexp.exec(text);
        if (!match) {
            return null;
        }
        const result = {};
        if (message) {
            result.message = match[message];
        }
        if (file) {
            result.file = match[file];
        }
        if (line) {
            result.line = match[line];
        }
        if (column) {
            result.column = match[column];
        }
        return result;
    }
});
//# sourceMappingURL=mocha.spec.js.map