# Client Structure

 - core: configuration files for the 3rd party libs (apollo client, etc)
 - components: react components. each component is structred as: components/index/styles
 - pages: represents application pages. each page is independent from each other and is structed like a component. (also includes routes)
 - store: state managment related files:
   - redux: 
     - actions
     - reducers
     - middleware
     - effects
     - selectors
     - types
   - apollo: 
     - containers
     - selectors
 - services: api calls, graphql queries/mutations
 - utils
 - constants
 - context: hocs and context api
 - hooks
 
## TODO:
 - [x] redux socket.io middleware
 - [ ] replace react-quill with draft.js

To test state managment for:
 - redux + rest
 - apollo client 
 - redux + graphql-request

To test for shared components:
 - https://tailwindcss.com/
 - https://csslayout.io/patterns/
 - https://tablericons.com/
 - https://mertjf.github.io/
 - https://www.fast.design/
