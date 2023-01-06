Title: Getting Started with React Development in 5 Minutes
Date: 2016-06-01
Category: web, js

![cyberpunk](./cyberpunk/5.jpg){:height="300px" width="400px"}


The VR world has a lot of [React](https://reactjs.org/), and there are so many things I have been learning, and I want to share with you! I am starting to write a series of posts diving into React, and I am dumping all the things in [this GitHub repository](https://github.com/bt3gl/Everything_React).

Today I am showing how easy it is to start with React in 5 minutes.


### What's React?

From [React's documentation](https://reactjs.org/tutorial/tutorial.html#what-is-react): **"React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called “components”.**


### Some Concepts

#### Components

Everything in React is a component, and these usually take the form of JavaScript classes.

Starting with `React.Component`, the `render` method returns a description of what you want to see on the screen, returning a `React element`, which is a lightweight description of what to render.

### JSX

React developers use a syntax called `JSX` which makes these structures easier. For example, the ` <div />` syntax is transformed at build time to `React.createElement('div')`. You can put any JavaScript expressions within braces inside JSX!

#### Data

There are two types of data for React:

* state: private and can be changed from within the component itself.
* props: external, and not controlled by the component itself.

A component can change its internal state directly, but it can not change its props directly.


### OK, Just Show me React Already!

OK!

1. Install Node.js and Yarn.

```
$ brew install node
$ brew install yarn
```

2. Install [create-react-app](https://github.com/facebook/create-react-app). This awesome framework abstracts away all the complexity of implementing [Webpack](https://webpack.js.org/), [Babel](https://babeljs.io/), a dev server, a production build process, and other critical things.

3. Create Your App

```
$ yarn create react-app <your-app-name>
```

 4. Run it!

```
$ cd <your-app-name>
$ yarn start
```

5. You now have your app running at `http://localhost:3000/ `! The components of your app are the following:

* `node_modules`: holds all the third-party code, such as React.
* `public`: where our static assets go, like our favicon. It also keeps the project's HTML file. Because React is all JavaScript, you only really need the HTML file to update the head (like title and meta tags).
* `src` is where our application actually lives.

6. Go to `src` and edit `App.js` (and `App.css`) to add things you want React to render:

```
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
 render() {
 return (
 <div className="App">
 <header className="App-header">
 <img src={logo} className="App-logo" alt="logo" />
 <h1 className="App-title">Welcome to React</h1>
 </header>
 <p className="App-intro">
 HELLO THERE!
 <code>src/App.js</code> and save to reload.
 </p>
 </div>
 );
 }
}

export default App;
```

You will see the additions instantly updated in your browser at `http://localhost:3000/ `. Also, keep in mind that `index.js` is where all of your React code lives.



### Voilà! Dat's it? Yes, datzit! <3

## References to get Started

* [React Tutorial](https://reactjs.org/tutorial/tutorial.html).
* [30 Days of React](https://www.fullstackreact.com/30-days-of-react/).
* [The Road to Learn React](https://www.robinwieruch.de/the-road-to-learn-react/.)



