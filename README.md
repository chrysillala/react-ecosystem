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