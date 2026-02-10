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
