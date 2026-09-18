# JavaScript Doggos Quiz Game

## Goals
- Use while loops to repeat actions
- Differentiate asynchronous from syncronous code
- Use asynchronous functions to fetch data
- Use fancy modern JS syntax
- Learn real-world techniques for debugging & error handling
- Play with doggos!

## Content

### while loops

```js
let fiveRandomNumbers = []

while (fiveRandomNumbers.length < 5) {
  fiveRandomNumbers.push(Math.random())
}
```
> 5
> fiveRandomNumbers
> [0.3511059394776368, 0.17641052962422332, 0.7325612227185144, 0.2765593539580018, 0.6032929543477411]

> [!TIP]
> The `while()` loop could be thought of as a conditional loop

> [!CAUTION]
> `while()` loop will keep on running as long as the condition is still *true*
> while (true) {
>   console.log("I am wasting resources infinitely");
> }
> This loop will keep running forever until the computer crashes.

### TODO 1
1. Requirements
   - Given an array of _possible answers_, a *correctAnswer* value, and a number of *choices* (*n*) to get.
   - Say if we have
     - *n* = 3, we'll have 3 randomly selected *breeds* from the array *BREEDS*
     - *correctAnswer* is 1 since there's only one *correct* answer
     - *possibleChoices* the possible choices that we'll pass in from the array *BREEDS*
   - Return a list of that many *choices*, including the correct answer and others from the array
2. Function
    ```js
    function getMultipleChoices(n, correctAnswer, possibleChoices) {
      const choices = []
      choices.push(correctAnswer)
      // Use a while loop and the getRandomElement() function
      while (choices.length < n) {
        // Add other stuff
        let candidate = getRandomElement(possibleChoices)
        // Make sure there are no duplicates in the array
        if (!choices.includes(candidate)) {
          choices.push(candidate)
        }
      }
      return shuffleArray(choices)
    }
    ```
      *Hint:* We're going to utilize the helper functions
      - `getRandomElement` to randomly select a value from the array *BREEDS*.
      - `shuffleArray` to mix up the orders of the `choices` (this function can be a good exercise for you to rewrite).
3. Functions breakdown
   1. We want to have a number of `n` choices for the returned list of `choices` so the condition of the `while()` loop is
      ```js
      while (choices.length < n) {
        ...
      }
      ```
   2. We want to make sure that the *correctAnswer* is going to be one of the *choices*, so we push it in **before** the `while()` loop.
   3. Within the `while()` loop, we use `getRandomElement()` with the `possibleChoices` as the argument so that we can randomly select elements from the array `BREEDS`.
   4. We don't want duplicated values from the function `getRandomElement`, so we need a condition in which we only push the element into the array if it doesn't exist yet.
      ```js
      if (!choices.includes(candidate)) {
          choices.push(candidate)
        }
      ```
      `candidate` is the variable that we assign the value of the function `getRandomElement(possibleChoices)` to.
   5. `shuffleArray` is at the end of the program, we want to `return` a shuffled array in which `correctAnswer` is not always the first button in the game
4. Demonstration
   1. Dependencies
    `getRandomElement`
    `shuffleArray`
   2. Main function
    `getMultipleChoices`
   3. Test
      ```js
      getMultipleChoices(3, "boolean", ["boolean", "string", "number", "undefined", "object"])
      ['boolean', 'number', 'object']
      ['boolean', 'object', 'undefined']
      ['number', 'boolean', 'undefined']
      ```
      ```js
      getMultipleChoices(4, "string", ["boolean", "string", "number", "undefined", "object"])
      ['string', 'undefined', 'number', 'object']
      ['string', 'object', 'boolean', 'number']
      ['object', 'boolean', 'number', 'string']
      ```
      ```js
      getMultipleChoices(2, "object", ["boolean", "string", "number", "undefined", "object"])
      ['object', 'number']
      ['string', 'object']
      ['object', 'undefined']
      ```

### setTimeout - Asynchronous JavaScript
- Reference: [Introducing asynchronous JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Introducing)
- JS can only do one task at a time ("single-threaded")
- We use Asynchronous JavaScript for tasks that take time
  - Waiting for user events
  - Asking a user to pick a file
  - Getting permission to access the camera/mic
  - Loading data from the interwebs
- Example:
  ```js
  console.log("This will print first");
  setTimeout(() => console.log("This will print third"), 1000);
  console.log("This will print second");
  ```
  ```js
  This will print first
  This will print second
  undefined
  This will print third
  ```
  > [!NOTE]
  > After the third `console.log` ran, the browser returned `undefined` as there's no returned value, the second `console.log` printed out `This will print third` after the `1000` milliseconds.
