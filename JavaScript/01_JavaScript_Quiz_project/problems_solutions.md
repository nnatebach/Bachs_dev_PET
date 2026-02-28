This markdown file is meant for all problems encountered during the learning journey and all the solutions

01

- Error:
	```
	error: src refspec main does not match any
	error: failed to push some refs to 'https://github.com/nnatebach/Bachs_dev_PET.git'
	```

- Reason: You need to commit a file before pushing

- Solution: git push

---

02

- Error
	```
	statement = "Arrays are like objects"
	```

- Reason: Uncaught SyntaxError: Invalid shorthand property initializer

- Solution: statement: "Arrays are like objects"

---

03

- Error

	``` js
	const fact = {
		statement: "Arrays are like objects";
		answer: true;
	}
	```

- Reason: Uncaught SyntaxError: Unexpected token ';'

- Solution:

	``` js
	const fact = {
		statement: "Arrays are like objects",
		answer: true,
	}
	```

---  

04

- Error:
	``` js
	const statement = document.getElementById("statement")
	statement = fact.statement;
	```

- Reason: Uncaught TypeError: Assignment to constant variable.

- Solution: `statement` in here is the "id" of a `<div>`, if you want to put text in that `<div>` you will need to use `.textContent`. So the way to use that is `statement.textContent`

---

05

- Problem: Browser fails to read HTML DOM

- Reason: `<script>` tag in HTML `head`

- Solution: Move `<script>` tag down just above the closing body tag `</body>`

---

06

- Problem:
	`Uncaught TypeError: Cannot read properties of undefined (reading '......')`

- Reason: JavaScript cannot find the DOM element

- Solution: If this happens when you are trying to loop through an array of elements using the tradition "for" loop, make sure the condition of the loop is correct

---

07

- Problem: When I run this code in the dev console or in the source code
	```
	console.log(explanation.textContent = fact.explanation)
	```

	The explanation "Arrays are a kind of object with special properties?" for "explanation.textContent" is shown NOT only in the dev console but ALSO in the DOM element as well. Why?

- Reason: textContent displays text in the dev console and DOM because it is a native Web API property that retrieves the raw text content of a node and its descendants, including hidden elements and script/style tags. It acts as a direct interface to the node's text data structure.  

---

  

08

- Problem: traditional for "loop" shows `Uncaught TypeError: Cannot read properties of undefined (reading 'addEventListener')` but "for...of" loop does not show error

- Reason: This error occurs because of a mismatch between the loop counter and the actual length of the NodeList (or array) of elements, causing the loop to try accessing an index that does not exist (undefined). The for...of loop is more resilient because it only iterates over the actual items present, not an arbitrary index.

- Traditional "for" loop

	``` js
	for (let i = 0; i <= elements.length; i++) { // ERROR: <=
		elements[i].addEventListener('click', () => {});
	}
	```

	- document.querySelectorAll returns a NodeList.
	
	- If there are 3 elements, elements.length is 3, but the valid indices are 0, 1, and 2.
	
	- The i <= elements.length condition means the loop runs when i is 3.
	
	- elements[3] is undefined.
	
	- Trying to call .addEventListener on undefined causes the error.

- for...of

	``` js
	for (const element of elements) {
		element.addEventListener('click', () => {});
	}
	```

	- The for...of loop only iterates over existing values in the iterable.
	
	- It does not use an index, so it never tries to access elements[3].
	
	- It directly assigns each element to the element variable, ensuring it always exists.

- Solutions:

	- for "for" loop: Use < instead of <= in the condition.
	
	- Use "for...of" loop instead

  

---

09

- Problem: Why the program always add class "incorrect" to both buttons no matter the values of them?

- Reason: It is because their values are considered as incorrect according to the "Iscorrect" function

	``` js
	function isCorrect(guess) {
		if (guess === fact.answer) return true
	}
	```

- Solution: Make sure the data types are the same between the values of the button and the value of the property in the object that you are comparing it to

	In this case, since the value of the buttons are strings "true" and "false"
	`<button name="true" value="true">true</button>`
	the value of the property in the object should also be strings

---

10

- Problem: `Uncaught TypeError: Cannot read properties of null (reading 'setAttribute')`

  ``` js
  function disable (button) {
    button.setAttribute("disabled", "")
  }
  ```

- Reason: This is usually because you are using the function on a DOM element that simply does not exist.
In this case it is the *next* DOM element. It is declared and assigned to a variable yet the DOM element does not exist
	``` js
	const next = document.getElementById("next")
	```

	``` js
	disable(next)
	```

- Solution: Check to see if that DOM element exist

---

11

- Problem: *fact.answer* works well for the *answer* of the first question. From the second question and so on the evaluation is incorrect
  - *facts* array of objects

		``` js
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
		```

	- *isCorrect* function determines whether a *guess* is correct/incorrect

		``` js
		function isCorrect(guess) {
			// isCorrect(guess) should return true if the guess matches the fact's answer
			for (let fact of facts) {
				return guess === fact.answer
			}
		}
		```

	- The code that determines what to do if the user's *guess* is correct/incorrect

		``` js
		if (isCorrect(guessedValue)) {
      // and add the "correct"/"incorrect" class as appropriate
      // TODO if correct answer
      event.target.classList.add("correct");
    } else {
      // TODO if incorrect answer
      event.target.classList.add("incorrect");
    }
		```

- Reason:
  - Using the loop inside the *isCorrect* function is the wrong approach! Since you use the loop and then the early *return*, the loop only ever checks for the first item in the array and immediately stops after that.
  - Furthermore:
    - The Array is shrinking: You use `facts.shift()` in `getNextFact()`, which removes the current question from the array.
    - The Comparison is mismatched: When you are on Question 1, isCorrect looks at Question 2 (the new first item in the array). When you are on Question 2, it looks at Question 3. It is always checking your guess against the next answer, not the current one.
- Solution: Do not use a loop for *isCorrect*!

===

**Bonus**

12

- Problem: If I don't call the function `getNextFact()` at the end of the program, the last element of **facts** array is going to show up with the `statement`
``` js
"To work efficiently with React.js it is very important for you to learn Functions and arrow functions in JavaScript"
```
Is it the default behaviour of the array?
- Reason:
  - This is actually a logic error. Array is for *ordered* elements, so the first element to show up is supposed to be
	``` js
	"Arrays are like objects"
	```
	- The actual reason in here is the *TODO 3*
  ``` js
	for (let fact of facts) {
		statement.textContent = fact.statement;
	}
	```
	It overwrites the result of the `statement`. Because this happens in a fraction of a millisecond when the page loads, your eyes never see the first three statements.
- Solution: Remove the *TODO 3* code
- Furthermore: If you want to see the loop flicker through each array element, you can simulate a slower environment or use a "debugger" to pause time.
	``` js
	// TODO 3: Set the text of the statement element to the fact's statement
	for (let fact of facts) {
		debugger; // The browser will freeze here every time the loop runs
		statement.textContent = fact.statement;
	}
	```