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