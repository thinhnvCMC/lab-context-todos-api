import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import TodosContext, { api } from '@/contexts/Todos'
import ModalsTodo from '@/modals/todos/Todo'
import Loading from '@/components/Loading'

class PagesTodosIndex extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showModalsTodosCreate: false
    }

    this.handleCreateSubmit = this.handleCreateSubmit.bind(this)
    this.openModalsTodosCreate = this.openModalsTodosCreate.bind(this)
    this.closeModalsTodosCreate = this.closeModalsTodosCreate.bind(this)
    this.onChangePagination = this.onChangePagination.bind(this)
  }

  componentDidMount() {
    const { getTodos } = api(this.context.dispatch)
    getTodos()
  }

  componentWillUnmount() {
    const { resetTodos } = api(this.context.dispatch)
    resetTodos()
  }

  handleCreateSubmit(values) {
    const { createTodo } = api(this.context.dispatch)
    createTodo(values).then((resp) => {
      const {
        history: { replace }
      } = this.props
      replace(`/todos/${resp.data.todo.id}`)
    }).catch((err) => {
      alert(err)
    })
  }

  onChangePagination(event) {
    const { getTodos } = api(this.context.dispatch)
    getTodos({ page: event.target.value })
  }

  openModalsTodosCreate() {
    this.setState({ showModalsTodosCreate: true })
  }

  closeModalsTodosCreate() {
    this.setState({ showModalsTodosCreate: false })
  }

  renderIndex() {
    const { index: todos, meta } = this.context.todos

    if (todos === undefined) return <Loading />
    if (todos.length === 0) return <h2>No Todos</h2>
    return (
      <div className="list-group">
        {todos.map((item) => (
          <Link
            key={item.id}
            to={`/todos/${item.id}`}
            className="list-group-item list-group-item-action"
          >
            {item.title}
          </Link>
        ))}

        <div>
          <span>Pagination: </span>
          <select
            name="pagination"
            id="pagination"
            onChange={this.onChangePagination}
          >
            {[...Array(meta.totalPages).keys()].map((item, index) => (
              <option
                key={item}
                value={index + 1}
                defaultValue={meta.currentPage === index + 1}
              >
                {index + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  }

  render() {
    const { showModalsTodosCreate } = this.state

    return (
      <div id="pages-todos-index" className="container">
        <header className="text-center border-bottom">
          <h1>Todos Index Page</h1>
          <div>
            <Link to="/">Home Page</Link>
          </div>
        </header>
        <main className="text-center mt-3">
          <button
            className="btn btn-success mb-3"
            type="button"
            onClick={this.openModalsTodosCreate}
          >
            New
          </button>
          {this.renderIndex()}
        </main>

        {showModalsTodosCreate && (
          <ModalsTodo
            close={this.closeModalsTodosCreate}
            onSubmit={this.handleCreateSubmit}
            title="Create Todo"
          />
        )}
      </div>
    )
  }
}

PagesTodosIndex.contextType = TodosContext
PagesTodosIndex.propTypes = {
  history: PropTypes.shape().isRequired
}

export default PagesTodosIndex
