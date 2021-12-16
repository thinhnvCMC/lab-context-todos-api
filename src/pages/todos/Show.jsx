import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import TodosContext, { api, todoItemAPI } from '@/contexts/Todos'

import Loading from '@/components/Loading'
import ModalsTodo from '@/modals/todos/Todo'
import ModalsTodoItem from '@/modals/todos/TodoItems'

class PagesTodosShow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showModalsTodosCreate: false,
      showModalsTodoItemCreate: false,
      showModalsTodoItemEdit: false,
      todoItemId: null,
      currentData: null,
      showModalsTodoEdit: false
    }
    this.openModalsTodosCreate = this.openModalsTodosCreate.bind(this)
    this.handleCreateSubmit = this.handleCreateSubmit.bind(this)
    this.closeModalsTodosCreate = this.closeModalsTodosCreate.bind(this)
    this.handleCreateTodoItems = this.handleCreateTodoItems.bind(this)
    this.handleEditTodoItems = this.handleEditTodoItems.bind(this)
    this.handleDeleteTodoItem = this.handleDeleteTodoItem.bind(this)
    this.handleToggleTodoItem = this.handleToggleTodoItem.bind(this)

    this.openModalsTodoItemCreate = this.openModalsTodoItemCreate.bind(this)
    this.closeModalsTodoItemCreate = this.closeModalsTodoItemCreate.bind(this)
    this.openModalsTodoItemEdit = this.openModalsTodoItemEdit.bind(this)
    this.closeModalsTodoItemEdit = this.closeModalsTodoItemEdit.bind(this)

    this.handleEditTodo = this.handleEditTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)

    this.openModalsTodo = this.openModalsTodo.bind(this)
    this.closeModalsTodo = this.closeModalsTodo.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const { getTodo } = api(this.context.dispatch)
    getTodo(id)
  }

  componentWillUnmount() {
    const { resetTodo } = api(this.context.dispatch)
    resetTodo()
  }

  // *  Todo Item handler
  handleCreateTodoItems(values) {
    const { id } = this.props.match.params
    const { createTodoItem } = todoItemAPI(this.context.dispatch)
    createTodoItem(id, values.TodoItems[0])
      .then(() => {
        this.setState({ showModalsTodoItemCreate: false })
      })
      .catch((err) => {
        alert(err)
      })
  }

  handleCreateSubmit(values) {
    console.log('values', this)
    const { createTodo } = api(this.context.dispatch)
    createTodo(values).then((resp) => {
      console.log('resp', resp)
      const {
        history: { replace }
      } = this.props
      replace(`/todos/${resp.data.todo.id}`)
      window.location.reload()
    }).catch((err) => {
      alert(err)
    })
  }

  handleEditTodoItems(todoItemId, values) {
    const { id } = this.props.match.params
    const { updateTodoItem } = todoItemAPI(this.context.dispatch)
    updateTodoItem(id, todoItemId, values.TodoItems[0])
      .then(() => {
        this.setState({ showModalsTodoItemEdit: false })
      })
      .catch((err) => {
        alert(err)
      })
  }

  handleToggleTodoItem(item) {
    const { updateTodoItem } = todoItemAPI(this.context.dispatch)
    updateTodoItem(item.TodoId, item.id, {
      name: item.name,
      checked: !item.checked
    })
      .then(() => {
        // todo: handle toggle
      })
      .catch((err) => {
        alert(err)
      })
  }

  handleDeleteTodoItem(item) {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      const { id } = this.props.match.params
      const { deleteTodoItem } = todoItemAPI(this.context.dispatch)
      deleteTodoItem(id, item.id)
        .then(() => {
          // todo: handle delete
        })
        .catch((err) => {
          alert(err)
        })
    }
  }

  // * Todo handler
  handleEditTodo(values) {
    const { id } = this.props.match.params
    const { show } = this.context.todos
    const { updateTodo } = api(this.context.dispatch)
    updateTodo(id, { ...values, TodoItems: show.todo.TodoItems })
      .then(() => {
        this.setState({ showModalsTodoEdit: false })
      })
      .catch((err) => {
        alert(err)
      })
  }

  deleteTodo() {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      const { id } = this.props.match.params
      const { deleteTodo } = api(this.context.dispatch)
      deleteTodo(id)
        .then(() => {
          const { history } = this.props
          history.replace('/todos')
        })
        .catch((err) => {
          alert(err)
        })
    }
  }

  // * Todo Items modals
  openModalsTodoItemCreate() {
    this.setState({ showModalsTodoItemCreate: true })
  }

  closeModalsTodoItemCreate() {
    this.setState({ showModalsTodoItemCreate: false })
  }

  openModalsTodoItemEdit(item) {
    this.setState({
      showModalsTodoItemEdit: true,
      todoItemId: item.id,
      currentData: {
        TodoItems: [
          {
            name: item.name,
            checked: item.checked
          }
        ]
      }
    })
  }

  closeModalsTodosCreate() {
    this.setState({ showModalsTodosCreate: false })
  }

  openModalsTodosCreate() {
    this.setState({ showModalsTodosCreate: true })
  }

  closeModalsTodoItemEdit() {
    this.setState({ showModalsTodoItemEdit: false, todoItemId: null })
  }

  // * Todo modals
  openModalsTodo(data) {
    this.setState({ showModalsTodoEdit: true, currentData: data })
  }

  closeModalsTodo() {
    this.setState({ showModalsTodoEdit: false })
  }

  renderShow() {
    const { show } = this.context.todos

    if (show === undefined) return <Loading />
    if (show === null) return <h2>Not Found</h2>
    const todoItemArray = [...show.todo.TodoItems]
    return (
      <>
        {/* // * todo buttons */}
        <button className="btn btn-success mb-3" type="button" onClick={this.openModalsTodosCreate}>
          New
        </button>
        <button
          className="btn btn-primary mb-3 ml-3"
          type="button"
          onClick={() => {
            this.openModalsTodo({ title: show.todo.title })
          }}
        >
          Edit Todo
        </button>
        <button
          className="btn btn-danger mb-3 ml-3"
          type="button"
          onClick={this.deleteTodo}
        >
          Delete Todo
        </button>
        {/* // * todo items buttons */}
        <h2 className="my-3">
          Title: {show.todo.title} | ID: {show.todo.id}
        </h2>
        <button
          className="btn btn-success mb-3"
          type="button"
          onClick={this.openModalsTodoItemCreate}
        >
          Add Todo Items
        </button>
        <div className="list-group">
          {todoItemArray
            .sort((a, b) => b.id - a.id)
            .map((item) => (
              <div
                key={item.id}
                className={`list-group-item list-group-item-action ${
                  item.checked ? 'text-decoration-through' : ''
                }`}
              >
                <p>
                  Name: {item.name} | ID: {item.id}
                </p>
                <button
                  className="btn btn-success mb-3"
                  type="button"
                  onClick={() => {
                    this.handleToggleTodoItem(item)
                  }}
                >
                  Toggle Todo Items
                </button>
                <button
                  className="btn btn-primary mb-3 ml-3"
                  type="button"
                  onClick={() => {
                    this.openModalsTodoItemEdit(item)
                  }}
                >
                  Edit Todo Items
                </button>
                <button
                  className="btn btn-danger mb-3 ml-3"
                  type="button"
                  onClick={() => {
                    this.handleDeleteTodoItem(item)
                  }}
                >
                  Delete Todo Items
                </button>
              </div>
            ))}
        </div>
      </>
    )
  }

  render() {
    const {
      showModalsTodoItemCreate,
      showModalsTodoItemEdit,
      showModalsTodoEdit,
      todoItemId,
      currentData,
      showModalsTodosCreate
    } = this.state
    return (
      <div id="pages-todos-show" className="container">
        <header className="text-center border-bottom">
          <h1>Todo Show Page</h1>
          <div>
            <Link to="/">Home Page</Link>
            <span> | </span>
            <Link to="/todos">Todos Page</Link>
          </div>
        </header>
        <main className="text-center mt-3">
          {this.renderShow()}
          {showModalsTodoItemCreate && (
            <ModalsTodoItem
              close={this.closeModalsTodoItemCreate}
              onSubmit={this.handleCreateTodoItems}
              title="Create Todo Item"
            />
          )}
          {showModalsTodoItemEdit && (
            <ModalsTodoItem
              close={this.closeModalsTodoItemEdit}
              onSubmit={(values) => {
                this.handleEditTodoItems(todoItemId, values)
              }}
              title="Edit Todo Item"
              initialValues={
                currentData || {
                  TodoItems: [
                    {
                      name: '',
                      checked: false
                    }
                  ]
                }
              }
            />
          )}
          {showModalsTodoEdit && (
            <ModalsTodo
              close={this.closeModalsTodo}
              onSubmit={this.handleEditTodo}
              title="Edit Todo"
              initialValues={
                currentData || {
                  title: ''
                }
              }
            />
          )}
          {showModalsTodosCreate && (
          <ModalsTodo
            close={this.closeModalsTodosCreate}
            onSubmit={this.handleCreateSubmit}
            title="Create Todo"
          />
          )}
        </main>
      </div>
    )
  }
}

PagesTodosShow.contextType = TodosContext
PagesTodosShow.propTypes = {
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired
}

export default PagesTodosShow
