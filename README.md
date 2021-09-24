# Build Modern Projects with React

Linkedin Learning Course by Shaun Wassell

## How to start this app
1. Run `npm run dev` to start the app
1. Clone the [server repo](https://github.com/chrysillala/react-ecosystems-server), run `npm start` to start the server
1. To run all tests, you can use this command `npm run test`

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

When writing reducers, ask yourself this question,

> What changes we need to expect from Redux Store whenever each of these actions take place?

### Connecting components to store

We can use `connect` from react-redux, it is a higher order function to connect components to the store.

#### mapStateToProps

The state argument that gets passed to to mapStateToProps is an object that represents the entire Redux state. In our case, it'll only have todos property so far but in larger app it can contain pretty large number of properties representing different pieces of data in our app, such ass users, videos, articles etc.

The job of mapStateToProps is take state object and return another object containing the pieces of that state that our component needs access to.
So now we can use the todos state by passing it as todos prop.

#### mapDispatchToProps

This function works similar way to mapStateToProps, in the properties of the object to be returned will be passed to our component as props.
The difference is, it takes dispatch as argument. Dispatch is a function that allows our components to trigger actions that our Redux store will respond to.

### Redux Persist

https://github.com/rt2zz/redux-persist

`npm i redux-persist`

Persist and rehydrate a Redux store.

While persisting a Redux store is most often a very helpful thing, during development it can sometimes lead to permacrash, where the state is screwed up with relation to our app and our app keeps crashing because of some error. If this happens, delete the persisted data from local storage or wherever else you are storing it.

### Redux Best Practices

1. Export the connected and unconnected versions of a component. The connected version is usually what the rest of the app will want to use, but when testing, it will make your life easier if you can simply test your component as is without having to create and set up a fake store. Your test shouldn't care whether your component is connected or not.
1. Keep Redux actions and async operations out of your reducers.
1. Think carefully about connecting components. Connecting a component can, in practice, make it less reusable. We should avoid connecting components to the store if we plan on reusing them with different data. Instead, we should have some kind of parent component that's connected to the store and pass the correct data to these reusable components.

### Redux Thunk

Thunk middleware for Redux. A side-effect libraries, which aims to give us a place to put side-effect logic, such as doing any async operation like fetching or updating server data.

`npm i redux-thunk redux-devtools-extension @babel/runtime`

`npm i -D @babel/plugin-transform-runtime`

- `redux-thunk` : we will need this obviously
- `redux-devtools-extension` : to add Thunk middleware to our Redux store in a nice, neat way
- `@babel/runtime` : to make our asynchronous Thunk works
- `@babel/plugin-transform-runtime` : the development version of `@babel/runtime`

### Selectors

Selectors give us a place to put logic for combining, filtering, transforming stored data. Selectors work as part of something big, for better code separation.

This app will use selectors instead of just referring directly to how data is stored in the state. This allows us to modify the structure of our data in Redux store without disturbing our components whatsoever.

#### Selectors Purpose

1. Selectors can help our components be independent of the exact structure of data in our Redux store
1. To give us a place to put the logic necessary for transforming bare Redux data into more specific data that our comopnents might need

Back to the app, we want to improve our app by displaying two separate list, one for completed todos and one for todos that we haven't completed yet. To solve this problem, we will create another selectors to get filtered todos.

#### Reselect

https://github.com/reduxjs/reselect

`npm i reselect`

A tool to build more complex logic on top of simpler selectors and even combine different selectors.

## Styled-Components

https://styled-components.com/

`npm i styled-components`

Concern when using CSS modules:

1. Having extra css files for every component clutters up the directory structure
1. Different variants of styles will be hard to maintain

By using styled-components, it allows us to define styles inside our JS files, this term is called css-in-js. It moves all the styling logic out of main component and into a part of our code where sole job is to handle that kind of logic.

## Testing

`npm i -D mocha chai` : dependencies for testing
`npm i -D @babel/register` : to make our tests can run modern babel code

### Testing Reducers

Testing Reducers is very important in React Redux app because they control the central state of our app, so it's pretty vital for them to work correctly under all normal circumstances.

#### What we want to make sure when testing Reducers

Reducers are pure function, which means they have no internal state for us to set up.

We simply have to define a current state and an action, pass those two arguments to our reducer to see if returns what we expected.

### Testing Redux thunks

`npm i -D sinon node-fetch fetch-mock`

`sinon` : to create a fake function that we can pass in, that keeps track of what arguments it was called with

`node-fetch fetch-mock` : for testing purposes we don't want to send real requests to the server. especially when we write test for adding or deleting datas from the server. So we need to replace our fetch with fake fetch that behaves like real fetch.

#### What we want to make sure when testing Thunks

1. Thunk should dispatches the correct action at the right times
1. Thunk should make the correct external requests

### Testing Selectors

As our app gets bigger, we might want to pass the result of another selector to different selector but the only thing we need to test is the last function that we passed to `createSelector`

Because we are using Reselect, it has `resultFunc()` which is a reference to the last function that we passed to createSelector, we can use this in our tests to pass in whatever previous selector results that our selectors required, then we can pass the fake state.

#### What we want to make sure when testing Selectors

Define what data should be returned by the smallest selectors that our current selector relies on, and then use the `resultFunc` to pass that data arguments into the final function we pass to our selectors.

### Testing Styled-Components

We don't exactly test our full styled-components.

#### What we want to make sure when testing Styled-Components

The only thing we can really test in our styled components is the logic we put inside them. To test effectively, we might want to pull the UI logic into its own function and test that.
