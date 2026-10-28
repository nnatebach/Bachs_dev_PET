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

## Arrays & Objects

- Typed Arrays
  - `number` typed array
    ```ts
    const digits: number[] = [1,2,3];
    digits.push(4); // OK
    digits.push('no go'); // Error!
    ```
    > [!CAUTION]
    > `digits.push('no go'); // Error!`<br>
    > Argument of type 'string' is not assignable to parameter of type 'number'.
  - `string` typed array
    ```ts
    const letters: string[] = 'hello'.split();
    letters.push('!'); // OK
    letters.push(5); // Error!
    ```
    > [!CAUTION]
    > `letters.push('!'); // OK`<br>
    > Expected 1-2 arguments, but got 0.<br>
    > `letters.push(5); // Error!`<br>
    > Argument of type 'number' is not assignable to parameter of type 'string'.
- Typed Objects
  ```ts
  let user: {name: string, id: number};
  user = {name: 'Anjana', id: 1234};
  user.name = 'Nanjana'; // OK
  user.id = 4321; // OK
  user.name = null; // Error!
  user.id = '1234'; // Error!
  user.color = 'blue'; // Error!
  ```
    Explanation:
    - The object `user` has
      - Property `name` of type `string`
      - Property `id` of type `number`
    - Same typed values work just fine
      ```ts
      user = {name: 'Anjana', id: 1234};
      user.name = 'Nanjana'; // OK
      user.id = 4321; // OK
      ```
    - Different typed values do **not** work
      ```ts
      user.name = null; // Error!
      user.id = '1234'; // Error!
      user.color = 'blue'; // Error!
      ```
      > [!CAUTION]
      > Type `null` is not assignable to type `string`.<br>
      > Type `string` is not assignable to type *number*.<br>
      > Property 'color' does not exist on type `{ name: string; id: number; }`.

- Customizing typed objects

  For the `color` property to be usable, you'll need to define it within the `user` object
  ```ts
  let user: {name: string, id: number, color: string};
  ```
  Then this line will work
  ```ts
  user.color = 'blue';
  ```
  Yet this line breaks
  ```ts
  user = {name: 'Anjana', id: 1234};
  ```
  > [!CAUTION]
  > Property 'color' is missing in type '{ name: string; id: number; }' but required in type '{ name: string; id: number; color: string; }'.

  Solution: Add the missing property `color` and assign a value to it
  ```ts
  user = {name: 'Anjana', id: 1234, color: 'blue'};
  ```
- [Optional properties](https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties)
  ```ts
  let user: {
    id: number,
    username: string,
    fullname?: string,
  };
  user = {id: 1, username: 'anjana'}; // OK
  ```
  - Fix backwards compatibility
    - `fullname?: string` tells TypeScript that the property `fullname` might be *undefined*.
    - The line `user = {id: 1, username: 'anjana'};` would have broken since the property `fullname` is __not__ used.
      > [!TIP]
      > The _optional properties_ are useful for maintaining backwards compatibility
  - Calling a method on an *undefined* property
    ```ts
    user.fullname.toUpperCase()
    ```
    > [!CAUTION]
    > `user.fullname` is possibly 'undefined'.

    Since we declared `fullname` as either of `string` or `undefined` type with the `?`
    ```ts
    fullname?: string
    ```
    We can't assume that `fullname` will always be defined to call any method on it.

    > [!NOTE]
    > As long as we've added `undefined` as one of the possibilities, the rest of our code has to take that into account.

  > [!WARNING]
  > _optional properties_ and _optional chaining_ are **NOT** the same!

- Union Types
  - Example 1
    ```ts
    let numberOrString: number | string;
    numberOrString = 4;
    // OK
    numberOrString = '4';
    // OK
    numberOrString = null; // Error!
    ```
    > *numberOrString* can either be of type *number* or *string*

    > [!CAUTION]
    > `numberOrString = null;` // Error!<br>
    > Type 'null' is not assignable to type 'string | number'.
  - Example 2:
    ```ts
    let nullishNumber: number | null;
    nullishNumber = 4;
    // OK
    nullishNumber = '4';
    // Error!
    nullishNumber = null; // OK
    ```
    > [!CAUTION]
    > `nullishNumber = '4';`<br>
    > Type 'string' is not assignable to type 'number'.
    - Variable `nullishNumber` is typed as either `number` or `null`
    - The way the variable `nullishNumber` is declared is similar to how the variable `fullname` was declared earlier `fullname?: string`.
  - Example 3: Declare a variable typed "array of number" with `number[]`
    ```ts
    let numberOrNumbersOrNull: number | number[] | null
    numberOrNumbersOrNull = 4;
    // OK
    numberOrNumbersOrNull = [4];
    // Ok!
    numberOrNumbersOrNull = null; // OK
    ```
    > [!NOTE]
    > `numberOrNumbersOrNull = [4];` works fine
    > `numberOrNumbersOrNull = ['4'];` breaks, because `['4']` is an array of *string* **not** *number*.
  - Example 4: Array of mixed types
    ```ts
    let numberOrNumbersOrNull: (number | string)[]
    ```
    An array with a mix of *number* and *string*<br>
    You can add as many types as you want
    ```ts
    let numberOrNumbersOrNull: (number | string | undefined)[]
    ```
    > [!NOTE]
    > Without the parenthesis, it is **no** longer an array of mixed type<br>
    > For example, these two variables are **not** of the same type
    > - `let numberOrNumbersOrNull: (number | string)[]`<br>
    > => An array of *number* and *string*
    > - `let numberOrNumbersOrNull: number | string[]`<br>
    > *numberOrNumbersOrNull* is of typed *number* **or** an array of string.

