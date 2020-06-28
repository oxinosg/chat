# Client Structure

 - core: configuration files for the 3rd party libs (apollo client, etc)
 - components: react components. each component is structred as: components/index/styles
 - pages: represents application pages. each page is independent from each other and is structed like a component. (also includes routes)
 - store: state managment related files:
   - redux: actions/reducers/selectors/effects/types
   - apollo: containers/selectors
 - services: api calls, graphql queries/mutations
 - utils
 - constants
 - contect: hocs and context api
 - hooks
