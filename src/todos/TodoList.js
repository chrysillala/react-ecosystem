import React, { useEffect } from 'react';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import { connect } from 'react-redux';
import { loadTodos, markTodoAsCompletedRequest, removeTodoRequest } from './thunks';
import { getTodosLoading, getCompletedTodos, getIncompleteTodos } from './selectors';
import styled from 'styled-components';

const ListWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`;

const TodoList = ({ completedTodos, incompleteTodos, onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos }) => {

  useEffect(() => {
    startLoadingTodos()
  }, []);

  const loadingMessage = <div>Loading...</div>
  const content = (
    <ListWrapper>
      <NewTodoForm />
      <h3>Incomplete Todos:</h3>
      {incompleteTodos.map(todo =>
        <TodoListItem
          key={todo.text}
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
        />)}
      <h3>Completed Todos:</h3>
      {completedTodos.map(todo =>
        <TodoListItem
          key={todo.text}
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
        />)}
    </ListWrapper>
  )

  return isLoading ? loadingMessage : content;
}

const mapStateToProps = state => ({
  completedTodos: getCompletedTodos(state),
  incompleteTodos: getIncompleteTodos(state),
  isLoading: getTodosLoading(state),
});

const mapDispatchToProps = dispatch => ({
  onRemovePressed: id => dispatch(removeTodoRequest(id)),
  onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
  startLoadingTodos: () => dispatch(loadTodos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
