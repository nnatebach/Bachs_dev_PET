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
