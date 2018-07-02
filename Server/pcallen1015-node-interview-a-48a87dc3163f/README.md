# arcade-node

This project contains a simple Node.js server that supports the Arcade project.

## Getting Started

### Prerequsites

1. Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
2. Install [MongoDB](https://docs.mongodb.com/manual/installation/)
3. Install [Node (and NPM)](https://nodejs.org/en/)

### Clone the Repository

```
git clone https://bitbucket.org/pcallen1015/node-interview-a.git
```

### Install Project Dependencies

```
cd node-interview-a/
npm install
```

### Checkout a New Submission Branch

```
git checkout -b submission/[your_name_here]
```

This is how you will ultimately submit your solution.

### Run the App

Make sure MongoDB is running

```
mongod
```

Start the Node server

```
npm start
```

The server should start running at `localhost:3000`

---

# The Interview Exercise

## The Objective

The purpose of this exercise is for you to demonstrate your skills working with Node.js, Express, and MongoDB. The project uses many of the technologies we frequently use to build applications in our team.

## The One Big Rule

**Your work should be your own**

You are welcome to use the resources that would normally be at your disposal (Google, Stackoverflow, Documentation, etc.), but your submission should reflect your own problem solving ability.

DON'T, for example, find an existing solution (if one exists), copy+paste, and submit that as your own work, thinking we won't notice. **We will**.

## The Project Structure

```
config/
controllers/
  |-- wins.controller.js
models/
  |-- win.model.js
routes/
  |-- wins.routes.js
app.js
package.json
README.md
```

### `app.js`

The main entry point for the app.

### `controllers/`

Controller functionality.

- `wins.controller.js`: Controller functionality for "Wins"

### `models/`

Mongoose models for MongoDB.

- `win.model.js`: The "Win" model

### `routes/`

Express routes.

- `wins.routes.js`: Routes for "Wins"

## Tips

1. Documentation - Everybody likes well-documentation code, and it helps understand your thought process.
2. Don't be afraid to go "above and beyond." If you have an idea for a cool additional feature, or an improvement to an existing one, or an alternatice design approach, GO FOR IT (once you've completed the required stuff, that is).

---
# THE EXERCISE REQUIREMENTS

## 1. Data Modeling with MongoDB

Start by defining a "Win" model, that can be used to track when a player wins a game.

Inside `models/win.model.js`, define a Win model that captures the following information:
- The name of the player who won the game (e.g.: "John", "Player X", "Human")
- The name of the game (e.g.: "Tic-Tac-Toe", "Rock-Paper-Scissors")
- The date the game was played

**All three pieces of information are REQUIRED**

## 2. Routing Requests with Express

Next, we need to expose some API endpoints so we can start creating and interacting with data.

Inside `routes/wins.routes.js`, define FIVE (5) routes that will correspond to basic CRUD (Create, Read, Update, Delete) operations (plus a List operation):

1. A route that will allow a client to CREATE a new Win
2. A route that will allow a client to READ a single, existing Win
3. A route that will allow a client to UPDATE a single, existing Win
4. A route that will allow a client to DELETE a single, existing Win
5. A route that will allow a client to LIST all existing Wins

It's up to you how you achieve this (what paths you use, etc.), so long as a client can perform these five basic operations efficiently.

## 3. Putting it All Together with Controllers

Now for the actual functionality...

Inside `controllers/wins.controller.js`, implement the five basic operations corresponding to the routes you just defined:

1. CREATE: creates a new Win
2. READ: retrieves a single Win
3. UPDATE: updates an existing Win
4. DELETE: delete an existing Win
5. LIST: retrieve all Wins

## 4. (BONUS) Ideas for Extra Features

1. The "Game" Model
    1. Define an additional "Game" model that tracks the `name` of a game and a `description` of that game
    2. Implement the same basic CRUD(L) operations/routes you implemented for the Win model
    3. Define a relationship between the Win model and the Game model (hint: you should only be able to win a game that is defined in the database)
4. Extra Win operations
    1. Determine how many times a game has been played
    2. Get a summary of a player's wins (e.g.: `{ name: 'John', Tic-Tac-Toe: 4, Rock-Paper-Scissors: 3 }`)

Feel free to get creative!

## 5. Submission

You're all done!

To submit your solution, send us an [email](mailto:arcade-interview@cisco.com) with the following:

### Your Name

... so we know who you are.

### A Link to Your Code

Create a repository on a service like Github or Bitbucket and provide the link.

**Please don't commit back into this repository! It will be publically accessible and we don't want people stealing your solution!**

### Code Improvements

If you had more time, is there anything you'd do differently (in your code OR in OURS)? What would you do and why?

### Reflection & Feedback

What did you think about this exercise? Did you like it? Did you hate it? Were the instructions clear? Was is too easy? Too hard?