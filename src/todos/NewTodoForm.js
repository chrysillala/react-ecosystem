import React, { useState } from 'react';
import { connect } from 'react-redux';
import './NewTodoForm.css';
import { getTodos } from './selectors';
import { addTodoRequest } from './thunks';

const NewTodoForm = ({ todos, onCreatePressed }) => {
  const [inputValue, setInputValue] = useState('');
  return (
    <div className="new-todo-form">
      <input className="new-todo-input"
        placeholder="Type your new todo"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        type="text" />
      <button
        onClick={() => {
          const isDupllicateText =
            todos.some(todo => todo.text === inputValue);
          if (!isDupllicateText) {
            onCreatePressed(inputValue);
            setInputValue('');
          }
        }}
        className="new-todo-button">
        Create Todo
      </button>
    </div>
  )
}

//
const mapStateToProps = state => ({
  todos: getTodos(state),
})

const mapDispatchToProps = dispatch => ({
  onCreatePressed: text => dispatch(addTodoRequest(text)),
})

// exported connected component
export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);
