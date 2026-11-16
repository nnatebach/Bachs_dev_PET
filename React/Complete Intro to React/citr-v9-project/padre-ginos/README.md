The beginning of this "padre ginos" practice is Friday, November 13th, 2026

## React without a build step

- HTML

  ```html
  <div id="root">not rendered</div>
  ```

  **root** will be replaced, if you see _not rendered_ in the page, that means something went wrong.

  Load things off of CDM without any build step

  ```html
  <script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
  ```

  - Reference: [CDN Links](https://legacy.reactjs.org/docs/cdn-links.html)

  - Why there are two packages?
    - **react** is the universal interface for React
    - __react-dom__ the actual rendering layer to the DOM of the browser.

- Terminal
  Running local host server using Node

  ```node
  npx serve
  ```

  **serve** is service made by Vercel

  > Browser shows _not rendered_

  Terminal says
  > HTTP  11/16/2026 1:40:39 PM ::1 GET /favicon.ico
  > HTTP  11/16/2026 1:40:39 PM ::1 Returned 404 in 2 ms

- App.js
  - This is a component *App*
    React is all about creating component
    Each component is like a stamp, it is reusable

    ```js
    const App = () => {
      return React.createElement(
        "<div>",
        {},
        React.createElement("h1", {}, "Padre Gino's")
      )
    }
    ```

    Explanation
      - *createRoot* lets you create a root to display React components inside a browser DOM node.
      - *createElement* stamps the stamp once every time we call it - We can stamp it as many times as we want

  - References:
    - [**createElement**](https://react.dev/reference/react/createElement)
    - [**createRoot**](https://react.dev/reference/react-dom/client/createRoot)

- Browser:
  > Padre Gino's