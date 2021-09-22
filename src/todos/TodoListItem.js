import React from 'react';
import styled from 'styled-components';

// 8640000 == 1 day in miliseconds
// we want to display red border bottom if todo item is older than 5 days (8640000 * 5)
const TodoItemContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  border-bottom: ${props => (new Date(props.createdAt) > new Date(Date.now() - 8640000 * 5)
    ? 'none'
    : '2px solid red')};
  margin-top: 8px;
  padding: 16px;
  position: relative;
  box-shadow: 0 4px 8px grey;
`;

const ButtonsContainer = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
`;

const CompletedButton = styled.button`
  font-size: 16px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  display: inline-block;
  background-color: springgreen;
`;

const RemoveButton = styled.button`
  font-size: 16px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  display: inline-block;
  background-color: tomato;
  margin-left: 8px;
`;

const TodoListItem = ({ todo, onRemovePressed, onCompletedPressed }) => (
  <TodoItemContainer createdAt={todo.createdAt}>
    <h3>{todo.text}</h3>
    <p>Created at:&nbsp;
      {(new Date(todo.createdAt)).toLocaleDateString()}
    </p>
    <ButtonsContainer>
      {todo.isCompleted
        ? null
        : <CompletedButton
          onClick={() => onCompletedPressed(todo.id)}>
          Mark as Completed
        </CompletedButton>
      }
      <RemoveButton
        onClick={() => onRemovePressed(todo.id)}>
        Remove
      </RemoveButton>
    </ButtonsContainer>
  </TodoItemContainer>
)

export default TodoListItem;
