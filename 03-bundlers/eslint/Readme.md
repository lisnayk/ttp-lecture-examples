# Using ESLint and alternatives

ESLint statically analyzes code to identify common patterns and find problems. It can be used as a library from your Node.js applications, as a tool from your Node.js scripts, in your CI/CD pipelines, or implicitly within your code editor.

The general recommendation is to install ESLint locally in your Node.js project. A local installation can be done with your favorite package manager, such as npm:

```bash
npm install eslint --save-dev
```

In most cases, you’ll want to specify the --save-dev flag. This will add a dependency to the development dependencies, which are not installed in consuming applications and will be skipped for production installations. Indeed, development dependencies are only interesting during the project’s actual development.

Alternatively, you can also make ESLint a global tool. This way, you can run ESLint even in projects and code files that do not already include it. To install ESLint globally, you need to run the following:

```bash
npm install eslint --global
```

Potentially, you’ll need elevated shell access (e.g., using sudo) to install ESLint globally. The general recommendation is to avoid using elevated shell access, which implies avoiding global installations.

Global versus local installations

npm is not only a great way to distribute packages but also to distribute tools. The standard installation of npm creates a special directory for such tools. This dedicated directory is added to your system’s PATH variable, allowing direct execution of anything that is inside the directory. By using a global installation, a tool such as ESLint is added to the dedicated directory, giving us the option of running it just by typing eslint in the command line.

On the other hand, tools in a local installation are not placed in the dedicated directory. Instead, they are available in the node_modules/.bin folder. To avoid running lengthy commands such as ./node_modules/.bin/eslint, we can use the npx utility.

npx is a task runner installed together with Node.js and npm. It intelligently checks whether the provided script is installed locally or globally. If nothing is found, then a package is temporarily downloaded from the npm registry, executing the script from the temporary installation. Consequently, running npx eslint in a project where ESLint is installed will start the linting.

Let’s initialize a new project (npm init -y) and install eslint as a development dependency. Now that you’ve installed ESLint, you can actually use it on some sample code:

1. For this, we can leverage the sample from the previous section:
   index.js

```javascript
export function div(a, b) {
    return a / b
}
```

2. Before we can run eslint, we also need to create a configuration. Having a configuration file is something that almost all utilities for frontend development will require. In the case of ESLint, the configuration file should be named .eslintrc.
   Place the following .eslintrc file in the same directory as package.json:

```json
{
    "root": true,
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 2020
    },
    "rules": {
        "semi": ["error", "always"]
    }
}
```

There are different ways to write a configuration way for ESLint. In the preceding snippet, we used the JSON format, which should feel quite familiar for anyone with a JavaScript or web development background. Another common approach is to use the YAML format.

3. In the preceding configuration, we instruct ESLint to stop looking for parent configurations. As this is indeed the configuration for our project, we can stop at this level. Additionally, we configure ESLint’s parser to actually parse ESM following a very recent specification. Finally, we configure the rule for semicolons to throw an error if semicolons are missing.
   The result of applying this ruleset can be seen in the following code snippet. Running npx eslint starting on all JavaScript files from the current directory (.) looks like this:

```bash
npx eslint .

```

As expected, the linter complains. However, this kind of complaint is certainly in the positive region. Rather constructively, ESLint also tells us about the option to automatically fix the issue.

4. Let’s run the same command with the suggested --fix option:

```bash
npx eslint . --fix
```

5. How about other rules? What if we want to force code to use anonymous arrow functions instead of the named functions? While many things can be covered by the rules coming directly with ESLint, the system can be extended with rules from third-party packages. Third-party packages that bring in additional functionality for ESLint are called ESLint plugins.
   To bring in a rule to enforce the usage of anonymous arrow functions, we can use an ESLint plugin. The package for this is called eslint-plugin-prefer-arrow. Let’s install it first:

```bash
npm install eslint-plugin-prefer-arrow --save-dev
```

Now, we can change the configuration. We need to include a reference to the plugin and also specify the rule:
.eslintrc

```json
{
    "root": true,
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 2020
    },
    "plugins": ["prefer-arrow"],
    "rules": {
        "semi": ["error", "always"],
        "prefer-arrow/prefer-arrow-functions": ["error", {}]
    }
}
```

With this configuration, we can now test whether the function declaration is indeed qualified as an error:

```bash
npx eslint .
```

In contrast to the previous error, we are not seeing any hint of an automatic fix here. In such cases, the author of the code has to do all the changes to please the linter manually.

There are plenty of alternatives to ESLint. In the past, the TypeScript-specific variant TSLint was quite popular. However, a couple of years ago, the team behind TSLint decided to actually merge their rules into ESLint – also making ESLint the de facto standard for linting TypeScript files. Today, the most popular alternatives are Rome, quick-lint-js, and JSHint.

# Setting up Prettier and EditorConfig

Prettier is a code formatter that works with a lot of different source files. Among the supported file types, we have plain JavaScript, Flow, TypeScript, HTML, CSS, SASS, Markdown, and many more. Prettier is also integrated into many different editors such as Atom, Emacs, Sublime Text, Vim, Visual Studio, or VS Code.

Such as the previous tools, Prettier can be installed locally or globally. Adding Prettier to an existing project can be done by installing the prettier package from the npm registry:

```bash
npm install prettier --save-dev
...
npx prettier index.js
...
npx prettier index.js --write
```

Prettier can format JavaScript code even without any configuration. To run Prettier on an existing code file, you can use the prettier utility with npx. For instance, to apply formatting to your previous code file, you can run:
To configure Prettier, a .prettierrc file should be added to the root of the project – right next to package.json. The file can be written with JSON. An example is shown here:

To configure Prettier, a .prettierrc file should be added to the root of the project – right next to package.json. The file can be written with JSON. An example is shown here:
.prettierrc

```json
{
    "tabWidth": 4,
    "semi": false,
    "singleQuote": true
}
```

EditorConfig is a standard to help maintain consistent coding styles for a project. It is established by a file named .editorconfig. Pretty much every editor supports this file.

An .editorconfig example looks like the following:

**.editorconfig**

```text
root = true
[*]
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
```

As with ESLint, we can use nested configuration files – that is, specialize the configuration for subdirectories by having another .editorconfig file in them. The root = true configuration tells the editor to stop traversing the file system upward for additional configuration files. Otherwise, this file has only a single section, [*], matching all text files.

Since Prettier rules will always take precedence and overwrite the ones from the .editorconfig file, it makes sense to remove conflicting rules. Otherwise, we will be only left with the JavaScript-specific formatting rules – for example, for semicolons and the preferred quote style, in .prettierrc. The general text formatting rules are now specified via EditorConfig implicitly.
