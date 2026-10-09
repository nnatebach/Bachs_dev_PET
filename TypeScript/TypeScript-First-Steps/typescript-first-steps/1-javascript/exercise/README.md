# Exercise 1

The steps below assume you have a terminal open in the `1-javascript/exercise/` directory.

```zsh
cd 1-javascript/exercise/
```


## Step 1: Install TypeScript

Use `npm` to install the `typescript` package globally:

```zsh
npm i -g typescript
```

Then, verify the installation by checking the version number:

```zsh
tsc --version
```

This should print `Version 5.9.2` or similar, if TS was successfully installed.

## Step 2: Use TS to typecheck a JS file

Run the `tsc` compiler on `checkMe.js` with these optional settings:

```zsh
tsc --checkJs --noEmit checkMe.js
```

What errors does TS find? 

Now try running the typechecker again, but with the `--strict` option:

```zsh
tsc --checkJs --noEmit --strict checkMe.js
```

What errors are reported now?

## Step 3: Fix the errors

Edit `checkMe.js` to fix the errors that TS found. 

Run the typechecker on your solution to ensure that no errors are found, even with `--strict`.

Compare your solution to the reference in the `solution/` directory, keeping in mind that there may be other ways to fix these errors.

