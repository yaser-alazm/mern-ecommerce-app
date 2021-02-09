# Getting Started with MERN ECommerce App

## Available Scripts

In the project directory, you can run:

#### `npm run server`

Runs the app node server in the development mode.\
On [localhost route](http://localhost:8000) to view it in the browser.

#### `npm run client`

To run the React app server on port (3000) on development mode.

#### `npm run dev`

To run both Express & React servers at the same time.

#### `npm run seed:data`

To run the seerder script and import dummy data to mongo database.

---

## Starting with React app

- ##### Cleaning the default settings for the react app.

- ##### Add git repo to the root directory.

- ##### Setup bootstrap.css (react-bootstrap pckg).

- ##### Add basic components (Navbar-Footer-HomeScreen-ProductScreen).

- ##### Implementing react router.

- ##### Fetching products data from a dummy json file.

---

## Starting on Express.

- ##### Add basic products & single product express routes.

- ##### Fetch data on React from express server (useEffect).

- ##### Setup ENV Variables on express and link express & react servers to work concurrently (using nodemon).

---

## Starting on MongoDB.

- ##### Connect to database & create Product - User - Order models.

- ##### Create a seeder script to seed our dump data to the database (one time run script).

- ##### Fetching the data from the database.

- ##### Create a custom Error Handling.

---

## Starting on ReduxJs

- ##### Setup Redux store with thunk middleware & Redux devtools chrome extension. Add the store as a provider to the app (in index.html).

- ##### Create products reducer with it's constants and switch through them.

- ##### Create actions to fetch products & fetch single product and attach the payload to products and error state if there is any.

- ##### Integrate fetch products and single product actions in products components and use useSelector to get the states from the redux store.

---

## Setup cart functionality

##### Create add to cart handler on (add to cart) button and move to the cart route with product id and quantity params.

##### Create add to cart reducer & action.

##### Store the cart items inside local storage.

##### Set the default carItems state to the local storage cartItems value.

##### Display cart items in the cart route, handle delete action for cart.

##### Add remove cart item reducer and action .

---

## Adding user authentication & authorization

##### In the server, create user authenticate login route controller and return the user if email - pasword matches.

##### Generate JWT token and set it to the user returned object after been authenticated.
