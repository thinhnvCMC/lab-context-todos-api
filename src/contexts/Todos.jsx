import React, { useReducer, createContext } from 'react'
import PropTypes from 'prop-types'
import produce from 'immer'
import axios from 'axios'

const actions = {
  setTodos: (payload) => ({ type: 'setTodos', payload }),
  unsetTodos: () => ({ type: 'unsetTodos' }),
  setTodo: (payload) => ({ type: 'setTodo', payload }),
  unsetTodo: () => ({ type: 'unsetTodo' }),
  addTodoItem: (payload) => ({ type: 'addTodoItem', payload }),
  updateTodoItem: (payload) => ({ type: 'updateTodoItem', payload }),
  deleteTodoItem: (payload) => ({ type: 'deleteTodoItem', payload })
}

const api = (dispatch) => ({
  getTodos: (params = {}) => {
    axios({
      method: 'GET',
      url: 'https://fswdi-api-todos.herokuapp.com/api/todos',
      params
    }).then((resp) => {
      dispatch(actions.setTodos(resp.data))
    })
  },
  resetTodos: () => {
    dispatch(actions.unsetTodos())
  },
  createTodo: (values) => new Promise((resolve, reject) => axios({
    method: 'POST',
    url: 'https://fswdi-api-todos.herokuapp.com/api/todos',
    data: values
  })
    .then((resp) => {
      resolve(resp)
    })
    .catch((err) => {
      reject(err)
    })),
  updateTodo: (TodoId, values) => new Promise((resolve, reject) => axios({
    method: 'PUT',
    url: `https://fswdi-api-todos.herokuapp.com/api/todos/${TodoId}`,
    data: values
  })
    .then((resp) => {
      dispatch(actions.setTodo(resp.data))
      resolve(resp)
    })
    .catch((err) => {
      dispatch(actions.setTodo({ todo: null }))
      reject(err)
    })),
  getTodo: (TodoId) => {
    axios({
      method: 'GET',
      url: `https://fswdi-api-todos.herokuapp.com/api/todos/${TodoId}`
    })
      .then((resp) => {
        dispatch(actions.setTodo(resp.data))
      })
      .catch(() => {
        dispatch(actions.setTodo({ todo: null }))
      })
  },
  resetTodo: () => {
    dispatch(actions.unsetTodo())
  },
  deleteTodo: (TodoId) => new Promise((resolve, reject) => axios({
    method: 'DELETE',
    url: `https://fswdi-api-todos.herokuapp.com/api/todos/${TodoId}`
  })
    .then((resp) => {
      resolve(resp)
    })
    .catch((err) => {
      reject(err)
    }))
})

const todoItemAPI = (dispatch) => ({
  createTodoItem: (todoID, values) => new Promise((resolve, reject) => axios({
    method: 'POST',
    url: `https://fswdi-api-todos.herokuapp.com/api/todos/${todoID}/todo-items`,
    data: values
  })
    .then((resp) => {
      dispatch(actions.addTodoItem(resp.data))
      resolve(resp)
    })
    .catch((err) => {
      dispatch(actions.addTodoItem({ todoItem: null }))
      reject(err)
    })),
  updateTodoItem: (todoId, todoItemId, values) => new Promise((resolve, reject) => axios({
    method: 'PUT',
    url: `https://fswdi-api-todos.herokuapp.com/api/todos/${todoId}/todo-items/${todoItemId}`,
    data: values
  })
    .then((resp) => {
      dispatch(actions.updateTodoItem(resp.data))
      resolve(resp)
    })
    .catch((err) => {
      dispatch(actions.updateTodoItem({ todoItem: null }))
      reject(err)
    })),
  deleteTodoItem: (todoId, todoItemId) => new Promise((resolve, reject) => axios({
    method: 'DELETE',
    url: `https://fswdi-api-todos.herokuapp.com/api/todos/${todoId}/todo-items/${todoItemId}`
  })
    .then((resp) => {
      dispatch(actions.deleteTodoItem({ todoItemId }))
      resolve(resp)
    })
    .catch((err) => {
      reject(err)
    }))
})

const initialState = {
  meta: null,
  index: undefined,
  show: undefined
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'setTodos': {
      return produce(state, (draft) => {
        draft.meta = action.payload.meta
        draft.index = action.payload.todos
      })
    }
    case 'unsetTodos': {
      return produce(state, (draft) => {
        draft.meta = null
        draft.index = undefined
      })
    }
    case 'setTodo': {
      return produce(state, (draft) => {
        draft.show = action.payload
      })
    }
    case 'unsetTodo': {
      return produce(state, (draft) => {
        draft.show = undefined
      })
    }
    case 'addTodoItem': {
      return produce(state, (draft) => {
        draft.show.todo.TodoItems.push(action.payload.todoItem)
      })
    }
    case 'updateTodoItem': {
      return produce(state, (draft) => {
        const foundIndex = draft.show.todo.TodoItems.findIndex(
          (item) => item.id === action.payload.todoItem.id
        )

        if (foundIndex !== -1) {
          draft.show.todo.TodoItems[foundIndex] = action.payload.todoItem
        }
      })
    }

    case 'deleteTodoItem': {
      return produce(state, (draft) => {
        const foundIndex = draft.show.todo.TodoItems.findIndex(
          (item) => item.id === action.payload.todoItemId
        )

        if (foundIndex !== -1) {
          draft.show.todo.TodoItems.splice(foundIndex, 1)
        }
      })
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const TodosContext = createContext()
const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, initialState)
  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  )
}
TodosProvider.propTypes = {
  children: PropTypes.element.isRequired
}

export { TodosProvider, api, todoItemAPI }
export default TodosContext
