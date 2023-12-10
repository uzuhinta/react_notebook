# A first look at React

## Why does the front-end framework exist?

- The rise of single page application: form SSR: all html + css are render at backend then ship to the browser and painted on screen, js is very simple like automation. Then JS is become larger until they became single page application, so they are basicly web pages that are render at client not on the server.

- There are many problem when build large application with vanilla javascript.

* FE application is all about: handling data and displaying data in user interface. User interface need to sync with data. This is so hard.

* Require lots of dom manipulation + traversing (imperative)

* Data (state) is usually stored in the dom, share across entire app

- Why?

* Front-end framework solve "data + UI are sync" problem and take hard work away from dev.

* They enforce a "correct" way of structuring and write code.

## React vs Vanilla JS

## What is React?

- React is (extremely popular, state-driven, component base, declarative ) js library for building UI (created by FB)

- Based component:

* Components are building block of UI in react.
* We build complex UI by building and combining multiple component.

- Declarative:

* We describe what the component look like and how they work using a declarative syntax called JSX.
* Declarative: tell React what the component look like base on current data/state.
* React is abstraction away from DOM: we never touch DOM
* JSX is a syntax combine HTML, CSS, JS as well as referencing other component.

- State driven:

* React reacts to state changes by re-rendering the UI

- JS library (not framework):

* Because React is only the "view" layer. We need to pick up multiple external library to build a complete app

`Imperative != Declarative: How to do things != What we want.`

# Working With Components, Props, and JSX

## Props vs State

- State is internal data that can be updated by component's logic. Data that a component can hold over time, necessary for information that it needs to remember throughout the app's lifecycle. "Component's memory". Updating component state triggers React to re-render the component.

- Props is data coming from outside, and can only by updated by the parent component.

Props are read-only, immutable. If you need to mutate props, you actually need state.

## JSX vs HTML

- className instead of class
- htmlFor instead of for
- every tag need to be closed. Ex: img, br
- all even handler and other properties need to be camelCase
- except: aria-_, data-_ like HTML
- CSS property also camelCase
- comment need to be inside curly brace.

# State, Events, and Forms Interactive Components

## The mechanics of state

Because react is declarative: we don't do direct DOM manipulations

So, how is a component view updated then?

In react, a view is updated by re-rendering the component. React calls the component function again. State is preserved throughout re-render.

## Practical guidelines

- Use a state variable for any data that the component should keep track ("remember") over time.

- Whenever you want something in the component to by dynamic, create a piece of state related to that things, and update the state when the things should change.

- If you want ot change the way a component looks, or the data it displays, update its state. This usually happens in an event handler function.

- When building a component, imagine its view as reflection of state changing over time.

- For data that should not trigger component re-render, don's use state. Use a regular variable instead.

# Thinking in React

## Types of state: local vs global state

