const { createStore, applyMiddleware } = require('redux');

const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

const middlewareA = store => next => action => {
  return next(action);
};

const middlewareB = store => next => action => {
  next(action);
  return 'be';
};

const store = createStore(reducer, applyMiddleware(middlewareA, middlewareB));

const render = () => {
  console.log(store.getState());
};

render();
store.subscribe(render);

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