## Type Narrowing, Type Guards and Type Aliases
  - Type Narrowing

    This can be used with Union types to narrow down which exact side of the Union a value might be so we don't do things like calling properties that don't exist
    ```ts
    let elemOrNull: HTMLElement | null;
    elemOrNull = document.getElementById('might-exist');
    elemOrNull.addEventListener('click', () => {
        console.log("will this work?");
    }); // Error!
    ```
  - Type Guards
    - This can be an _if statement_ or some other times a *ternary*
    - We want to handle the two different narrower types with _type guards_ when the value is either a *null* or does exist
      ```ts
      if (elemOrNull === null) {
          console.log("not found");
      } else {
          elemOrNull.addEventListener('click', () => {
              console.log("found");
          })
      }
      ```
      > [!CAUTION]
      > 'elemOrNull' is possibly 'null'.

      > [!NOTE]
      > JavaScript would have thrown an error but TypeScript would not.<br>
      > It read our code and know which branch of the _if statement_ that we're in and which already got eliminated.

    > [!NOTE]
    > Since _one size does not fit all_, we're going to need to customize our code to create whatever the particular types are that we need.

- Type Aliases
  - We can create a Type Alias with the keyword `type`
  - It's the same way how we declare a variable

    ```ts
    type StringOrNumber = string | number;
    type LogLevel = 'log' | 'error' | 'warn';
    type User = {
        id: number,
        username: string,
        fullname?: string,
    };
    ```
    - Type **StringOrNumber** is a *Union* of type *string* or *number*
    - **LogLevel** is of *Union* with *literal* typed of *strings* *'log'*, *'error'* or *'warn'*
  - Create an object **user1** with **User** typed
    ```ts
    const user1: User = {id: 1, username: 'one', fullname: 4}
    ```

## Migrating from JavaScript to TypeScript

- Procedures
  1. Step 1: Assess the situation
      ```shell
      node typeMe.js
      ```
      Error:
      ```shell
      const count = event.rsvps.length;
      ```
      > [!CAUTION]
      > TypeError: Cannot read properties of undefined (reading 'length')
  2. Step 2: Migrate to TS & install tsx
       1. Change filename
          ```shell
          mv typeMe.js typeMe.ts
          ```
       2. Install *tsx* globally
          ```shell
          npm i -g tsx
          ```
          > [!NOTE]
          > *tsx* here is a _utility program_ for running *typescript* program as if it were a JS file<br>
          > It is not the file extension *.tsx* which we use for React

          > [!TIP]
          > This is useful especially in those TypeScript projects where they don't use the latest version of Node.
       3. Run the *ts* file
          ```shell
          tsx typeMe.ts
          ```
       4. Watch the file
          ```shell
          tsx --watch typeMe.ts
          ```
          > [!TIP]
          > The flag `--watch` is useful for when you want to automatically rerun the file to check for whatever change you just did to the program

## Type Annotations Exercise
- Requirements
  - variables
  - function parameters
  - function return types
  Create new types with type aliases as needed.
- Example:
  ```ts
  type ManyNumbers = number[];

  const myNumbers: ManyNumbers = [1,2,3,4];

  function sum(numbers: ManyNumbers): number {
      if (numbers.length === 0) {
          return 0;
      } else {
          return numbers[0] + sum(numbers[1:]);
      }
  }
  sum(myNumbers);
  ```
    Explanation
    - Create a type alias of _array of number_<br>
    A convention is to use capitals
      ```ts
      type ManyNumbers = number[];
      ```
    - We can reuse the alias type as many times as we want like a variable for the type
      - Variable **myNumbers**
        ```ts
        const myNumbers: ManyNumbers = [1,2,3,4];
        ```
      - The params **numbers** of function **sum**
        ```ts
        function sum(numbers: ManyNumbers): number {
          ...
        }
        ```

