<br />
<p align="center">
  <h3 align="center">Q Agency Work Task</h3>

  <p align="center">
    Blog style app for DEMO purposes :smile:
    <br />
    <a href="https://github.com/markoarthofer22/q-agency-task"><strong>Explore the docs »</strong></a>
    <br />
  </p>
</p>

<!-- ABOUT THE PROJECT -->

## About The Project

React app made for demo purposes. Blog style app that consists of 3 pages/routes. Focused on state managment using ContextAPI. Node.js & npm are required.

Basic structure:

-   Modified [create-react-app](https://create-react-app.dev/)
-   State managed with ContextAPI (Redux/Thunk with Reselect is also included and wrapped, so you can use that)
-   Function based React, knowledge of Hooks is required
-   Grid system based on Bootstrap framework
-   Normalize copied from Bootstrap
-   Custom src structure
-   Prop-types for typing
-   All components made from scratch
-   CamelCase convention
-   [LoremPicsum](https://picsum.photos/) API used for Blog images
-   [my-json-server](https://my-json-server.typicode.com/markoarthofer22/q-agency-db) for storing default data (in free ver. it doesn't support saves beetween
    API calls)

### Built With

-   [ReactJS](https://reactjs.org/)
-   [Bootstrap](https://getbootstrap.com)

<!-- GETTING STARTED -->

## Getting Started

First, to discuss structure and typing in app.

-   files are sorted per usage. (alphabetically)
    -   /assets => imported assets that get compiled (backgrounds ect.)
    -   /components => reusable componets, can be shared on other projects :smile:
    -   /contextStore => ContextAPI store, contains globals and app folder, for state managment (used in this project)
    -   /css => global styles (app.scss, libs, grid), variables.scss (all vars are defined and shared in it)
    -   /layouts => grouped components that make a whole. Can be reused together (example SingleBlogCard)
    -   /pages => main pages for router
    -   /redux => store for state managment based on Redux/Thunk/Reselect, wrapped around App.js (usable)
    -   /routes => routes.js file, plain js object that contains routes (I like to keep it seperated :smile: )
-   .scss is used per component. every component/page/layout has its own styles.scss
-   App.js => first component rendered, used as wrapper for Context (Providers) and for GlobalLoader
-   Index.js => main components, used as wrapper for Redux store

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/markoarthofer22/q-agency-task.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```
3. Optional => disable elint by adding to `.env`
    ```JS
    EXTEND_ESLINT=true
    DISABLE_ESLINT_PLUGIN=true
    ```

<!-- USAGE EXAMPLES -->

## Usage

Because it is created with [create-react-app](https://create-react-app.dev/) starting is very simple. Use

```sh
  npm start
```

for local develpoment and

```sh
  npm run build
```

for production build. Optionally use

```sh
  npm run eject
```

if you need to heavily modify webpack

_For more examples, please refer to the [Documentation](https://create-react-app.dev/docs/available-scripts/)_

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Marko Arthofer - [GIT](https://github.com/markoarthofer22)

Project Link: [https://github.com/markoarthofer22/q-agency-task](https://github.com/markoarthofer22/q-agency-task)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

-   [axios](https://www.webpagefx.com/tools/emoji-cheat-sheet)
-   [swiperJS](https://swiperjs.com/)
-   [lodash](https://lodash.com/)
-   [react-helmet](https://github.com/nfl/react-helmet)
-   [redux](https://redux.js.org/)
-   [sweetalert2](https://sweetalert2.github.io/)
