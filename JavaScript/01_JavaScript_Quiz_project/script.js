// TODO 1: Declare & assign variables pointing to the corresponding element(s)

// statement should be the "statement" div
const statement = document.getElementById("statement");
// optionButtons should be all the elements within the "options" div
const optionButtons = document.getElementById("options").children;
// explanation should be the "explanation" div
const explanation = document.getElementById("explanation");
// next should be the "next" div
const next = document.getElementById("next")

// TODO 2: Declare & assign a variable called fact
// Its value should be an object with a statement, true/false answer, and explanation
const facts = [
  {
    statement: "Arrays are like objects",
    answer: "true",
    explanation: "Arrays are a kind of object with special properties",
  },
  {
    statement:
      "To understand the structure of React components, objects should be known",
    answer: "true",
    explanation:
      "Having a good understanding of objects is very crucial because React components are nothing but JavaScript objects",
  },
  {
    statement: "`null` and `undefined` are the same",
    answer: "false",
    explanation: "They are different and hold different meanings. The typeof undefined is `undefined`, but the typeof null is `object`",
  },
  {
    statement:
      "To work efficiently with React.js it is very important for you to learn Functions and arrow functions in JavaScript",
    answer: "true",
    explanation:
      "React Hooks are only implemented by functions and they can only be in functional components.",
  },
];

// TODO 3: Set the text of the statement element to the fact's statement
for (let fact of facts) {
  statement.textContent = fact.statement;
}

// TODO 4: Declare disable & enable functions to set or remove the "disabled" attribute from a given button element
// disable(button) should set the button element's attribute "disabled" to the value ""
function disable (button) {
  button.setAttribute("disabled", "")
}
// enable(button) should remove the attribute "disabled" from the button element
function enable(button) {
  button.removeAttribute("disabled")
}

// TODO 4.1: Bonus - Declare hide & show functions to set or remove the "hidden" attribute from a given button element
// hide(button) should add the style "hidden" to the button
function hide(button) {
  button.classList.add("hidden")
}
// show(button) should remove the style "hidden" from the button
function show(button) {
  button.classList.remove("hidden")
}

let fact;
let correct = 0;
let complete = 0;

function getNextFact() {
  fact = facts.shift() // get the first fact in our array (shortening the array)

  // Set the question's text to the current fact's statement
  statement.textContent = fact.statement

  // Hide any previous explanation
  hide(explanation)
  
  for (let option of optionButtons) {
    // Remove all the styles for the buttons
    option.classList.remove("correct")
    option.classList.remove("incorrect")
    // Enable the buttons
    enable (option)
  }
  // Disable *Next Question* button
  disable (next)
}

next.addEventListener("click", getNextFact)

// TODO 6A: Use a for loop to add a click event listener to each of the optionButtons
for (let option of optionButtons) {
  option.addEventListener("click", (event) => {
    // TODO 7: Within the event handler function,
    // Use a for loop to disable all the option buttons
    for (let button of optionButtons) {
      disable(button);
    }

    // As long as there are still questions, enable the *next* question button
    if (facts.length > 0) {
      enable(next)
    } else {
      next.textContent = "There is no more questions!"
    }

    // TODO 8: Within the event handler function,
    // Get the guessed value from the clicked button
    const guessedValue = event.target.value;

    // Use a conditional to compare the guess to the fact's answer
    if (fact.answer === guessedValue) {
      // and add the "correct"/"incorrect" class as appropriate
      // TODO if correct answer
      event.target.classList.add("correct");
      // Update score
      correct+=1
    } else {
      // TODO if incorrect answer
      event.target.classList.add("incorrect");
    }
    // TODO 6B: Within the event handler function, display the fact's explanation by setting the text of the explanation element
    explanation.textContent = fact.explanation;
    show(explanation);

    // Update the score
    complete+=1
    document.getElementById("correct").textContent = correct;
    document.getElementById("complete").textContent = complete
  });
}
getNextFact();