| Local state                                                                                                                                                                | Global state                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| - State needed only by one or few component<br>- State that id defined in a component and only that component and child components have access to it (by passing via props | - State that many components might need <br>- Share state that is accessible to every component in the entire aplication. |

## Component categories

Most of your component will naturally fall into one of three categories:

- Stateless/presentational components:

* No state
* Can receive props and simply present received data or other content.

- Stateful components

* Has state
* Can still be reusable

- Structural components

* Pages, layout or screens of the app
* Result of composition
* Can be huge and non-reusable (but don't have to)

## Component composition:

Component composition: combining different components using the children prop (or explicitly defined props).

Why?

- Create highly reusable and flexible components
- Fix prop drilling (great for layouts).

## Pass element as props

Props as an API

# How React work behind the scenes

## Components, instances, and elements

- Component:

* description of a piece of UI
* A component is a function that return react element (element tree), usually written as JSX
* Blueprint or template

- Instance

* instances are created when use component
* actual "physical" manifestation of a component
* has its own state and props
* has a lifecycle (can born, live, die)

- React Element

* JSX is converted to React.createElement() function calls
* A react element is the result of these function call
* information necessary to create DOM elements.

- DOM element

* actual visual representation of the component instance in the browser

## How rendering work?

(): react
none: action
[]: browser

By updating state -> (1. render is triggered) -> react calls component functions and figures out how DOM should be updated -> (2.render phase) -> react actually wrote tp tje DOM, updating, inserting and deleting elements -> (3. commit phase) -> [browser paint]

- 1.  render is triggered. (React)

* Initial render of the application The render process is triggered for the entire application.
* State is update in one or more component instances (re-render). In practice, it looks like React only re-renders the component where the state update happens, but that's now how it works behind the scenes.
* renders are not triggered immediately, but scheduled for when the JS engine has some "free time". There is also batching or multiple setState calls in event handlers.

Note: in react, rendering is not updating the DOM or displaying elements on the screen. Rendering only happens internally inside React, it does not produce visual changes.

- 2.render phase (React)

* rendering a component will cause all of its child components to be rendered as well (no matter if props changed or not)

* component instances that trigger re-render -> react element -> new virtual dom -> reconciliation + diffing ((<- current fiber tree)) -> updated fiber tree -> list of DOM updates

Note: virtual dom: tree of all react element created from all instances in the component tree.

Reconciliation?

- Why not update the entire DOM whenever state changes somewhere int the app?

* That would be inefficient and wasteful: writing to the DOM is (relative0) slow; usually only a small part of the DOM needs to be update
* React reuses as much of the existing DOM as possible

-> Reconciliation: deciding which DOM elements actually need to be inserted, deleted, or updated, in order to reflect the latest state change.

Fiber tree:

- internal tree that has a "fiber" for each components instance and DOM element
- fibers are not re-created on every render
- perfect location for: current state, props, side effects, used hooks, queue of work to do
- work can be done asynchronously: rendering process can be split into chunks, tasks can be prioritized, and work can be paused, reused, or thrown away. Enable concurrent features like Suspense of transitions. Long renders won't block JS engine.

Diffing:

- uses 2 fundamental assumptions (rules)

* two elements of different types will produce different tree. (same position, diff element)
  . react assumes entire sub-tree is no longer valid
  . old components are destroyed and removed from DOM, include state
  . tree might be rebuild if children stayed the same (state is reset)
* elements with a stable key prop stay the same across renders. (same position, same element)
  . element will be kept (as well as child elements), including state
  . new props/attributes are passed if they changed between render
  . sometimes this is not what we want.. Then we can use the key props.
  --> this allows React to go from 1x10^9 (O(n^3)) to 1000 O(n) operation per 1000 elements

Note: key props is special prop that we use to tell the diffing algorithm that an element is unique. Allow react to distinguish between multiple instances of the same component type. When a key stays the same across renders, the element will be kept the DOM (even if the position in the tree changes). So we should use keys in list, use key to reset state

- 3. commit phase (ReactDOM)

* React writes to the DOM: insertion, deletions, and updates.
* Committing is synchronous: DOM is updated in one go, it can't be interrupted. This is necessary to that the DOM never show partial result, ensuring a consistent UI (in sync with state at all times)
* After the commit phase completes, the workInProgress fiber tree become the current tree for the next render cycle.

React does not touch the DOM. React only render. It does not know where the render result will go. React can be used on different platforms (hosts)

Commit phase may be ReactDOM, React native, remotion, ... !!!Terrible name! renderer doe not render, they commit the result of render phase.

## Rules for render logic pure components

The two types of logic in react components

- Render logic:

* code that lives at the top level of the component function
* participates in describing how the component view looks like
* executed every time the component renders

- Event handler functions

* executed as a consequence of the event that the handler is listening for
* code that actually does thing: update state, perform an HTTP request, read an input field, navigate to another page, ...

Side effect: dependency on or modification of any data outside the function scope. Interaction with the outside world. Ex: mutating external variable, HTTP request, writing to DOM, setTimmer... Side effects are not bat. A program can only be useful if it has some interaction with the outside world.

Pure function: a function does not has no side effects

- does not change any variable outside its scope
- give the same input, always return the same output.

Rule for render logic:

- component must be pure when it comes to render logic: give the same props, always return the same JSX
- render logic must produce no side effect: no interaction with the outside world:

* do not perform network request
* do not start timer
* do not directly use the DOM API
* do not mutate objects or variable outside of the function scope
* do not update state (or refs): this will create an infinite loop.

- side effect are allowed ( and encouraged )in event handler function . There is also a special hook to register side effects (useEffect)

## How event work?

Event propagation and delegation

- Capturing phase, target element, bubbling phase
- By default, event handler listen to events on the target and during the bubbling phase
- We can prevent bubbling with e.stopPropagation();
- Even delegation:

* handling events for multiple elements centrally in one single parent element.
* better for performance and memory as it needs only one handler function
* 1. Add handler to parent; 2) check for target element; 3) if target is one the element, handle the event
* very common is vanilla JS apps, but not su much in react apps. Why? Because sometime you fire some strange behavior related to event in your app

