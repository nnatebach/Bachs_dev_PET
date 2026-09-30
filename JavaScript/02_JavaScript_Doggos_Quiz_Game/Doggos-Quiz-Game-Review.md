# The 20% that gives you 80% of the understanding is async flow and the two things that wait. Everything else in this file is ordinary logic you already wrote.

## Source code

```js
const RANDOM_IMG_ENDPOINT = "https://dog.ceo/api/breeds/image/random";

const BREEDS = [
  "affenpinscher",
  "african",
  "airedale",
  "akita",
  "appenzeller",
  "shepherd australian",
  "basenji",
  "beagle",
  "bluetick",
  "borzoi",
  "bouvier",
  "boxer",
  "brabancon",
  "briard",
  "norwegian buhund",
  "boston bulldog",
  "english bulldog",
  "french bulldog",
  "staffordshire bullterrier",
  "australian cattledog",
  "chihuahua",
  "chow",
  "clumber",
  "cockapoo",
  "border collie",
  "coonhound",
  "cardigan corgi",
  "cotondetulear",
  "dachshund",
  "dalmatian",
  "great dane",
  "scottish deerhound",
  "dhole",
  "dingo",
  "doberman",
  "norwegian elkhound",
  "entlebucher",
  "eskimo",
  "lapphund finnish",
  "bichon frise",
  "germanshepherd",
  "italian greyhound",
  "groenendael",
  "havanese",
  "afghan hound",
  "basset hound",
  "blood hound",
  "english hound",
  "ibizan hound",
  "plott hound",
  "walker hound",
  "husky",
  "keeshond",
  "kelpie",
  "komondor",
  "kuvasz",
  "labradoodle",
  "labrador",
  "leonberg",
  "lhasa",
  "malamute",
  "malinois",
  "maltese",
  "bull mastiff",
  "english mastiff",
  "tibetan mastiff",
  "mexicanhairless",
  "mix",
  "bernese mountain",
  "swiss mountain",
  "newfoundland",
  "otterhound",
  "caucasian ovcharka",
  "papillon",
  "pekinese",
  "pembroke",
  "miniature pinscher",
  "pitbull",
  "german pointer",
  "germanlonghair pointer",
  "pomeranian",
  "medium poodle",
  "miniature poodle",
  "standard poodle",
  "toy poodle",
  "pug",
  "puggle",
  "pyrenees",
  "redbone",
  "chesapeake retriever",
  "curly retriever",
  "flatcoated retriever",
  "golden retriever",
  "rhodesian ridgeback",
  "rottweiler",
  "saluki",
  "samoyed",
  "schipperke",
  "giant schnauzer",
  "miniature schnauzer",
  "english setter",
  "gordon setter",
  "irish setter",
  "sharpei",
  "english sheepdog",
  "shetland sheepdog",
  "shiba",
  "shihtzu",
  "blenheim spaniel",
  "brittany spaniel",
  "cocker spaniel",
  "irish spaniel",
  "japanese spaniel",
  "sussex spaniel",
  "welsh spaniel",
  "english springer",
  "stbernard",
  "american terrier",
  "australian terrier",
  "bedlington terrier",
  "border terrier",
  "cairn terrier",
  "dandie terrier",
  "fox terrier",
  "irish terrier",
  "kerryblue terrier",
  "lakeland terrier",
  "norfolk terrier",
  "norwich terrier",
  "patterdale terrier",
  "russell terrier",
  "scottish terrier",
  "sealyham terrier",
  "silky terrier",
  "tibetan terrier",
  "toy terrier",
  "welsh terrier",
  "westhighland terrier",
  "wheaten terrier",
  "yorkshire terrier",
  "tervuren",
  "vizsla",
  "spanish waterdog",
  "weimaraner",
  "whippet",
  "irish wolfhound",
];

// Utility function to get a randomly selected item from an array
function getRandomElement(array) {
  const i = Math.floor(Math.random() * array.length);
  return array[i];
}

// Utility function to shuffle the order of items in an array in-place
function shuffleArray(array) {
  return array.sort((a, b) => Math.random() - 0.5);
}

// TODO 1
// Given an array of possible answers, a correct answer value, and a number of choices to get,
// return a list of that many choices, including the correct answer and others from the array
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

// TODO 2
// Given a URL such as "https://images.dog.ceo/breeds/poodle-standard/n02113799_2280.jpg"
// return the breed name string as formatted in the breed list, e.g. "standard poodle"
// example of a one word breed "https://images.dog.ceo/breeds/beagle/n13598_93534.jpg"
function getBreedFromURL(url) {
  // The string method .split(char) may come in handy
  let unsplitBreed = url.split("/")[4].split("-")
  // Try to use destructuring as much as you can
  let [subbreed, breed] = unsplitBreed;
  return [breed, subbreed].join(" ").trim();
}

// TODO 3
// Given a URL, fetch the resource at that URL,
// then parse the response as a JSON object,
// finally return the "message" property of its body
async function fetchMessage(url) {
  const response = await fetch(url);
  const body = await response.json();
  const { message } = body;
  return message;
}

// Function to add the multiple-choice buttons to the page
function renderButtons(choicesArray, correctAnswer) {
  // Event handler function to compare the clicked button's value to correctAnswer
  // and add "correct"/"incorrect" classes to the buttons as appropriate
  function buttonHandler(e) {
    if (e.target.value === correctAnswer) {
      e.target.classList.add("correct");
    } else {
      e.target.classList.add("incorrect");
      document
        .querySelector(`button[value="${correctAnswer}"]`)
        .classList.add("correct");
    }
  }

  const options = document.getElementById("options"); // Container for the multiple-choice buttons

  // TODO 4
  // For each of the choices in choicesArray,
  // Create a button element whose name, value, and textContent properties are the value of that choice,
  // attach a "click" event listener with the buttonHandler function,
  // and append the button as a child of the options element
  for (let choice of choicesArray) {
    const button = document.createElement("button");
    button.textContent = choice;
    button.value = choice;
    button.name = choice;
    button.addEventListener("click", buttonHandler);
    options.appendChild(button);
  }
}

// Function to add the quiz content to the page
function renderQuiz(imgUrl, correctAnswer, choices) {
  const image = document.createElement("img");
  image.setAttribute("src", imgUrl);
  const frame = document.getElementById("image-frame");

  image.addEventListener("load", () => {
    // Wait until the image has finished loading before trying to add elements to the page
    frame.replaceChildren(image);
    renderButtons(choices, correctAnswer);
  });
}

// Function to load the data needed to display the quiz
async function loadQuizData() {
  document.getElementById("image-frame").textContent = "Fetching doggo...";

  const doggoImgUrl = await fetchMessage(RANDOM_IMG_ENDPOINT);
  const correctBreed = getBreedFromURL(doggoImgUrl);
  const breedChoices = getMultipleChoices(3, correctBreed, BREEDS);

  return [doggoImgUrl, correctBreed, breedChoices];
}

// TODO 5
// Asynchronously call the loadQuizData() function,
// Then call renderQuiz() with the returned imageUrl, correctAnswer, and choices
(async () => {
  const [imgUrl, correctAnswer, choices] = await loadQuizData();
  renderQuiz(imgUrl, correctAnswer, choices);
})();
```