- Optional homework to research:
  - Video: [What the heck is the event loop anyway? | Philip Roberts | JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
  - Transcript: https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html
- LinkedIn post: https://www.linkedin.com/posts/arnaudbregere_what-the-heck-is-the-event-loop-anyway-activity-7421837919641882624-KJjY/

### APIs & fetch
- APIs
  - URLs point to certain resources on the web that are not only images and webpages but also data and information.
  - APIs provide URLs that point at data we care about
    `https://dog.ceo/api/breed/hound/list`
    ```js
    {
      "message": [
        "afghan",
        "basset",
        "blood",
        "english",
        "ibizan",
        "plott",
        "walker"
      ],
      "status": "success"
    }
    ```
    __dog ceo__ gives a list of all the types of __hound breeds__
  - `dog.ceo/api/breed/hound/list` is often called an endpoint of an API, which is a URL within the API, that gives a particular resource.
  - Real-world analogy: if the Dog API is a giant restaurant, the URL you provided is a specific line item on the menu ("List of Hound Breeds"). Looking at that line item connects you to the kitchen (the server), which then brings you the exact dish you ordered (the JSON data).
  - Here is a breakdown of how to correctly classify and describe that link:
    - "This URL is an API endpoint." — This is the most technically accurate phrasing. An endpoint is a specific digital location where an API receives requests.
    - "This is a web API request URL." — This explains that the URL is the vehicle used to communicate with the API.
    - "This URL returns an API response." — This highlights that the result of visiting the URL is structured data (`JSON`) meant for computers, rather than a styled webpage (`HTML`) meant for human eyes.

  > [!IMPORTANT]
  > URLs are **not** a subset of APIs. Instead, they are two completely distinct technologies that happen to overlap when we build systems for the internet.

- `fetch` lets us JS to load data from APIs
  `fetch("https://dog.ceo/api/breed/hound/list")`

### Working with Promises
- Promises
  - For working with operations that take a long time like `fetch` (get the data from the dog API)
  - It takes time to `fetch` data from the network
    ```js
    >> fetch("https://dog.ceo/api/breed/hound/list")
    Promise { <state>: "pending" }
    ```
    - JS writes us an "IOU" - "I Owe You", for the actual data (value) of the thing we're looking for because it doesn't have it yet.
      > [!NOTE]
      > Having a Promise of a value
    - Promises can be in 3 possible states:
      - `pending`: still *waiting* for the value, hang tight
      - `fulfilled` (aka "`resolved`"): finally _got the value_, all done
      - `rejected`: sorry _couldn't get_ the value, all done.

    > [!NOTE]
    > Promise lets us represent a value that we don't have yet

    > [!TIP]
    > A Promise can either be _still in the works_, `pending`, or _finished_.<br>
    > What we want usually is for the Promise to be fulfilled with the value we want.

    > [!IMPORTANT]
    > Promises are also asynchronous since it takes time for Promises to resolve.<br>
    > There are other cases of Promise for long running processes as well. Fetch is one example of an operation or a function that returns a Promise.

- `await`
  - JS doesn't want to stop and wait for the _hound list_ data from `fetch` before running through the rest of the code. JS will add the task to the list, go get us the value, yet in the meantime also keeps running our program.
  - We can use `await` to tell JS to __stop__ and __wait__ for an asynchronous operation to finish.

### Using Await with Promises
- Promise with and without `await`
  - WithOUT `await`
    ```js
    let response1 = fetch("https://dog.ceo/api/breed/hound/list");
    console.log(response1);
    Promise {<pending>}
    ```
  - With `await`
    ```js
    let response = await fetch("https://dog.ceo/api/breed/hound/list");
    console.log(response);
    Response {type: 'cors', url: 'https://dog.ceo/api/breed/hound/list', redirected: false, status: 200, ok: true, …}
    ```
    > [!NOTE]
    > In the case of `await`, JS is going to wait for the Promise to be resolved to the value that JS is giving us an IOU **before** it goes on and continues running our program.<br>
    > Without `await`, JS will give back the *pending* Promise and continue running the rest of the program.<br>
    > `await` pretends that this *asynchronous* operation is a *synchronous* and we have to wait for it to be done before we keep going on with our code.

    > [!NOTE]
    > If we don't assign the value of the Promise to any variable, neither do us have any way of pointing at the Promise that `fetch` evaluated to, then JS will show whatever state that the Promise was in when `fetch` evaluated it. Yet, somewhere in the background, the Promise has gone ahead in its lifetime.
- For the Response `body` that says `body: ReadableStream`. We can call the `.json()` method to parse its body as a JSON object. And yet, that gives us another Promise that we can ask JS to `await` for the result
  ```js
  let response = await fetch("https://dog.ceo/api/breed/hound/list");
  console.log(response);
  > Response {type: 'cors', url: 'https://dog.ceo/api/breed/hound/list', redirected: false, status: 200, ok: true, …}
  let body = await response.json()
  > body
          {message: Array(7), status: 'success'}
          message: (7) ['afghan', 'basset', 'blood', 'english', 'ibizan', 'plott', 'walker']
          status: "success"
          [[Prototype]]: Object
  ```
- Alternative to `await` is `.then()`
  ```js
  fetch("https://dog.ceo/api/breed/hound/list").then((value) => console.log(value))
  > Promise {<pending>}
  > Response {type: 'cors', url: 'https://dog.ceo/api/breed/hound/list', redirected: false, status: 200, ok: true, …}
  ```
  - `.then()` is similar to `await`, yet `await` is less "confusing"
  - For `.then()` we're going to give it a function (callback), it's going to wait to call it until it's done with the Promise. For `await`, we can just pretend that the Promise is just like a regular function call that's going to produce a value.

### Destructing Objects and Arrays

- [Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring)
  - a way of *declaring* multiple *variables* at once.
  - *extracting* the *properties* from an object and making them variables in our current scope
- Destructuring Objects
  - Example:
    ```js
    const spices = [
      { name: "Emma", nickname: "Baby" };
    ]
    ```
    ```js
    let {name, nickname} = spices[0]
    ```
    ```js
    name
    "Emma"
    ```
    ```js
    nickname
    "Baby"
    ```
  - Explain:
    - Take the object at index 0 in the `spices` array
    - Pull out the value of its `name` property and assign that to a new variable `name`
      ```js
      name
      "Emma"
      ```
      `name` is now the val pointing to the value from within that object
    - Do the same thing for the `nickname` property
  - The order of the property from the object doesn't matter
      ```js
      const spices = [
        { name: "Emma", nickname: "Baby" };
      ]
      ```
      ```js
      let { nickname, name } = spices[0]
      ```
      ```js
      nickname
      "Baby"
      ```
      ```js
      name
      "Emma"
      ```
  - It comes in handy when you have an object with lots of different properties but you only care about a couple of them.
    - Say we only want to care about the property `nickname` from the object
      ```js
      const spices = [
        { name: "Emma", nickname: "Baby" };
      ]
      ```
      ```js
      let {nickname} = spices[0]
      ```
      ```js
      nickname
      "Baby"
      ```
      ```js
      name
      "" // property "name" is not understood
      ```
    - Getting the *title* of the *DOM*
      ```js
      let { title } = document // document is an object
      ```
      ```js
      title
      'Doggo Fetch'
      ```
- Destructuring Arrays
  - The order of the values from the array DOES matter
    - Example 1:
      ```js
      let [one, two, three] = [1,2,3]
      ```
      ```js
      one
      1
      ```
      ```js
      three
      3
      ```
    - Example 2:
      ```js
      let [six, five, four] = [4,5,6]
      ```
      ```js
      six
      4
      ```
      ```js
      four
      6
      ```
  - *"Skipping"* the unnecessary values with commas ","
    ```js
    const [emma, geri] = spices;
    ```
    ```js
    const [,,melB] = spices;
    ```
    - Example 1:
      ```js
      let [ten, twenty, thirty, forty] = [10,20,30,40]
      ```
      ```js
      ten
      10
      ```
      ```js
      twenty
      20
      ```
      ```js
      thirty
      30
      ```
      ```js
      let [ten, twenty] = [10,20,30,40]
      ```
      ```js
      ten
      10
      ```
      ```js
      twenty
      20
      ```
    - Example 2:
      ```js
      let [,,thirty,] = [10,20,30,40]
      ```
      ```js
      thirty
      30
      ```
- Collecting remaining values using *Spread* `...` operator
  - *Spread* can be used to *collect* into an array from all of the rest of the values that we don't care about
    ```js
    const [babySpice, ...adultSpices] = spices
    ```
  - Example:
    ```js
    let [un, ...autres] = [1, 2, 3, 4, 5, 6]
    ```
    ```js
    un
    1
    ```
    ```js
    autres
    2, 3, 4, 5, 6
    ```
    This is handy when you don't want to care about the rest of the array right now, but maybe later

> [!IMPORTANT]
> Order DOES matter when we're destructuring arrays, but it doesn't matter when we're destructuring objects

### TODO 2

1. Given
  A URL such as "https://images.dog.ceo/breeds/poodle-standard/n02113799_2280.jpg"
2. Requirement
  return the breed name string as formatted in the breed list, e.g. "standard poodle"
3. Approach:
   1. Locate the breed name string from the url
   2. Make sure the format of the breed name string from the url is exactly the same as from the breed list.<br>
   In case of
      - Two words (poodle-standard)
      - One word (beagle)
      - Optional (multiple words)
   3. Remove unnecessary character from the breed name string, if any
   4. Prioritize destructuring
4. Methods
   - String:
      - [split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
      - [trim](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)
   - Array:
      - [join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
   - Syntax
      - [Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring) (as much as you can)
5. Program
    ```js
    function getBreedFromURL(url) {
      // The string method .split(char) may come in handy
      let unsplitBreed = url.split("/")[4].split("-")
      // Try to use destructuring as much as you can
      let [subbreed, breed] = unsplitBreed;
      return [breed, subbreed].join(" ").trim();
    }
    ```
    Explanations:
    1. Locating and pulling out the string from the url
        ```js
        let unsplitBreed = url.split("/")[4].split("-")
        ```
    2. Destructuring the array
        ```js
        let [subbreed, breed] = unsplitBreed;
        ```
    3. Returning the breed name string as formatted in the breed list.
      Remove unnecessary character (space) with `trim()` for the case of one word ("beagle")
        ```js
        return [breed, subbreed].join(" ").trim();
        ```
6. Result
   1. Two words: "standard poodle"
      ```js
      getBreedFromURL("https://images.dog.ceo/breeds/poodle-standard/n02113799_2280.jpg")
      ```
      ```js
      'standard poodle'
      ```
   2. One word: "beagle"
      ```js
      getBreedFromURL("https://images.dog.ceo/breeds/beagle/n13598_93534.jpg")
      ```
      ```js
      'beagle'
      ```

> [!NOTE]
> You should name the variable with something that is related to the operation / method that it is involved.<br>
> A generic name can cause lots of confusion when you or another developer read the code in the future.

### Async Functions

`await` only works in an `async` function
```js
async function fetchMessage(url) {
  let response = await fetch(url)
  return response;
}

fetchMessage("https://images.dog.ceo/breeds/poodle-standard/n02113799_2280.jpg")
```
If you use it in a regular function, it will throw an error as that violates JS "rule"
> [!WARNING]
> Uncaught SyntaxError: await is only valid in async functions and the top level bodies of modules

### TODO 3

1. Requirements
   - Given a URL (`https://dog.ceo/api/breed/hound/list`), fetch the resource at that URL,
   - then parse the response as a JSON object,
   - finally return the "message" property of its body

2. Program
    ```js
    async function fetchMessage(url) { }
    ```

3. Solution
    ```js
    async function fetchMessage(url) {
      const response = await fetch(url);
      const body = await response.json();
      const { message } = body
      return message;
    }
    ```
    ```js
    await fetchMessage("https://dog.ceo/api/breed/hound/list")
    ```

3. The `async` operations approach
     1. Fetch the data from the url
        ```js
        const response = await fetch(url);
        ```
     2. Parsing JSON
        ```js
        const body = await response.json();
        ```
     3. Get the **message** from the **body**
        > [!TIP] Dev Console
        > {message: Array(7), status: 'success'}<br>
        >      message: (7) ['afghan', 'basset', 'blood', 'english', 'ibizan', 'plott', 'walker']<br>
        >      status: "success"<br>
        >      [[Prototype]]: Object
        ```js
        const [ message ] = body
        ```
     4. Return all of the Promise value in an `async` function that we need to `await`
        ```js
        async function fetchMessage(url)
        ```

4. Result
    ```js
    (7) ['afghan', 'basset', 'blood', 'english', 'ibizan', 'plott', 'walker']
    ```

> [!IMPORTANT]
> Since you're using `await`, you need to declare an `async` function for it.<br>
> And you need to call it with the `await` keyword.<br>
> Otherwise it's going to return just a *pending* Promise.

> [!TIP] Optional homework:
> [What the heck is the event loop anyway? | Philip Roberts | JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ)<br>
> [Introducing asynchronous JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Introducing)

## Notes
- The current structure of this code base is arbitrary, you can feel free to restructure the code in your own favor, yet we can do that after walking through all the exercises together.
- `BREEDS` is in caps because we don't expect to change that value.
- We're going to write dynamically functions, therefore nothing should be hardcoded.
- For the function `getMultipleChoices`, we pass in `possibleChoices` instead of the array `BREEDS` because we want to make it a dynamic function that we can reuse it with any other arrays for any other program that requires a similar feature. If we're to *hardcode* the array `BREEDS`, we wouldn't have been able to reuse it for any other program.
- Also, the function `getMultipleChoices` is called within the utility function `loadQuizData` down the road with the 3 arguments `3, correctBreed, BREEDS` already
  ```js
  // Function to load the data needed to display the quiz
    async function loadQuizData() {
      document.getElementById("image-frame").textContent = "Fetching doggo...";

      const doggoImgUrl = await fetchMessage(RANDOM_IMG_ENDPOINT);
      const correctBreed = getBreedFromURL(doggoImgUrl);
      const breedChoices = getMultipleChoices(3, correctBreed, BREEDS);

      return [doggoImgUrl, correctBreed, breedChoices];
    }
  ```