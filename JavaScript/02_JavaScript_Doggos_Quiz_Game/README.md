# JavaScript Doggos Quiz Game

## Goals
- Use while loops to repeat actions
- Differentiate asynchronous from syncronous code
- Use asynchronous functions to fetch data
- Use fancy modern JS syntax
- Learn real-world techniques for debugging & error handling
- Play with doggos!

## Content
### while loops

```js
let fiveRandomNumbers = []

while (fiveRandomNumbers.length < 5) {
  fiveRandomNumbers.push(Math.random())
}
```
> 5
> fiveRandomNumbers
> [0.3511059394776368, 0.17641052962422332, 0.7325612227185144, 0.2765593539580018, 0.6032929543477411]

> [!TIP]
> The `while()` loop could be thought of as a conditional loop

> [!CAUTION]
> `while()` loop will keep on running as long as the condition is still *true*
> while (true) {
>   console.log("I am wasting resources infinitely");
> }
> This loop will keep running forever until the computer crashes.

### TODO 1
1. Requirements
   - Given an array of _possible answers_, a *correctAnswer* value, and a number of *choices* (*n*) to get.
   - Say if we have
     - *n* = 3, we'll have 3 randomly selected *breeds* from the array *BREEDS*
     - *correctAnswer* is 1 since there's only one *correct* answer
     - *possibleChoices* the possible choices that we'll pass in from the array *BREEDS*
   - Return a list of that many *choices*, including the correct answer and others from the array
2. Function
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
      *Hint:* We're going to utilize the helper functions
      - `getRandomElement` to randomly select a value from the array *BREEDS*.
      - `shuffleArray` to mix up the orders of the `choices` (this function can be a good exercise for you to rewrite).
3. Functions breakdown
   1. We want to have a number of `n` choices for the returned list of `choices` so the condition of the `while()` loop is
      ```js
      while (choices.length < n) {
        ...
      }
      ```
   2. We want to make sure that the *correctAnswer* is going to be one of the *choices*, so we push it in **before** the `while()` loop.
   3. Within the `while()` loop, we use `getRandomElement()` with the `possibleChoices` as the argument so that we can randomly select elements from the array `BREEDS`.
   4. We don't want duplicated values from the function `getRandomElement`, so we need a condition in which we only push the element into the array if it doesn't exist yet.
      ```js
      if (!choices.includes(candidate)) {
          choices.push(candidate)
        }
      ```
      `candidate` is the variable that we assign the value of the function `getRandomElement(possibleChoices)` to.
   5. `shuffleArray` is at the end of the program, we want to `return` a shuffled array in which `correctAnswer` is not always the first button in the game
4. Demonstration
   1. Dependencies
    `getRandomElement`
    `shuffleArray`
   2. Main function
    `getMultipleChoices`
   3. Test
      ```js
      getMultipleChoices(3, "boolean", ["boolean", "string", "number", "undefined", "object"])
      ['boolean', 'number', 'object']
      ['boolean', 'object', 'undefined']
      ['number', 'boolean', 'undefined']
      ```
      ```js
      getMultipleChoices(4, "string", ["boolean", "string", "number", "undefined", "object"])
      ['string', 'undefined', 'number', 'object']
      ['string', 'object', 'boolean', 'number']
      ['object', 'boolean', 'number', 'string']
      ```
      ```js
      getMultipleChoices(2, "object", ["boolean", "string", "number", "undefined", "object"])
      ['object', 'number']
      ['string', 'object']
      ['object', 'undefined']
      ```

## Notes
- The current structure of this code base is arbitrary, you can feel free to restructure the code in your own favor, yet we can do that after walking through all the exercises together.
- `BREEDS` is in caps because we don't expect to change that value.
- We're going to write dynamically functions, therefore nothing should be hardcoded.
- For the function `getMultipleChoices`, we pass in `possibleChoices` instead of the array `BREEDS` because we want to make it a dynamic function that we can reuse it with any other arrays for any other program that requires a similar feature. If we're to *hardcode* the array `BREEDS`, we wouldn't have been able to reuse it for any other program.
- Also, the function `getMultipleChoices` is called within the utility function `loadQuizData` down the road with the 3 arguments `3, correctBreed, BREEDS` already
  ```js
  // Function to load the data needed to display the quiz
    async function loadQuizData() {
      document.getElementById("image-frame").textContent = "Fetching doggo...";

      const doggoImgUrl = await fetchMessage(RANDOM_IMG_ENDPOINT);
      const correctBreed = getBreedFromURL(doggoImgUrl);
      const breedChoices = getMultipleChoices(3, correctBreed, BREEDS);

      return [doggoImgUrl, correctBreed, breedChoices];
    }
  ```