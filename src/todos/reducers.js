import { CREATE_TODO, REMOVE_TODO } from './actions';

export const todos = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TODO: {
      const { text } = payload;
      const newTodo = {
        text,
        isCompleted: false
      }

      return state.concat(newTodo);
    }

    case REMOVE_TODO: {
      const { text } = payload;
      return state.filter(todo => todo.text !== text);
    }

    // remember to return the unchanged state if our reducer doesn't make any changes
    // since otherwise it'll look like our reducer is returning undefined
    // and it will throw an error
    default:
      return state;
  }
}