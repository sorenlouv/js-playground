const { createStore, applyMiddleware } = require('redux');

const asyncOperation = (action, cb) => {
  setTimeout(() => cb, 500);
};

const DEFAULT_STATE = {
  isLoading: false,
  counter: 0
};

const reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return Object.assign({}, state, { counter: state.counter + 1 });
    case 'DECREMENT':
      return Object.assign({}, state, { counter: state.counter - 1 });
    case 'ASYNC_INCREMENT':
      return Object.assign({}, state, {
        counter: state.counter + action.amount
      });
    case 'START_LOADING':
      return Object.assign({}, state, { isLoading: true });
    case 'STOP_LOADING':
      return Object.assign({}, state, { isLoading: false });
    default:
      return state;
  }
};

const middlewareA = store => next => action => {
  if (action.type !== 'ASYNC_INCREMENT') {
    return next(action);
  }

  store.dispatch({ type: 'START_LOADING' });
  asyncOperation(action.text, () => {
    const nextAction = Object.assign({}, action, { amount: 4 });

    next(nextAction);
    store.dispatch({ type: 'STOP_LOADING' });
  });
};

const middlewareB = store => next => action => {
  if (action.type !== 'toast') {
    return next(action);
  }
};

const store = createStore(reducer, applyMiddleware(middlewareA, middlewareB));

const render = () => {
  console.log(store.getState());
};

render();
store.subscribe(render);

store.dispatch({ type: 'ASYNC_INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
