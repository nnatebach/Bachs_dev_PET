// TODO 1: Declare & assign variables pointing to the corresponding element(s)

// statement should be the "statement" div
const statement = document.getElementById("statement");
// optionButtons should be all the elements within the "options" div
const optionButtons = document.getElementById("options").children;
// explanation should be the "explanation" div
const explanation = document.getElementById("explanation");

// TODO 2: Declare & assign a variable called fact
// Its value should be an object with a statement, true/false answer, and explanation
const fact = {
  statement: "Arrays are like objects",
  answer: "true",
  explanation: "Arrays are a kind of object with special properties"
}

// TODO 3: Set the text of the statement element to the fact's statement
statement.textContent = fact.statement;

// TODO 4: Declare disable & enable functions to set or remove the "disabled" attribute from a given button element
// disable(button) should set the button element's attribute "disabled" to the value ""
function disable (button) {
  button.setAttribute("disabled", "")
}
// enable(button) should remove the attribute "disabled" from the button element
function enable(button) {
  button.removeAttribute("disabled")
}

// TODO 5: Declare an isCorrect function that compares a guess to the right answer
function isCorrect(guess) {
  // isCorrect(guess) should return true if the guess matches the fact's answer
  return guess === fact.answer
}


// TODO 6A: Use a for loop to add a click event listener to each of the optionButtons
for (let option of optionButtons) {
  option.addEventListener("click", event => {

    // TODO 6B: Within the event handler function, display the fact's explanation by setting the text of the explanation element
    explanation.textContent = fact.explanation;

    // TODO 7: Within the event handler function,
    // Use a for loop to disable all the option buttons
    for (let button of optionButtons) {
      disable(button);
    }
    // TODO 8: Within the event handler function,
    // Get the guessed value from the clicked button
    const guessedValue = event.target.value;

    // Use a conditional to compare the guess to the fact's answer
    if (isCorrect(guessedValue)) {
      // and add the "correct"/"incorrect" class as appropriate
      // TODO if correct answer
      event.target.classList.add("correct")
    } else {
      // TODO if incorrect answer
      event.target.classList.add("incorrect");
    }
  })
}
