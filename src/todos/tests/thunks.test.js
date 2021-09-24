import 'node-fetch';
import fetchMock from 'fetch-mock';
import { expect } from 'chai';
import sinon from 'sinon';
import { loadTodos } from '../thunks';

describe('The loadTodos thunk', () => {
  it('dispatches the correct actions in the success scenario', async () => {
    // create a fake function that keeps track of which arguments it was called with
    // here we create fake dispatch function using sinon
    const fakeDispatch = sinon.spy();

    // define what our fake fetch to return when our thunk scalls it
    const fakeTodos = [
      { text: '1' },
      { text: '2' },
    ];
    // when our thunk tries to use fetch to send GET request to this URL
    // it will just get back the fake todos that we defined
    // instead of sending actual request
    fetchMock.get('http://localhost:8080/todos', fakeTodos);

    // define what we want the actions that our fakeDispatch gets called with to look like
    const expectedFirstAction = { type: 'LOAD_TODOS_IN_PROGRESS' };
    const expectedSecondAction = {
      type: 'LOAD_TODOS_SUCCESS',
      payload: {
        todos: fakeTodos,
      }
    };

    await loadTodos()(fakeDispatch);

    expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFirstAction);
    expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(expectedSecondAction);

    fetchMock.reset();
  });
});
