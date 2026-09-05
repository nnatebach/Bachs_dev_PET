1.

- Question: What is a utility function?
- Answer:

2.

- Question: For the `shuffleArray` function, why do we want to shuffle the array elements *in place* (mutating the array)? Why wouldn't we create a shallow copy of the array or creating a new array?
```js
function shuffleArray(array) {
  return array.sort((a, b) => Math.random() - 0.5);
}
```
- Answer: