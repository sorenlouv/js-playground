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

const a = store.dispatch({ type: 'INCREMENT' });
const b = store.dispatch({ type: 'INCREMENT' });
const c = store.dispatch({ type: 'DECREMENT' });
