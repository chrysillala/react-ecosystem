import { loadTodoInProgress, loadTodoSuccess, loadTodoFailure, createTodo } from './actions';

export const loadTodos = () => async (dispatch, getState) => {
  // when loadTodos thunk is triggered, we want to dispatch loadTodoInProgress action

  try {
    dispatch(loadTodoInProgress());
    const response = await fetch('http://localhost:8080/todos');
    const todos = await response.json();

    dispatch(loadTodoSuccess(todos));

  } catch (error) {
    dispatch(loadTodoFailure());
    dispatch(displayAlert(error));
  }
}

export const addTodoRequest = (text) => async dispatch => {
  try {
    const body = JSON.stringify({ text });
    const response = await fetch('http://localhost:8080/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    });
    const todo = await response.json();
    dispatch(createTodo(todo));

  } catch (error) {
    dispatch(displayAlert(error));
  }

}

export const displayAlert = text => () => {
  alert(text);
}