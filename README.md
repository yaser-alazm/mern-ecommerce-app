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

- ##### Create add to cart handler on (add to cart) button and move to the cart route with product id and quantity params.

- ##### Create add to cart reducer & action.

- ##### Store the cart items inside local storage.

- ##### Set the default carItems state to the local storage cartItems value.

- ##### Display cart items in the cart route, handle delete action for cart.

- ##### Add remove cart item reducer and action .

---

## Adding user authentication & authorization (on back-end)

- ##### In the server, create user authenticate login route controller and return the user if email - pasword matches.

- ##### Generate JWT token and set it to the user returned object after been authenticated.

- ##### Add auth middlware to set user data to the req object (req.user) and authorize users to access private routes (like get the user profile route)

- ##### Add register a new user controller and hash the password from the user model schema (pre save).

- ##### Add protected endpoints to fetch a user profile and edit it.

---

## Adding user authentication & authorization (on front-end)

- ##### Create user login reducer & action.

- ##### Store the logged in user info inside local storage.

- ##### Set the default user info state to the local storage user info value.

- ##### Create the user login screen and set the login form to call the login end point and validate the user info and login.

- ##### Add user logout action and use user state to toggle navbar ui login and logout status.

- ##### Create the user register screen and set the register form to call the register end point and validate the user info.

- ##### Login the user directly after register and set the initial value to the user registred info.

- ##### Create (get user profile & update user profile) routes & conrollers(protected with token) on server.

- ##### Create user profile (reducer & action) then create profile screen form and fetch the user profile (passing the user token for authorization).

- ##### Add update profile action to profile screen, set the 'success' state to show succes message.

---

## Starting checkout process

- ##### Create checkout steps component with links for each step.
- ##### Create shipping screen form component on the client.
- ##### Create shipping address state (in cart reducer & save shipping address action) inside cart state, store it's values in the local storage and get it's default value from there.
- ##### Create payment screen radio selector form component on the client (paypal is the default and only method for now).
- ##### Create payment method state (in cart reducer & save payment method action) inside cart state, store it's values in the local storage and get it's default value from there.
- ##### Create place order screen and add all the items info with tax - shipping - total price calculations.
- ##### Create addNewOrder private endpoint (route - controller) on backend.
- ##### Fire create order action from (place order btn in place order screen) and store the order in the database and redirect user to the order checkout finish screen.

---

## Complete single order checkout process

- ##### Create single order get by ID endpoint in the backend, create single order reducer & action on the frontend.
- ##### Create single order screen and fetch the order info from redux action and use order info inside the screen.
- ##### Create backend endpoint to update the order with payment information after the order been paid.
- ##### Create orderPayment redux reducer & action to update the order and set the payment info to it after payment.
- ##### Create PayPal developer sandbox app, get the app client id and fetch it using paypal route from our node server.
- ##### Create Paypal SDK script dynamically and add it to the dom.
- ##### Implement the pay action inside order screen and update the order info to with paymentResult and set the order status to true .
- ##### Add users orders to user profile screen:

  - ###### Create orderListUser route and controller on the server.
  - ###### Create orderListUser Reducer and action.
  - ###### Add orderListUser action to profile screen and fetch user's orders.
  - ###### Integrate user's orders inside user's profile screen table.

---

## Start with admin dashboard

- ##### Create protected route to get all users (only for admins requests through adminsOnlyAuthorized middleware).
- ##### Create users list screen and add it to the admin dropdown menu in the navbar.
- ##### Add security redirects and logout user resets functionality to the user reducers & logout action.
