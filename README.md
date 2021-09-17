# Build Modern Projects with React

## Install React from scratch
1. `npm init -y`
1. `git init`
1. `npm i --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react` : @babel/preset-env will handle transformation of es6 in commonJS, @babel/preset-react which knows how to deal with jsx file
1. `npm i react react-dom`
1. `npm i --save-dev webpack webpack-cli webpack-dev-server style-loader css-loader babel-loader` : packages needed to build and serve with webpack
1. `npm i --save-dev react-hot-loader`

## Redux

https://redux.js.org/

Global State Management: A single centralized state that all components have unrestricted access to.

`npm i redux react-redux`

### Why we need to use Redux
- It solves props drilling problem
- It solves the problem of how to properly share state
### How does it work?
Components can only interact with the state by triggering redux actions
- store: one central, global state
- actions {type, payload}: explicitly define the different events that can occur in our app
- reducers: specifying what should happen to Redux store, when a given action occurs

### Action Creators
A function that takes extra info as an argument and returns an action object with this info as the payload.

It abstracts away all the actual code for the actions.
It's much easier and less error prone than explicitly code out action objects. And for this reason, in React Redux app we work almost exclusively with action creators instead of using bare actions, even when a given action doesn't even have a payload.

### Reducers
Reducers take the current state and action that was triggered and decide what changes should occur in the state as the result of this action then return the updated state and Redux will take this returned value and set current state to that.

By default, it should return the unchanged state because our reducer will get called whenever any action gets triggered in our application. If our switch block make it to the default case, that means the action that was triggered wasn't one that we're really concerned with, so we should simply return the state as is.

### Connecting components to store
We can use connect from react-redux, it is a higher order function to connect components to the store.
#### mapStateToProps
The state argument that gets passed to to mapStateToProps is an object that represents the entire Redux state. In our case, it'll only have todos property so far but in larger app it can contain pretty large number of properties representing different pieces of data in our app, such ass users, videos, articles etc.

The job of mapStateToProps is take state object and return another object containing the pieces of that state that our component needs access to.
So now we can use the todos state by passing it as todos prop.

#### mapDispatchToProps
This function works similar way to mapStateToProps, in the properties of the object to be returned will be passed to our component as props.
The difference is, it takes dispatch as argument. Dispatch is a function that allows our components to trigger actions that our Redux store will respond to.
