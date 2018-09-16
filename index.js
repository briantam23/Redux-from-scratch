// command is called action
// also, if someone invokes the reducer without a previousState, this will give us our initial state back!
function toyCarReducer (previousState = { y: 0, x: 0}, action) {
  
    const newState = Object.assign({}, previousState);
  
    // we often use switch instead of if...else - many find it easier to read, because there are fewer curly braces
    switch (action.type) { // actions always have a property called type, which contains the name of the action
      case "FORWARD":
        newState.y += 1;
        break;
      case "BACK":
        newState.y -= 1;
        break;
      case "LEFT":
        newState.x -= 1;
        break;
      case "RIGHT":
        newState.y += 1;
        break;
  
      return newState;
    }
  }

  const reducer = toyCarReducer;
  
  const initialToyCarState = reducer(undefined, {});
  console.log(initialToyCarState) // { y: 0, x: 0 }
  const state1 = reducer(initialState, { type: "FORWARD" });
  console.log(state1); // { y: 1, x: 0}
  const state2 = reducer(state1, { type: "RIGHT" });
  console.log(state2); // { y: 1, x: 1 }

function createStore (reducer) {
    let currentState = reducer(undefined, {});
    let listeners = []; // set aside a listeners array that we have access to via closure

    // our constructor function
    function Store() {}
    // our .prototype methods
    Store.prototype.getState = function () {
        return currentState;
    };
    Store.prototype.dispatch = function (action) {
        currentState = reducer(currentState, action); // invoking store.dispatch "resets" our currentState to be the result of invoking the reducer!
        listeners.forEach(callback => callback());
    };
    Store.prototype.subscribe = function (callback) { // store.subscribe takes a callback...and pushes it in the listeners array
        listeners.push(callback);
        // store.subscribe now returns a function
        return function () {
          // all this function does is remove the callback we passed in from the listeners array!
          listeners = listeners.filter(cb => cb !== callback);
        }
    };

    return new Store();
}

const store = createStore(toyCarReducer);

// we "subscribe" a callback function, AND store the function we get back in a variable called "unsubscribe"
const unsubscribe = store.subscribe(() => console.log('Hey, the state changed to be: ', store.getState()));

store.dispatch({ type: "FORWARD" }); // we would see "Hey, the state changed to be: { y: 1, x: 0 }" logged to the console

unsubscribe(); // invoking the function we stored in "unsubscribe" remove the subscription!

store.dispatch({ type: "FORWARD" }); // nothing logs to the console this time! We removed that listener!