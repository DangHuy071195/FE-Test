import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Todo from './todo/pages/Todo'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Todo} />
      </Switch>
    </Router>
  )
}

export default App
