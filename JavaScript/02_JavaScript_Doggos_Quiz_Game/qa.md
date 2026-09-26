01.

- Question: What is a utility function?
- Answer:

---

02.

- Question: For the `shuffleArray` function, why do we want to shuffle the array elements *in place* (mutating the array)? Why wouldn't we create a shallow copy of the array or creating a new array?
```js
function shuffleArray(array) {
  return array.sort((a, b) => Math.random() - 0.5);
}
```
- Answer: Mostly it comes down to simplicity and how the function is used, not a hard technical requirement:
  - `shuffleArray` uses `array.sort(...)`, and `.sort()` itself mutates the array in place and returns a reference to that same array. So "shuffling in place" here is really just a side effect of using `.sort()` as the shuffling mechanism — it wasn't a deliberate design goal so much as a natural consequence of the simplest implementation.
  - Because `.sort()` returns the array too, `shuffleArray(array)` conveniently works either way: you can use it as `shuffleArray(choices)` and ignore the mutation, or use the return value `return shuffleArray(choices)` like in `getMultipleChoices`. That dual usage is why it "feels" intentional.
  - Making a shallow copy first (`const copy = [...array]`) would be more defensive/predictable — it avoids surprising a caller who didn't expect their original array to change. That's generally considered better practice in real-world code, especially if `choices` were used elsewhere after calling `shuffleArray`.

> [!NOTES]
> So: it's not that mutating in place is necessary for correctness — a copy would work fine too. It's a simplicity/performance tradeoff (no extra array allocation) at the cost of a mutating side effect, which is fine here because `choices` is a local array that isn't reused afterward.

---

03.

- Question: What's the reason for `getMultipleChoices` to have three params `n, correctAnswer, possibleChoices`?
Is it because of the requirements or is it because of the assignment `const breedChoices = getMultipleChoices(3, correctBreed, BREEDS);`?
- Answer: Both — but really it's the requirements that drive it, and the sample call just reflects those requirements:
  - `n` — needed because the requirement says "a number of choices to get" (how many total options to return).
  - `correctAnswer` — needed because the requirement says the result must include the correct answer specifically.
  - `possibleChoices` — needed because the requirement says the extra choices should come from a given array of possible answers.

---

04.

- Question: For the `getMultipleChoices` function. Why do we declare `candidate` with `let` instead of `const`?
  ```js
  function getMultipleChoices(n, correctAnswer, possibleChoices) {
    const choices = []
    choices.push(correctAnswer)
    // Use a while loop and the getRandomElement() function
    while (choices.length < n) {
      // Add other stuff
      let candidate = getRandomElement(possibleChoices)
      // Make sure there are no duplicates in the array
      if (!choices.includes(candidate)) {
        choices.push(candidate)
      }
    }
    return shuffleArray(choices)
  }
  ```
- Answer: `candidate` is reassigned on every loop iteration (`let candidate = getRandomElement(possibleChoices)` runs fresh each pass through the while loop). Since its value changes each time the loop runs, it **must** be declared with let. If you used `const`, you'd get an error the second time the loop tried to reassign it

---

05.

- Question: In the function `getMultipleChoices`, we created an empty array `choices` at the beginning of the function. What is the reason for that?
  ```js
  function getMultipleChoices(n, correctAnswer, possibleChoices) {
    const choices = []
    choices.push(correctAnswer)
    // Use a while loop and the getRandomElement() function
    while (choices.length < n) {
      // Add other stuff
      let candidate = getRandomElement(possibleChoices)
      // Make sure there are no duplicates in the array
      if (!choices.includes(candidate)) {
        choices.push(candidate)
      }
    }
    return shuffleArray(choices)
  }
  ```
- Answer: That's because the TODO's requirement is to __return a list__ (an array) of choices. Since the function needs to build up and eventually return an array, you need some array to accumulate values into as you go (pushing the correct answer first, then random candidates).

---

