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

03

- Question: Why do we use `querySelector` instead of `getElementById` for `options` even though it's an `id` name?
- Answer: The `<div id="options">` includes of two buttons which means it is a plural element. Therefore, we use `querySelector` to represent the plural form of the `options` element.

---

04

- Question: Do we need to enclose Object properties in quotes / double quotes?
- Answer: Object properties are seen as Strings in JavaScript so it is a good practice to enclose them in quotes / double quotes
- Example:
  ``` js
  const fact = {
    statement: "Arrays are like objects",
    answer: true,
    explanation: "Arrays are a kind of objects with special properties"
  };
  ```
  You can access the value of property `statement` by 2 ways
  - `fact.statement` => "Arrays are like objects"
  - `fact["statement"]` => "Arrays are like objects"

---

05

- Question: What is a *parameter* / *argument* of a function
- Answer: A function may need one or more than one *parameter(s)* to work. Then the actual value(s) passed to the parameter(s) are called the *argument(s)*
- Example:
  ``` js
  function add (x, y) {
    return x + y;
  }

  add(2, 3)
  ```
  - The function `add` needs the *parameters* x and y to work
  - 2 and 3 are the actual values that are passed into the function `add` as the *arguments*

---

06

- Question: What happens if we don't call a function with the intended arguments?
- Example: The function `add3` would expect to have 3 parameters and to be called with 3 arguments. What happens if we call `add3` with only 2 arguments, say `add3(1,2)`?
- Answer: It will return `undefined` as the third value

---

07

- Question: How to know whether a function returns something or it logs out something?
- Answer: When a function logs out something with `console.log()`, it also goes with *undefined*

---

08

- Question: `setAttribute("disabled", "false")` will not make the button work, to be clickable, again. Why?
- Answer: JS only cares about whether the *disabled* attribute exists on the button, it does not care the *value* of that *attribute*

---

09

- Question: How do we force a local variable to exist outside in the global scope? (It's possible with *let*, yet dangerous)
- Answer: We can reassign a variable to a new value with *let*
  ``` js
  let feeling = "free"

  function trap () {
    feeling = "boxedIn"
  }

  trap(); // undefined
  console.log(feeling); // boxedIn
  ```
  That's why we're able to run this function
  ``` js
  function isCorrect(guess) {
    return guess === fact.answer.toString()
  }
  ```
  *fact* is an object in the global scope

---

10
- Question: What is the role of *event* in event listener?
  ```js
  document.addEventListener("click", (event) => {
    console.log(event)
  })
  ```
- Answer: ......

---

11
- Question: Is there a way that we can directly accessing the DOM element or we would always have to go for the index 0 `document.getElementsByTagName("h1")[0]`
- Answer: No

---

12
- Question: Why `console.log(x, " is greater than ", b)` works but `console.log(x " is greater than " b)` does not?
- Answer

===

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