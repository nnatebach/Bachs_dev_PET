1.

- Question: What is a utility function?
- Answer:

---

2.

- Question: For the `shuffleArray` function, why do we want to shuffle the array elements *in place* (mutating the array)? Why wouldn't we create a shallow copy of the array or creating a new array?
```js
function shuffleArray(array) {
  return array.sort((a, b) => Math.random() - 0.5);
}
```
- Answer:

---

3.
- Question: What's the reason for `getMultipleChoices` to have three params `n, correctAnswer, possibleChoices`?
Is it because of the requirements or is it because of the assignment `const breedChoices = getMultipleChoices(3, correctBreed, BREEDS);`
- Answer: ...

---

4.
- Question: For the `getMultipleChoices` function. Why do we declare `candidate` with `let` instead of `const`? (Is it because the value of `candidate` is going to change over time?)
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
- Answer: ...