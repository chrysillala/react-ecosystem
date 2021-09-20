import {
  CREATE_TODO,
  MARK_TODO_AS_COMPLETED,
  REMOVE_TODO,
  LOAD_TODOS_IN_PROGRESS,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE
} from './actions';

export const isLoading = (state = false, action) => {
  // keep tracks of whether or not our todos are loading
  const { type } = action;

  switch (type) {
    case LOAD_TODOS_IN_PROGRESS:
      return true;
    case LOAD_TODOS_SUCCESS:
    case LOAD_TODOS_FAILURE:
      return false;
    default:
      return state;
  }
}

export const todos = (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_TODO: {
      const { todo } = payload;
      return state.concat(todo);
    }

    case REMOVE_TODO: {
      const { text } = payload;
      return state.filter(todo => todo.text !== text);
    }

    case MARK_TODO_AS_COMPLETED: {
      const { text } = payload;
      return state.map(todo => {
        if (todo.text === text) {
          return { ...todo, isCompleted: true }
        }
        return todo;
      });
    }

    case LOAD_TODOS_SUCCESS: {
      // update todos state with the todos data from payload
      const { todos } = payload;
      return todos;
    }

    // remember to return the unchanged state if our reducer doesn't make any changes
    // since otherwise it'll look like our reducer is returning undefined
    // and it will throw an error
    case LOAD_TODOS_IN_PROGRESS:
    case LOAD_TODOS_FAILURE:
    default:
      return state;
  }
}