- **typeMe.ts**
  1. Check what bugs we have

      Command
      ```ts
      tsx --watch typeMe.ts
      ```
  2. Fix bugs
       1. Problem 1
          > [!CAUTION]
          > _TypeError: Cannot read properties of undefined (reading 'length')_
          > ```ts
          > // typeMe.ts:34
          > const count = event.rsvps.length;
          > ```
          ```ts
          // Should return a string like '5 going' or '0 went'
          const getEventRsvpCount = (event) = {
            const count = event.rsvps.length;
            const { isPast } = getEventDate(event);
            const text = isPast ? 'went' : 'going';
            return [count, text].join(' ');
          }
          ```

          - Reason: The function **getEventRsvpCount** expects an *event* input<br>
          However, TypeScript doesn't know what shape the **event** object should be
          - Solution: Create a type **Event**
            ```ts
            type Event = {
              id: string | number,
              title: string,
              date: string,
              image_url?: string,
              description?: string,
              host_id: string | number,
              rsvps: object[]
            }
            ```

            > [!NOTE]
            > Types _string | number_ and _number | string_ are exactly the same, the order doesn't matter since they're both within the set

          The array of object __events__ will be then of typed *Event[]*
          ```ts
          const events: Event[] = [
            {},
            {}
          ]
          ```

          > [!IMPORTANT]
          > The _[]_ is there because __events__ is an _array of objects_ of type _Event_, __not__ because of the Event type itself.

          > [!TIP]
          > The difference between the *optional* `?` and `!` is that `?` is _less emphatic than `!`
          > Example: `event.rsvps!.length` is _more emphatic_ than `event.rsvps?.length`
          > On the other hand, the _optional operator_s `?` and `!`, can be altered with the _ternary operator_
          > Example: `event.rsvps ? event.rsvps.length : 0`

        Since (variable and property) **rsvps** can be either of
        - typed *undefined*
        - object[]

        And as being an *object[]*, **rsvps** has the property *user_id* which can either be a *number* or a *string*
      > We can make it a type alias
        ```ts
        type Rsvps = {
          user_id: number | string
        }
        ```
        Then use it in the Type Alias **Event**
        ```ts
        type Event = {
          ...
          rsvps?: Rsvps[]
        }
        ```
        **rsvps** is typed **Rsvps[]** because it is an array of object within the **events** array of object
        ```ts
        const events: Event[] = [
          {
            ...
            rsvps: [{ user_id: 1 }, { user_id: '5' }, { user_id: 3 }]
          },
          {}
        ]
        ```
    - Type alias **id**

      We can make the property **id** of the object typed **Event** to be a type alias

      From this
      ```ts
      type Event = {
        id: string | number,
        ...
      }
      ```
      To this
      ```ts
      type Id = tring | number;

      type Event = {
        id: Id,
        ...
      }
      ```
    - Fixing the function **getEventRsvpCount** (by typing the *event* param)
      ```ts
      // Should return a string like '5 going' or '0 went'
      const getEventRsvpCount = (event: Event) => {
          const count = event.rsvps.length;
          ...
      }
      ```
      > [!NOTE]
      > As you hover the mouse over the line `event.rsvps`
      > VS Code shall hint _'event.rsvps' is possibly 'undefined'._

      > [!WARNING] Terminal
      > ❌ undefined<br>
      > ❌ EventExpo 2032 on Thu Apr 01 2032:  going<br>
      > ❌ undefined<br>

      However, we don't want that to be an *undefined*, therefore we need to change that into a *fallback*
      - Using `||`(or) operator
        ```ts
        const count = event.rsvps.length || 0;
        ```
      - Using ternary (type guard concept)
        ```ts
        const count = event.rsvps ? event.rsvps.length : 0;
        ```
      Terminal:
      > [!WARNING] Terminal
      > ❌ undefined<br>
      > ✅ EventExpo 2032 on Thu Apr 01 2032: 0 going<br>
      > ❌ undefined<br>
  3. Try to be even more explicit about the input and output of each program
       1. Typing function **getEventRsvpCount**

          Change from
          ```ts
          const getEventRsvpCount = (event: Event)
          ```
          to
          ```ts
          const getEventRsvpCount = (event: Event): string
          ```
          Since the function _should return a string like '5 going' or '0 went'_
      1. Set explicit return
         1. **getEventDetails**
            > // Should return a string with the event's title, date, and rsvps<br>
            > // (if the event exists), or the string 'Event not found' (if not)

            We can type the function as
            ```ts
            const getEventDetails = (eventId): string => {
              ...
            }
            ```
            Yet, the Terminal is saying *undefined*, which is not the behavior we want
            > [!WARNING] Terminal
            > ❌ undefined<br>
            > ✅ EventExpo 2032 on Thu Apr 01 2032: 0 going<br>
            > ❌ undefined<br>

            In this case, the solution is
            ```js
            return 'Event not found'
            ```
            So even if the program actually returns nothing (*undefined*), it will still return the string _'Event not found'_
           2. **getEventById**
              ```js
              function getEventById (id)
              ```
