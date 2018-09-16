import React from 'react';
import store from '../store';

function connect (mapStateToProps, mapDispatchToProps) {
    // createSubscribedComponent will have closure over mapStateToProps & mapDispatchToProps
    return function createSubscribedComponent (OtherReactComponent) {
        return class extends React.Component {
            constructor(props) {
                super(props);
                this.state = store.getState();
            }

            // Subscribe to the store
            componentDidMount() {
                this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
            }

            // Unsubscribe when unmounting
            componentWillUnmount() {
                this.unsubscribe();
            }

            render() {
                // ourProps is an object that looks like this:
                // { counter: state.counter }
                const ourProps = mapStateToProps(store.getState());

                // ourMethods is an object that looks like this:
                // { increment: function () { dispatch(incrementCounter()) } }
                const ourMethods = mapDispatchToProps(store.dispatch);

                // all of our props & methods get passed down to the OtherReactComponent!
                return <OtherReactComponent {...ourProps} {...ourMethods} />
            }
        }
    }
}