[img4]
[img5]

## Libraries vs Framework vs The React ecosystem

# Effects abd data fetching

## Component (instance) lifecycle

Mount/initial render

- component instance is rendered for the first time
- fresh state and props are created

Commit

Browser pain

Effect

---

Re-render (optional)

- state update
- props change
- parent re-render
- context changes

Commit

Layout effect

Browser pain

Effect

Cleanup

---

Un-mounted

- components is destroyed and removed
- state and props are destroyed

Cleanup

# Custom hook, refs, and more state

## React hook

Special built-in functions that allow us "hook" into React internals.

- Creating and access state from Fiber tree
- Registering side effects in Fiber tree
- Manual DOM selection
- ...

Always start with use

Enable easy reusing of non-visual logic; we can compose multiple hooks into our own custom hooks.

Give function

## Rule of hook

Only call hooks at the top level

- Do not call hooks inside conditional, loops, nested function, or after an early return
- Ensure that hooks are alway call in the same order

Only call hook from react function

- Only inside a function components or a custom hook

## Initialize state with a callback (lazy initialize state)

## Ref

"Box" object with a mutable .current property that is persisted across render (normal variables are always reset).

2 big use case

- creating a variable that stays the same between renders (previous state, setTimeout id, ...)
- Selecting and storing dom elements

refs are for data that is not rendered: usually only appear in even handlers or effects, not in JSX (otherwise use state)

Do not read write or read .current in render logic

State vs refs

- Both persists across renders;
- state updating cause re-render, refs does not.

[img6]

## Custom hooks

Why?

- Allow use to reuse non-visual logic in multiple components.
- One custom hook shoud have one purpose, to make it reusable and portable
- Rule of hooks apply to custom hooks too

# The Advanced useReducer Hook

## Why reducer

Why not useState

- when components have a lot of state variables and state updates, spread across many event handlers all over the component
- When multiple state updates, need to happen at the same time (as a reaction to the same event, like "starting a game")
- When updating one piece of state depends on one or multiple other pieces of state.

# React Router Building Single-Page Applications (SPA)

## What is routing

- With routing, we match different URLs to different UI views (react components): routes
- This enables users to navigate between different application screens, using the browser URL
- Keeps the UI in sync with the current browser URL

## Styling options

[img7]

# Advanced State Management The Context API

A solution to props drilling alongside component composition

## What is the context api

- System to pass data throughout the app without manually passing props down the tree
- Allows us to broadcast gloval state to the entire app

* Provider: gives all child component access to value
* value: data that we want to make available (usually state and function)
* consumers: all components that read the provided context value.

- value is updated -> all consumers re-render.

Process:

- create context
- provide value
- consume context

## A custom provider and hooks

## Thinking in react state management

What is state management?
= When to use state;

- Types of state: local vs.global

* types of state: UI vs. remote
* where to place each piece of state
* tools to manage all types of state

Type of state

