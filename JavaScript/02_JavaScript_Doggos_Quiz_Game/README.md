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
- Given an array of *possible answers*, a *correctAnswer* value, and a number of *choices* (*n*) to get.
- Say if we have
  - *n* = 3, we have 3 random *breeds*
  - *correctAnswer* is 1 since there's only one *correct* answer
  - *array* the possible choices that we'll pass in from the array *BREEDS*
- Return a list of that many *choices*, including the correct answer and others from the array
```js
function getMultipleChoices(n, correctAnswer, array) {
// Use a while loop and the getRandomElement() function
// Make sure there are no duplicates in the array
}
```
- We want to have a number of 3 *choices* so the condition of the `while()` loop is
  ```js
  while (choices.length < 3) {
    ...
  }
  ```
- We want to make sure that the *correctAnswer* is going to be one of the *choices*, so we push it in **before** the `while()` loop
- `shuffleArray` is at the end of the program, we want to `return` the `shuffleArray`
*Hint:*
- We're going to utilize the helper functions
  - `getRandomElement` to randomly select a value from the array *BREEDS*
  - `shuffleArray` to mix up the orders of the *choices* (this function can be a good exercise for you to rewrite)

## Notes
- The current structure of this code base is arbitrary, you can feel free to restructure the code in your own favor, yet we can do that after walking through all the exercises together.
- `BREEDS` is in caps because we don't expect to change that value