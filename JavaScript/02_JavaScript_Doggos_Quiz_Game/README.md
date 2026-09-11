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