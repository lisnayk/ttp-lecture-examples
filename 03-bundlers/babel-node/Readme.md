# Integrating Babel

In the last decade, JavaScript ascended from a simple scripting language to the most used programming language in the whole world. With the increased popularity, the language has also gotten a lot of interesting features. Unfortunately, it always takes a while until the latest features are made available in all implementations. The problem gets worse if we want to use the latest language features in old implementations anyway.

This is a problem that has been known by frontend developers for years – after all, the version and variety of the browser used cannot be predetermined by the developer. Only the user makes this decision – and an older browser may not understand some of the modern features that the developer wants to use. In Node.js, we don’t have exactly the same problem – as we can theoretically decide the version of Node.js – but it can be a similar issue if Node.js does not have the latest language features or if we create tools that are supposed to run on other people’s machines.

A nice way out of the language feature lockdown (that is, the restriction to only use the feature set supported by the engine) is to use a tool that understands the latest language specification and is capable of properly translating it into an older language specification. The process of such a programming language translation is called transpilation. The tool is called a transpiler.

One of the most known transpilers for JavaScript is Babel. Its power lies in a rich plugin ecosystem. Actually, it is so easy to extend the JavaScript language with constructs using Babel, that many features were first introduced in Babel before they either became part of the official standard or a de facto standard. An example of the former is async/await, which is a fairly complex feature. An example of the latter is JSX, that is, the extension of JavaScript with XML-like constructs.

The following code is using async/await and would be incompatible with Node.js before version 7.6.0:

```javascript
function wait(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
async function example() {
  console.log('Starting...');
  await wait(1000);
  console.log('1s later...');
  await wait(1000);
  console.log('2s later...');
  await wait(3000);
  console.log('Done after 5s!');
}
example();
```

If we want to make this compatible with older versions (or, in general, JavaScript engines that cannot handle the modern async/await syntax), then we can use Babel.

There are three ways of transpiling the code with Babel:

- We can use the @babel/node package, which is a thin wrapper around Node.js. Essentially, it will transpile the modules during execution – that is, when they are needed.
- The @babel/cli package can be used to transpile the modules beforehand and run Node.js on the transpiled modules.
- Alternatively, the @babel/core package can be used to programmatically control the transpilation process – that is, which modules are being transpiled and what is done with the results.
Each way has its own advantages and disadvantages. For instance, choosing @babel/node might be the easiest to get running, but will actually give us a small performance hit and some uncertainty. If some lesser-used module has a syntax problem, then we would only find out later when the module is used.

Likewise, @babel/cli certainly hits the sweet spot between convenience and power. Yes, it only works with files, but that is what we want in almost all cases.

One way to see very conveniently how Babel handles things is to use the interactive website located at https://babeljs.io/repl.

## Setting up Babel

Now we need to install Babel packages. You can do this using npm by running the following command:

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

Once Babel is installed, you’ll need to create a configuration file called .babelrc in the root directory of your project. This file will tell Babel which presets and plugins to use when transpiling your code. Here's an example .babelrc file:
```javascript
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

This configuration file tells Babel to use the @babel/preset-env preset, which includes all the plugins necessary to transpile modern JavaScript code into older versions.
Now that Babel is set up, you can start transpiling your code. To do this, you’ll need to run the following command:
```bash
babel index.js --out-dir dist.js
```

