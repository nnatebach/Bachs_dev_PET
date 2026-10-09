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

---

# The errors

## Error 1:
- Problem:
  ```ts
  checkMe.js:12:22 - error TS2551: Property 'creater' does not exist on type '{ name: string; officialName: string; released: number; creator: string; company: string; }'. Did you mean 'creator'?
  ```
- Reason: Typo
- Solution: Change `creater` to `creator`

## Error 2:
- Problem:
  ```ts
  checkMe.js:15:1 - error TS2322: Type 'string' is not assignable to type '{ name: string; officialName: string; released: number; creator: string; company: string; }'.
  ```
- Reason: We're having an object named `language`, yet we're also assigning a String to it
  ```ts
  let language = {
    name: 'JavaScript',
    officialName: 'ECMAScript',
    released: 1995,
    creator: 'Brendan Eich',
    company: 'Netscape'
  }
  ```
  ```ts
  language = 'TypeScript';
  ```
- Solution: Make it a property of the object `language`. For example: `language.name`

## Error 3:
- Problem:
  ```ts
  checkMe.js:23:9 - error TS2339: Property 'lgo' does not exist on type 'Console'.
  ```
- Reason: Typo
- Solution: It's supposed to be
  ```ts
  console.log(language.company); // TypeError: console.lgo is not a function
  ```