06.
- Question: Other than `fetch` that returns a Promise, how to tell if an operation / function returns a Promise? What are the signs to look for?
- Answer: In JavaScript, there are several strong clues that a function/operation is Promise-based, but there isn't a universal rule you can determine just by looking at the function name.
  1. Look at the return value<br>
  The most reliable runtime test is:
      ```js
        const result = someFunction();

        result instanceof Promise
      ```
      or, more generally
      ```js
      result?.then
      ```
      Example:
      ```js
      const result = fetch("/api/data");

      console.log(result instanceof Promise); // true
      ```
      You can also use
      ```js
      Promise.resolve(result) === result
      ```
  2. Look for `async`<br>
  If a function is declared with async, it always returns a Promise, even if you return an ordinary value:
      ```js
      async function foo() {
        return 42;
      }

      const result = foo();

      console.log(result); // Promise
      ```
      Conceptually:
      ```js
      async function foo() {
        return 42;
      }
      ```
      behaves roughly like:
      ```js
      function foo() {
        return Promise.resolve(42);
      }
      ```
      So `async` is one of the clearest signs.
  3. Look for `return new Promise(...)`<br>
    Obviously:
      ```js
      function foo() {
        return new Promise((resolve, reject) => {
          // ...
        });
      }
      ```
      returns a Promise.

      You may also encounter:
      ```js
      function foo() {
        return Promise.resolve(something);
      }
      ```
      or:
      ```js
      function foo() {
        return Promise.reject(error);
      }
      ```
      These are also obvious signs.

  4. Look at how the function is used
      This is often the easiest clue when reading someone else's code.<br>
      If you see:
      ```js
      const data = await getData();
      ```
      then `getData()` is expected to return something awaitable—normally a Promise.

      Likewise:
      ```js
      getData()
        .then(data => {
          ...
        })
        .catch(error => {
          ...
        });
      ```
      strongly indicates a Promise.

      For example:
      ```js
      const response = fetch(url);

      response.then(...)
      ```
      `fetch()` is Promise-based because its returned object has `.then()`.
  5. APIs often explicitly document it<br>
    For built-in/browser APIs, check the return type in the documentation.<br>
    For example:
      ```js
      fetch(url)
      ```
      > `Promise<Response>`

      Whereas:
      ```js
      document.getElementById("foo")
      ```
      > `Element | null`

      So it isn't Promise-based.<br>
      Modern JavaScript documentation often shows something like:
      ```js
      Returns: Promise<...>
      ```
      or, in TypeScript:
      ```js
      function getUser(): Promise<User>
      ```
      That's the most authoritative way to know.

---

07.
- Question: What if you use regex for the TODO 2?
  Given a URL such as "https://images.dog.ceo/breeds/poodle-standard/n02113799_2280.jpg"
  ```js
  function getBreedFromURL(url) {
    // The string method .split(char) may come in handy
    // Try to use destructuring as much as you can
  }
  ```
- Answer: ...

---

08.
- Question: Try to `.split()` at different parts of the `url` in TODO 2
  Given a URL such as "https://images.dog.ceo/breeds/poodle-standard/n02113799_2280.jpg"
  ```js
  function getBreedFromURL(url) {
    // The string method .split(char) may come in handy
    // Try to use destructuring as much as you can
  }
  ```
- Answer: ...

---

09
- Question: How about removing unnecessary character (space) based on condition instead of `trim`
  Given a URL such as "https://images.dog.ceo/breeds/poodle-standard/n02113799_2280.jpg"
  ```js
  function getBreedFromURL(url) {
    // The string method .split(char) may come in handy
    // Try to use destructuring as much as you can
  }
  ```
- Answer: ...

---

10.
- Question: Difference between `split` and `...` (*spread*) operator?
- Answer: ...

---

11.
- Question: `await` requires an `async` function to work
  ```js
  async function fetchMessage (url) {
    let response = await fetch(url);
    return response;
  }
  ```
  while `.then` can work in a regular function. Correct?
- Answer: That's correct!
  - `await` strictly requires an async wrapper: The `await` keyword pauses the execution of code. JavaScript will throw a SyntaxError if you use it inside a standard, regular function.
  - `.then()` works anywhere: Because `.then()` is just a standard method called on a Promise object, it can be executed inside regular functions, object constructors, or global scripts without any special keywords.

