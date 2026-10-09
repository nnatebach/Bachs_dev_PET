# Exercise 2

The steps below assume you have a terminal open in the `3-compiler/exercise/` directory.

```zsh
cd 3-compiler/exercise/
```

## Step 1: Install dependencies & run test

This directory contains a simple project defined in `package.json`.

It only has one (dev) dependency, `vitest` to let us run tests.

Install the project dependencies:

```zsh
npm i
```

Now, you can run the tests in `simple.test.js` with the command: 

```zsh
npm run test
```

Exit the test runner with CTRL+C. 

## Step 2: Setup TypeScript


Install TS as a dev dependency:

```zsh
npm i -D typescript
``` 

Add a `compile` script in `package.json`: 

```json
"scripts": {
  "test": "vitest",
  "compile": "tsc"
},
```

What happens when you run `npm run compile`?

## Step 3: Create `tsconfig.json` & compile to JS

Generate a default `tsconfig.json` with the command: 

```zsh
tsc --init
```

Read through the config file. What do you notice? 

Now try running `npm run compile` again.



## Step 4: Fix the code!



Let's make sure `tsc` is happy before we run tests. 

Update the test command to run `tsc --noEmit` before running `vitest`:

```json
"scripts": {
  "test": "tsc --noEmit && vitest",
  "compile": "tsc"
},
```

Edit `compileMe.ts` to add the missing type declarations to fix the TS errors. 

Compare your solution to the reference in the `solution/` directory, keeping in mind that there may be other ways to fix these errors.