[img8]
[img9]
[img10]

# Performance Optimization and Advanced useEffect

## Performance optimization tools

1. Prevent wasted renders
- memo
- useMemo
- useCallback
- Passing elements as children or regular prop
2. Improve app speed / responsiveness
- useMemo
- useCallback
- useTransition
3. Reduce bundle size
- using fewer 3rd-party packages
- code splitting and lazy loading

## When does a component instance re-render

State change

Context change

Parent component instance re-render: "Create the false impression that changing props re-renders a component. This is not true"

- Remember: a render does not mean that the DOM actually gets updated, it just means the component function gets called. But this can be an expensive operation.

- Wasted render: a render that din't produce any change in the dom. Only a problem when they happen too frequently or when the component is very slow.

## Surprising optimization trick with children

Ref: https://www.developerway.com/posts/react-elements-children-parents#part1

Why children not re-render

## memo

Memoization: optimization technique that executes a pure function once, and saves the result in memory. If we try to execute the function again with the same arguments as before, the previous saved result will be returned without executing the function amain.

+ Memoization components with memo
+ Memoization objects with useMemo
+ Memoization functions with useCallback

Only makes sense when the component is heavy (slow rendering), re-render often, and does so with the same props

## Optimizing Bundle Size With Code Splitting

lazy + Suspend

# Redux and Modern Redux toolkit

## What?

- 3rd-party library to mana global state
- Standalone library, but easy to integrate with React apps using react-redux lib
- all global state is stored in one globally accessible store, which is easy to update using "actions"

Store 
- no asynchronous operation
- reducers need to be pure functions

[img11]

# Pizza app

## application planning

1. Gather application requirements and features
- Highlight keyword
2. Divide the application into pages
- Think about the overall and page-level UI
- Break the desired UI into components
- Design and build a static version (no state yet)

3. Divide the application into feature categories
- Think about state management + data flow

4. Decide on what libraries to use (technology decision)

[img12]
[img13]

## Fetch as you render vs. render as you fetch

# Tailwind

a utility-first CSS framework packed with utility classes like flex, text-center and rotate-90 that can be composed to build any design, directly in your markup

utility-first CSS approach: writing tiny classes with one single purpose, and then combining them to build entire layouts.

Pro: 

- you don't need to think about class names
- no jumping between file to write markup and styles.
- immediately understand styling in any project that uses tailwind
- a design system
- save a lot of time, e.g. on responsive design
- docs and vs code extension are great

Cons:

- markup looks very unreadable
- a lot of class name
- install and setup tailwind on each new project
- you're giving up on vanilla css

# The oasis

A small boutique hotel with 8 luxurious wooden cabins

They need a custom-build application to manage everything about the hotel: bookings, cabins, and guests.

This is the internal application used inside the hotel to check in guest as they arrive

## Planning

1. gather application requirements and features
[img14]
[img15]
2. divide the application into pages
3. divide the application tinto feature categories
[img16]
4. divide on what libraries to use

## Supabase

Definition: 
- service that allows developers to easily crate a back-end with a postgres database
- automatically create a database and API so we can easily request and receive data from the server
- no backend-developer needed
- perfect to get up and running quickly
- no just an API; it also comes with easy to use user authentication and file storage

# React query

## What

Powerful library for managing remote (state)

Many feature that allow use to write a lot less code, while also making the UX a lot better
+ Data is stored in a cache
+ Automatic loading and error states
+ Automatic re-fetching to keep state synced
+ Pre-fetching
+ Easy remote state mutation (updating)
+ Offline support 

Needed because remote state is fundamentally different from regular state

# Advanced React Patterns

## An overview of reusability 

We need to reuse: 

- UI: component and props
- Stateful logic: custom hook

=> if combine 2: render props pattern for complete control over what the component render, by passing a function that tell the component what to render. Was more common before hook, but now it also useful

=> compound component pattern: in that context, there will be multiple component that play together to create one big component. 

#

- Pre-fetching