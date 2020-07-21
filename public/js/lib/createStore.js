const createStore = (reducer) => {
    let state;
    const listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(l => l());
    };

    const subscribe = (l) => {
        listeners.push(l);

        // unsubscribe method
        return () => {
            listeners = listeners.filter(listener => listener != l);
        }
    };

    // so that when getstate gets called first time
    // all initial values are there
    dispatch({}); // dummy dispatch

    return {
        getState,
        dispatch,
        subscribe
    }
}


const promiseSupport = function (store) {
    const next = store.dispatch;

    return function(action) {
        if (typeof action.then === 'function') {
            return action.then(next);
        }

        return next(action);
    }
}