## Analysis

The 20% that gives you 80% of the understanding is async flow and the two things that wait. Everything else in this file is ordinary logic you already wrote.

1. The chain of calls (the map)

    IIFE → `loadQuizData()` → `fetchMessage()` → `getBreedFromURL()` → `getMultipleChoices()` → back to the IIFE → `renderQuiz()` → image loads → `renderButtons()`.

    If you can say this from memory, you understand the structure of the whole program.

2. `async`/`await` and promises

    - An `async` function always returns a promise.
    - `await` pauses that function until the promise resolves, without freezing the page.
    - `fetch` needs two `await`s: one for the response, one for parsing the body with `.json()`.
    - The IIFE exists only to give `await` a home.

    This is the single most reusable idea in the file.

3. Callbacks and events

    - `addEventListener` hands the browser a function to call later.
    - `e.target` is the element that was clicked.
    - `buttonHandler` still remembers `correctAnswer` after `renderButtons` finishes (closure). You only need the idea, not the theory.

    The image load listener works the same way: "run this when the image is ready."

4. Destructuring

    `const [imgUrl, correctAnswer, choices] = await loadQuizData()` and the `[subbreed, breed]` line. Just know that it unpacks array items into variables, and that a missing item becomes `undefined`.

__What to ignore for now__

The shuffle bias, error handling, infinite-loop edge cases, URL shape edge cases, and improvement ideas. None of it blocks Modules.

