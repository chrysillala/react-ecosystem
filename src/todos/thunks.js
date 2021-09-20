import { loadTodoInProgress, loadTodoSuccess, loadTodoFailure } from './actions';

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

export const displayAlert = text => () => {
  alert(text);
}