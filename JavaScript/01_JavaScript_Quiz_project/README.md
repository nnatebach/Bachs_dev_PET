JavaScript Quiz Project
- Basic requirements
	- The program shows
		- Quiz statement
		- True and False buttons for the user to interact with
		- Explanation about why the statement is True / False

	- The logic
		- The *fact* object has 3 properties
			- statement: string
			- answer: boolean
			- explanation: string
		- The *truthy* and *falsy* of the user's guess is going to be based on the comparison between the value of *fact.answer* and the value of the button that the user chooses ("true" === "true" => true, etc)
		- How the buttons work
			- Once either button is clicked, both buttons will be *disabled*
			- If the *guess* is correct, the button turns *green*
			- If the *guess* is incorrect, the button turns *orange*

- **Bonus**: Create a button with the function to go for next question
	- The program shows
		- Multiple quiz statements
		- True and False buttons for the user to interact with
		- Explanation about why the statement is True / False
	- The logic
		- The *facts* is now an *array* of objects, each object has the 3 properties like before

			``` js
			const facts = [
				{
					statement: string
					answer: boolean
					explanation: string
				}
			]
			```

		- The *statement*s are displayed by shortening the array *facts* with the *shift()* method which removes the first element of the array and returns that removed element so we can access it
			``` js
			fact = facts.shift()
			document.getElementById("statement").textContent = fact.statement
			```
		- The *next question* button is disabled by default and will only be enabled after a *guess* is decided and evaluated
		- When the True / False button is clicked, same original logic applied for them
			- both buttons will be *disabled*
			- if the *guess* is correct, the button turns *green*
			- if the *guess* is incorrect, the button turns *orange*
			- the user can now click on the *next button* to navigate to the next *statement*
		- As soon as there is no more *statement*, the text of the *next question* button will change to "There are no more questions!"