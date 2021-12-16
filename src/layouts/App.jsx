import React from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'

import { TodosProvider } from '@/contexts/Todos'

import PagesHome from '@/pages/Home'
import PagesTodosIndex from '@/pages/todos/Index'
import PagesTodosShow from '@/pages/todos/Show'

import PagesNotFound from '@/pages/NotFound'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={PagesHome} />

      <Route path="/todos">
        <TodosProvider>
          <>
            <Route exact path="/todos" component={PagesTodosIndex} />
            <Route exact path="/todos/:id" component={PagesTodosShow} />
          </>
        </TodosProvider>
      </Route>

      <Route component={PagesNotFound} />
    </Switch>
  </Router>
)

export default App
