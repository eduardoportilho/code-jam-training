# Google Code Jam Training

Boilerplate for solving Google Code Jam problems

## Utilitary libraries documentation:

- [Lodash](https://lodash.com/docs/4.17.4)
- [numbers.js](http://numbers.github.io/)
- [BigInteger.js](https://github.com/peterolson/BigInteger.js)

## Usage:

### To add a new problem:
`$ npm run new <problem-id>`

### To run a solution:
`$ npm run solve <problem-id> <input-name-no-extension>`
(e.g. `npm run solve 2016.q.c C-large-practice`)

### To debug:
- Edit `/.vscode/launch.json` and set the `args` property of the "Solve" configuration to match the solve command args.
- On VS Code, set your breakpoints and pre F5
- Reference: [VS code](https://code.visualstudio.com/docs/editor/debugging) [docs](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)

## Problems:

- 2016.q.a: OK
- 2016.q.b: OK
- 2016.q.c: OK
- 2016.q.d: Open...
- 2015.q.a: OK
- 2015.q.b: Ok after reviewing solution
