# Build Modern Projects with React

## Install React from scratch
1. `npm init -y`
1. `git init`
1. `npm i --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react` : @babel/preset-env will handle transformation of es6 in commonJS, @babel/preset-react which knows how to deal with jsx file
1. `npm i react react-dom`
1. `npm i --save-dev webpack webpack-cli webpack-dev-server style-loader css-loader babel-loader` : packages needed to build and serve with webpack