This markdown file is meant for all questions encountered during the learning journey and the answers

## Original requirements

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

---
---

## Bonus

01

- Question: Why do I need to call `getNextFact()` at the end of the program?
- Answer: `getNextFact()` acts as the **initializer** for the quiz, without that the user would see a static HTML template.

---

02

- Question: Why the condition for the *next* question button to change to *There is no more question!* should be `facts.length > 0` and not `facts.length >= 0`?
- Reason: 
- Answer: 

---

03

- Question: How does the program display new questions?
- Answer: The `getNextFact()` function helps the program to show the new questions. It does that by shortening the array using `shift()`, the first array element is taken out and the *statement* property is assigned to the *statement* box in the page.

---

04

- Question: 