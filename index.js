function createStore () {
    let currentState = {};
    let reducer = null;

    // our constructor function
    function Store() {}
    // our .prototype methods
    Store.prototype.getState = function () {
        return currentState;
    };
    Store.prototype.dispatch = function () {};
    Store.prototype.subscribe = function () {};

    return new Store();
}

const store = createStore();