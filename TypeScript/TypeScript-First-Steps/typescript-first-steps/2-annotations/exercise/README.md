# Exercise 2

The steps below assume you have a terminal open in the `2-annotations/exercise/` directory.

```zsh
cd 2-annotations/exercise/
```

## Step 1: Assess the situation

The file `typeMe.js` has some issues! 

Read through the file to understand what's going on and how the code is expected to work.

Run the file to see what happens: 

```zsh
node typeMe.js
```

Houston, we have some problems! Let's fix them with TS.

## Step 2: Migrate to TS & install `tsx`

Rename the file to use a `.ts` extension.

Now that we have a TypeScript file, we can't run the script with `node <filename>` like we're used to.

Newer versions of Node [support running `.ts` files (with some limitations)](https://nodejs.org/docs/latest-v24.x/api/typescript.html), but for full TS support we will use the library [`tsx`](https://tsx.is/) to run our `.ts` file. 


Install `tsx` globally: 

```zsh
npm i -g tsx
```

Then, use `tsx` to run the script:

```zsh
tsx typeMe.ts
```

You should see the same result as when running the `.js` file with `node`, since we haven't changed anything... yet!

To automatically re-run the script each time you save new edits, run `tsx` in `watch` mode:

```zsh
tsx --watch typeMe.ts
```


## Step 2: Add type annotations

Time to start typing!

Add missing type annotations for variables and function signatures, creating new types with type aliases as needed.

Remember the syntax for type aliases and variable & function annotations, as illustrated in the example below: 

```ts
// Type Alias
type ManyNumbers = number[];

// Type Annotations
const myNumbers: ManyNumbers = [1,2,3,4];

function sum(numbers: ManyNumbers): number {
    if (numbers.length === 0) {
        return 0;
    } else if (numbers.length === 1) {
        return numbers[0];
    } else {
        return numbers[0] + sum(numbers[1:]);
    }
}

sum(myNumbers);
```

## Step 3: Fix the code!

Make sure functions are returning the correct types of data, and fix any other problems you find!

Compare your solution to the reference in the `solution/` directory, keeping in mind that there may be other ways to fix these errors.


## Step 4: Check & compile

Since `tsx` is designed to let us run our TS code quickly during development, it _doesn't_ type check like `tsc`!

So let's make sure our (fixed, running) TS code checks out with `tsc`:

```zsh
tsc --strict typeMe.ts
```

If you run into any errors, fix them!

What happens once `tsc` runs without errors? (hint: you'll see a new file!)

---

# Notes

## Goals
- Migrate JS to TS
- Meet new TS syntax & concepts
- Specify types for variables & functions
- Compose & customize types

## TypeScript Syntax - Variables & Functions

### Types
- Two kinds of Type
  - [Primitive Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean)
  - [Literal Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)
- Typed Variables
  - Typing and assignment at the same time
    - Example 1:
      ```ts
      let n: number = 4;
      n = 5; // OK
      n = 'four'; // Error!
      ```
      > [!CAUTION]
      > Type 'string' is not assignable to type 'number'.

      Reason:
        - We declared the variable `n` with the type of `number`
        - `5` is the type `number` => OK
        - `'four'` is the type `string` => Not OK! => Error!
    - Example 2:
      ```ts
      let s: string = 'hello';
      s = 'hi'; // OK
      s = null; // Error!
      ```
      > [!CAUTION]
      > Type 'null' is not assignable to type 'string'.

      Reason:
        - Variable `s` was declared with the type of `string`
        - `'hi'` is the type `string` => OK
        - `null` is the type `object` => Not OK! => Error!
  - Typing *before* assignment
    ```ts
    let n: number;
    n = 42; // OK
    n = 'hello'; // Error!
    n = null; // Error!
    ```
  - Primitive Types
    ```ts
    let n: number = 1;
    let s: string = 'hi';
    let b: boolean = true;
    ```
    ```ts
    let missing: undefined = undefined;
    let nothing: null = null;
    ```
    > [!NOTE]
    > We have more than just the primitive types in TS<br>
    > In fact, we can have pretty much any type we want depending on what we want to do with our program.
  - Literal types
    - String
        ```ts
        let state: 'alive' | 'dead';
        state = 'alive'; // OK
        state = 'dead'; // OK
        state = 'thriving'; // Error!
        ```
        - The variable `state` must have either the value `alive` or `dead`
        - Any other type is not acceptable
        - This is useful when we want to constrict the value of a variable
    - Number:
        ```ts
        let four: 4 = 5
        ```
        > [!CAUTION]
        > Type '5' is not assignable to type '4'.

        > Similar to string, here we declare variable `four` with type `4`<br>
        > As we assign the value `5` to the variable `four`, the code breaks

- Typed Functions

  Specifying the type for the **input** and the __returned value__ of a function
    ```ts
    function add(a: number, b: number): number {
        return a + b;
    }
    add(140, 60); // 200
    add('oh', 'no'); // Error!
    ```
    > [!CAUTION]
    > Argument of type 'string' is not assignable to parameter of type 'number'.

    > `number` is the **input** and the __returned value__ of this function. We annotate that with the `:`
    ```ts
    const concat = (a: string, b: string): string => {
        return a + b;
    }
    concat('oh', 'yeah'); // 'ohyeah'
    concat(40, 4); // Error!
    ```
    > Same thing for the arrow function<br>
    > `string` is the **input** and the __returned value__ of this function

    > [!NOTE]
    > JavaScript would have given a [type coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion) value

> [!TIP]
> Check out TypeScript [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)