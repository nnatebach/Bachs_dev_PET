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
- Notes:
  - *Parameters* should be named like *variables*, and *behave* like variables within the function body.
  - *NaN* is something you might find if things have gone wrong in your program.
  - Some functions don't even need any values (`Math.random()`)
  - Every function in JavaScript returns something. However, if you don't specify what value it should return then *undefine* is the default return value.
  - JavaScript stops running your code inside of the function body once it hits that *return* statement
		``` js
		function returnAndLogsquare (x) {
			return x*x;
			console.log(x*x)
		}
		```
		`unreachable code after return statement`
		``` js
		const attempt = returnAndLogsquare (3) // undefined
		returnAndLogsquare (3) // 9
		attempt // 9
		```
		This is valid JavaScript, it's not throwing an error
		=> The *return* statement exits the function
	- There are two ways of defining a function
  	- Function declaration
			``` js
			function multiply () {
				...
			}
			```
		- Function expression = function assignment + anonymous function
			``` js
			const yell = function () {
				...
			}
			```
	- For comparing between two strings (things) that return the values of `true` or `false`, we can either
  	- Use `if...else` then `return`
			``` js
			function longerThan (s1, s2) {
				if (s1.length > s2.length) {
					return true;
				} else {
					return false
				}
			}
			```
  	- Name the function as *longerThan* or *shorterThan* and then `return`
			``` js
			function isLongerThan2 (s1, s2) {
				return s1.length > s2.length
			}

			isLongerThan2 ("jumper", "high") // true
			```
	- Parentheses are
  	- Optional for one-parameter functions
			Instead of `(x) => x*x` go for `x => x*x`
		- Required for multiple parameters
			`(firstName, lastName) => firstName + " " + lastName`
	- If we need to do more than just return a value, we can use curly braces for a "normal" function body.
  In that case, we still need a `return`
		``` js
		const addAndLog = (x, y) => {
			let sum = x + y;
			console.log("The sum is ", sum);
			return sum;
		}
		```
	- Referencing the assigned variable instead of repeating yourself many times.
		Example: Write an application that does both *console.log* and *returning* a value
		``` js
		const whisper3 = text => {
			const lc = text.toLowerCase()
			console.log(lc)
			return lc
		}

		let result3 = whisper("OMG") // the function logs out "omg", return "undefined" as the value
		result3 // omg
		```
	- To disable a button, make it unclickable
		``` js
		setAttribute(qualifiedName, value)
		```
		To make it work again
		``` js
		removeAttribute(attrName)
		```
	- For the *TODO 4* specifically we are trying to pass in a DOM element (a button) rather than picking one from the DOM.
  Hence, the function is
		``` js
		function disable (button) {
			button.setAttribute("disabled", "")
		}
		```
	- Transforming a function declaration to an arrow function
		From this
		``` js
		function disable (button) {
			button.setAttribute("disabled", "")
		}
		```
		To this
		``` js
		const isDisabled = button => button.setAttribute("disabled", "")
		```
	- We often need to `return` a value when it comes to comparing two or more things together.
	Common patterns are
    - Boolean comparisons (the most common case)
			``` js
			return a === b;  // without `return`, the caller gets `undefined`
			```
		- Sort comparator functions
			``` js
			numbers.sort((a, b) => a - b); // ascending
			```
		- Ternaries / conditional logic that produce a value
			``` js
			function bigger(a, b) {
				return a > b ? a : b;
			}
			```
		- Equality checks used in conditionals
			``` js
			if (a === b) {
				console.log("equal");
			}
			```
	- We can convert almost anything in JavaScript with `toString()`
		We also need to add that function when comparing between the given *guess* and the *answer* from the *fact* object
		``` js
		function isCorrect(guess) {
			return guess === fact.answer.toString()
		}
		```
		We need to compare two values of the same type
		The reason is that the original value from *fact* is a *boolean* while the value of the user's guess is *string*
		``` js
		const fact = {
			"statement": "Arrays are like objects",
			"answer": true,
			"explanation": "Arrays are a kind of objects with special properties"
		};
		```
	- The value of a variable in the *global scope* can be accessed from within the *function scope*, but it doesn't work the other way around for global variables.
		``` js
		let globalVariable = "I live in global scope";

		function narrowerScope () {
			console.log(globalVariable);
			let localVariable = "I live in the function scope";
		}

		narrowerScope(); // I live in global scope
		console.log(localVariable); // Uncaught ReferenceError: localVariable is not defined
		```
	<!-- - var vs let
		- *function* scope
  		- var
				``` js
				var newVariable = "hello";

				function messWith () {
					newVariable = "goodbye";
				}

				newVariable; // hello
				messWith(); // undefined
				newVariable; // goodbye
				```
			- let
				``` js
				let newVariable = "hello";

				function messWith () {
					newVariable = "goodbye";
				}

				newVariable; // hello
				messWith(); // undefined
				newVariable; // goodbye
				```
		- *block* scope
  		- var
				``` js
				var newVariable = "original";

				function messWith () {
						{
							var newVariable = "messed";
						}
				}

				newVariable; // original
				messWith(); // undefined
				newVariable; // original
				``` -->
	- An `addEventListener()` takes 2 parameters
  	- The name of the event to listen to (e.g. "click")
  	- A *handler* function that JS calls when that event is fired on the element.
	- Event object
  	- Click event
      - using `function` keyword
				``` js
				document.addEventListener("click", function () {
					console.log("Click!")
				})
				```
			- using fat arrow function
				``` js
				document.addEventListener("click", () => {
					console.log("click!")
				})
				```
		- Pass in an parameter to get information from *click* event
			``` js
			document.addEventListener("click", (event) => {
				console.log(event)
			})
			```
			*clientX* and *clientY* shows the location of the pointer where the user clicked on the page.
			Check out more at [Mouse events](https://developer.mozilla.org/en-US/docs/Web/API/Element#mouse_events)
		- In order to see which DOM element was clicked
			``` js
			document.addEventListener("click", (event) => {
				console.log(event.target)
			})
			```
  - The *condition* is usually an expression that evaluates to a *boolean*
	```js
	if (forecast === "rain") {
		console.log("bring an umbrella");
	}
	```
- If it's given some other value, JS will convert it to a boolean
	and decide based on its "truthiness"
	- Example 1
		``` js
		if ("nonempty strings are truthy") {
			console.log("This line will run")
		}
		```
	- Example 2
		``` js
		if (0) {
			console.log("zero is truthy")
		} else {
			console.log("zero is falsy")
		}

		// zero is falsy
		```
	- Conditionals Exercise:
    	- Empty arrays
			```js
			if ([]) {
				console.log("Empty arrays are truthy")
			} else {
				console.log("Empty arrays are falsy")
			}
			```
			> Empty arrays are truthy
    	- Empty strings
  			```js
  			if ("") {
  				console.log("Empty strings are truthy")
  			} else {
  				console.log("Empty strings are falsy")
  			}
  			```
  			> Empty strings are falsy
		- *null* is *falsy*
			```js
			if (null) {
				console.log("null is truthy")
			} else {
				console.log("null is falsy")
			}
			```
		- *undefined* is *falsy*
			```js
			if (undefined) {
				console.log("undefined is truthy")
			} else {
				console.log("undefined is falsy")
			}
			```
		> [!TIP]
		> In JavaScript
		> Nothingness is usually falsy
		> Somethingness is usually truthy (objects and arrays)
		> Strings are immutable, an empty string is never going to have stuff in it, this can simply explain why an empty string is falsy
		> We can push stuff into an empty array, which is why an empty array is truthy
	- Logical & Ternary Operators
    	- Using `if...else`
  			```js
  			let mood;

  			if (forecast === "sunny") {
  				mood = "happy"
  			} else {
  				mood = "sad"
  			}
  			```
  		- Using *ternary*
  			```js
  			let mood = forecast === "sunny" ? "happy" : "sad";
  			```
	- Loops: Log out the array indices `const numbers = [1,2,3]`
    	- Traditional `for`. This iterates over the *indices* in the array for the value of each index
			```js
			const numbers = [1,2,3]

			for (let i = 0; i < numbers.length; i++) {
				console.log(numbers[i])
			}
			```
			```js
			1
			2
			3
			```
  	- `for...of` iterates over...
    	- The array *items* and then get them out
        	- Example 1
				```js
				const numbers = [1,2,3]

				for (let i of numbers) {
					console.log(i)
				}
				```
				```js
				1
				2
				3
				```
      		- Example 2
				```js
				for (let item of ["pop", 6, "squish"]) {
					console.log(typeof(item))
				}
				```
				```js
				string
				number
				string
				```
    	- The characters in a string
    		```js
    		for (let char of "ALOHA") {
    			console.log(char)
    		}
    		```
    		```js
    		A
    		L
    		O
    		H
    		A
    		```
	> [!TIP]
	> In JavaScript, strings and arrays are *iterable*

	> [!IMPORTANT]
	> The procedures of the traditional `for` loop are
	> 1. Check condition: i < numbers.length — if false, the loop stops entirely
	> 2. Run body: `console.log(numbers[i])`
	> 3. Update: i += 1
	> 4. Back to step 1
	> So, the function logs out the index before incrementing it by 1