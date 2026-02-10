This markdown file is meant for all questions encountered during the learning journey and the answers


01
- Question: Why do we need to use `event` for the parameter of the `addEventListener` instead of the actual DOM element?
- Biggest reason - Event Delegation: Instead of attaching a separate event listener to every child element, you attach a single listener to their common ancestor (e.g., the parent `<ul>`). When a child is clicked, the event bubbles up to the parent. Inside the parent's handler, `event.target` tells you which specific child was clicked, allowing you to manage all interactions with one function, improving memory usage and performance

---

02
- Question: What is the real difference between disabling the buttons BEFORE versus AFTER evaluating the `guess`?
- Code
  - disabling the buttons
    ``` js
    for (let button of optionButtons) {
      disable(button)
    }
    ```
  - evaluating the `guess`
    ``` js
    if (isCorrect(guessedValue)) {
      event.target.classList.add("correct")
    } else {
      event.target.classList.add("incorrect");
    }
    ```
- Answer: There is **no functional difference**. It is generally better for **logic flow** and **visual feedback**