__A 20-minute version of the plan__

1. Write the call chain on paper from memory (5 min).
2. In the console, run await fetch("https://dog.ceo/api/breeds/image/random"), then call .json() on the result, and watch what each step returns (10 min).
3. Add one console.log inside buttonHandler to see e.target (5 min).

## Analytic Questions

1. The chain of calls

   - __Q1: What is the order of execution from the IIFE to the buttons appearing?__ The IIFE calls `loadQuizData()`, which calls `fetchMessage()`, then `getBreedFromURL()`, then `getMultipleChoices()`. The results go back to the IIFE, which calls `renderQuiz()`. When the image loads, `renderButtons()` runs.
   - __Q3: What does each function take in and return, and which touch the page?__ Most helpers are pure (input → output). `fetchMessage` does network I/O, and `loadQuizData`, `renderQuiz` and `renderButtons` touch the DOM.

2. Async/await and promises

   - __Q17: Why are there two `await`s in `fetchMessage`?__ `fetch` resolves when the response headers arrive, and `.json()` is a second async step that reads and parses the body.
   - __Q18: What does an `async` function return?__ Always a promise, and `return x` becomes the value that promise resolves to.
   - __Q19: What if you remove an `await`?__ Without the first, `response` is a promise and `response.json` is a `TypeError`. Without the second, `body` is a promise and `message` is `undefined`.
   - __Q29: Why does `loadQuizData` return an array, and how does the IIFE unpack it?__ A function returns one value, so it bundles three in an array, and destructuring unpacks them.
   - __Q30: Why the `(async () => { ... })();` wrapper?__ It gives `await` an async function to live in. In a module you'd use top-level `await` instead.

3. Callbacks and events

   - __Q21: What does `e.target` refer to?__ The element that triggered the event, here the clicked button.
   - __Q22: How does `buttonHandler` still know `correctAnswer`?__ Closure: a function remembers the variables from the scope where it was created.
   - __Q26: Why wait for the image's `load` event before adding buttons?__ So the image and buttons appear together, without the layout jumping.

4. Destructuring

   - __Q14: What does `[subbreed, breed] = unsplitBreed` do with a single-element array?__ `breed` is `undefined`, since destructuring never throws for missing items. That's also why `.trim()` is needed afterward.
   - Q29 doubles as the destructuring question for the IIFE line.

## Functions to understand

Four functions plus the IIFE, since they carry the async, event, and destructuring ideas.

__Must understand__

- __The IIFE:__ it's the entry point. Know why it's async, how `await loadQuizData()` works, and how destructuring unpacks the returned array.
- __`fetchMessage`__: the clearest example of `async`/`await` in the file. Know why there are two `await`s and that the function returns a promise.
- __`loadQuizData`__: it ties everything together. Know the order of steps and why it returns an array of three values.
- __`renderButtons`, specifically `buttonHandler`__: this is where you see events, `e.target`, and closure (it remembers `correctAnswer`).

__Understand lightly__

- __`renderQuiz`__: just know it waits for the image's `load` event before showing the buttons. That's another "run this later" callback, like the click handler.
- __`getBreedFromURL`__: only the destructuring line matters, especially what happens when the array has one element. The rest is string manipulation.

__Skip for now__

- __`getRandomElement`__, __`shuffleArray`__, and __`getMultipleChoices`__: ordinary loops and array logic. You wrote them and they work, and none of them teaches a new concept you'll need for Modules.

If you can explain those four in one sentence each and describe where the program waits (the two `await`s and the image `load` event), you understand what matters and can move on.
