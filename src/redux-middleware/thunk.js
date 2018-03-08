const { createStore, applyMiddleware } = require('redux');
const thunkMiddleware = require('redux-thunk').default;

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

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

const render = () => {
  console.log(store.getState());
};

render();
store.subscribe(render);

store.dispatch(makeAsyncIncrement()).then(() => {
  console.log('done with async!');
});

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });

function makeAsyncIncrement() {
  return dispatch =>
    getDelayedPromise(800).then(() => {
      dispatch({ type: 'INCREMENT' });
    });
}

function getDelayedPromise(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}