---

12.
- Question: Why don't we use `map` but rather `for...of` loop for the _TODO 4_?
  ```
  // For each of the choices in choicesArray,
  // Create a button element whose name, value, and textContent properties are the value of that choice,
  // attach a "click" event listener with the buttonHandler function,
  // and append the button as a child of the options element
  ```
- Answer: ...

---

13.
- Question: For the `renderButtons`, why don't we create the buttons first with all the properties assigned to them then append them to the options container, and finally attach the button handler to the button?
- Answer: The ordering in this case actually doesn't matter<br>
  __The key insight: nothing can be clicked until the function finishes running.__

  JavaScript is single-threaded and synchronous. The `for...of` loop runs start to finish, uninterrupted, before the browser ever gets a chance to process a user's click. So by the time a person could possibly click any button, all buttons already exist, are already in the DOM, and already have their listeners attached — regardless of the order you did those three things in for each individual button.

  That also answers a natural worry: "what if `buttonHandler`'s `querySelector` runs before the correct-answer button has been appended?" It can't — `buttonHandler` only runs on click, which happens well after the entire `renderButtons` call (and the whole loop) has completed.

  __Splitting into three separate passes would work, but costs more__

  You could restructure it as:
  ```js
  const buttons = [];
  for (let choice of choicesArray) {
    const button = document.createElement("button");
    button.textContent = button.value = button.name = choice;
    buttons.push(button);
  }
  for (let button of buttons) {
    options.appendChild(button);
  }
  for (let button of buttons) {
    button.addEventListener("click", buttonHandler);
  }
  ```
  This works identically at runtime. But it:
  - iterates the array three times instead of once,
  - requires an intermediate `buttons` array just to keep references around between passes,
  - is more code for zero behavioral benefit.

  __When would separating phases actually matter?__

  If you needed all elements to exist in the DOM before running some setup logic — for instance, code that measures layout/positions (`getBoundingClientRect`), or that needs to query siblings mid-construction — you'd want a "create & append everything first" pass before that logic runs. But since event listeners are just attached to the JS object (not dependent on DOM position or sibling elements), and don't execute until later anyway, there's no such dependency here.

  So the single combined loop in the original code isn't a shortcut that sacrifices correctness — it's actually the more idiomatic, efficient version of the same result.

---

14.
- Question: When was `choicesArray` initialized an array?
  ```js
  // TODO 4
  // For each of the choices in choicesArray,
  // Create a button element whose name, value, and textContent properties are the value of that choice,
  // attach a "click" event listener with the buttonHandler function,
  // and append the button as a child of the options element
  for (let choice of choicesArray) {
    const button = document.createElement("button");
    button.textContent = choice;
    button.value = choice;
    button.name = choice;
    button.addEventListener("click", buttonHandler);
    options.appendChild(button);
  }
  ```
- Answer: It was never initialized an array _by that name_. It's the same array object created once, with `const choices = []`, inside `getMultipleChoices`
  ```js
  // TODO 1
  // Given an array of possible answers, a correct answer value, and a number of choices to get,
  // return a list of that many choices, including the correct answer and others from the array
  function getMultipleChoices(n, correctAnswer, possibleChoices) {
    const choices = []
    choices.push(correctAnswer)
    // Use a while loop and the getRandomElement() function
    while (choices.length < n) {
      // Add other stuff
      let candidate = getRandomElement(possibleChoices)
      // Make sure there are no duplicates in the array
      if (!choices.includes(candidate)) {
        choices.push(candidate)
      }
    }
    return shuffleArray(choices)
  }
  ```
  Every step after that — `breedChoices`, the destructured `choices`, and finally `choicesArray` — is just a different variable name pointing at that one original array as it gets passed along the chain.
  > [!NOTE]
  > This is a useful thing to notice in JS generally: arrays (and objects) are passed by reference, so renaming a parameter in a function signature never re-creates the data — it just gives a new local label to the same thing in memory.