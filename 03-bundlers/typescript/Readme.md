# Using TypeScript

TypeScript is a full programming language that was designed as a superset of JavaScript. The basic idea was to start with JavaScript, enhance it with missing parts such as types, classes, or enums, and choose JavaScript as a transpilation target for the language. Over the years, many of the features that were first introduced in the TypeScript language also made it to the JavaScript language.

Today, TypeScript is the most popular way to write large-scale JavaScript projects. Nearly every package on the official npm registry comes with TypeScript-compatible type annotations – either within the package or in a dedicated package. As an example, the type annotations for the react package can be found in the @types/react package.

To use TypeScript, we need to install the typescript package. This contains the tsc script, which gives us the ability to check types and transpile TypeScript files written using the .ts or .tsx extension.

Let’s go ahead and create a new project, install typescript, and add a source file:

1. We start with the project creation. In a new directory, run the following:
```bash
npm init -y
npm install typescript --save-dev
```
2. Let’s add an index.ts file with content similar to the example for Flow:
```typescript
function square(n: number): number {
  return n * n;
}
square("2"); // Error!
```
3. We can now run this directly via the tsc command, which has been installed together with the typescript package:

```bash
npx tsc index.ts
```
