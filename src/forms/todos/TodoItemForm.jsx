import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik'
import * as yup from 'yup'

const RenderTodoItems = ({ form: { values, errors, touched } }) => (
  <ul className="list-group mb-3">
    {values.TodoItems.length > 0
      && values.TodoItems.map((item, index) => {
        const key = `item-${index}`
        const itemErrors = (errors.TodoItems && errors.TodoItems[index]) || {}
        const itemTouched = (touched.TodoItems && touched.TodoItems[index]) || {}

        return (
          <li className="list-group-item" key={key}>
            <div className="position-relative">
              <h6 className="text-center">Item {index + 1}</h6>

              <div className="form-group">
                <label htmlFor={`TodoItems.${index}.name`}>Name</label>
                <Field
                  id={`TodoItems.${index}.name`}
                  className={`form-control ${
                    itemErrors.name && itemTouched.name ? ' is-invalid' : ''
                  }`}
                  name={`TodoItems.${index}.name`}
                  type="text"
                />
                <ErrorMessage
                  component="div"
                  className="invalid-feedback"
                  name={`TodoItems.${index}.name`}
                />
              </div>

              <div className="form-group custom-control custom-checkbox">
                <Field
                  id={`TodoItems.${index}.checked`}
                  className="custom-control-input"
                  name={`TodoItems.${index}.checked`}
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor={`TodoItems.${index}.checked`}
                >
                  Completed
                </label>
                <ErrorMessage
                  component="div"
                  className="invalid-feedback"
                  name={`TodoItems.${index}.checked`}
                />
              </div>
            </div>
          </li>
        )
      })}
  </ul>
)
RenderTodoItems.propTypes = {
  form: PropTypes.shape({
    values: PropTypes.shape().isRequired,
    errors: PropTypes.shape().isRequired,
    touched: PropTypes.shape().isRequired
  }).isRequired
}

const RenderForm = ({ isSubmitting }) => (
  <Form>
    <FieldArray
      name="TodoItems"
      render={(formikProps) => <RenderTodoItems {...formikProps} />}
    />

    <button className="btn btn-success" type="submit" disabled={isSubmitting}>
      Submit
    </button>
  </Form>
)
RenderForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired
}

const todoChangeSchema = yup.object().shape({
  TodoItems: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Required'),
      checked: yup.boolean().required('Required')
    })
  )
})

const FormsTodoItem = ({ initialValues, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={todoChangeSchema}
    onSubmit={onSubmit}
  >
    {(props) => <RenderForm {...props} />}
  </Formik>
)
FormsTodoItem.propTypes = {
  initialValues: PropTypes.shape().isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default FormsTodoItem
