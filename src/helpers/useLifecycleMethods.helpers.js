import { useRef, useState, useEffect } from "react";

const useLifecycleMethods = (state = {}) => {
  const [prevState, setPrevState] = useState(state);
  const defaultDeps = state;

  /**
   * componentDidMount() is invoked immediately after a component is mounted.
    this is a good place to instantiate the network request.

    This method is a good place to set up any subscriptions.
    If you do that, don’t forget to unsubscribe in componentWillUnmount().

    You may call setState() immediately in componentDidMount().
    It will trigger an extra rendering.
   * @param {Function} callback
   */
  const useComponentDidMount = callback => {
    useEffect(() => {
      callback();
      // eslint-disable-next-line
    }, []);
  };

  /**
   * onDependenciesChange() is invoked immediately after one of the dependencies changed.
   * This is also a good place to do network requests as long as you compare the current dependencies to previous dependencies value
   * EXP : onDependenciesChange(
            prevState => {
              console.log('componentDidUpdate', state, prevState)
            },
            [state]
          )
   * @param {Function} callback
   * @param {Array} subscriptions
   */
  const useOnDependenciesChange = (callback, subscriptions = defaultDeps) => {
    const isFirstRender = useRef(true);

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
      } else {
        callback(prevState);
        setPrevState(state);
      }
      // eslint-disable-next-line
    }, subscriptions);
  };

  /**
   * componentWillUnmount() is invoked immediately before a component is unmounted and destroyed.
   * Perform any necessary cleanup in this method, such as invalidating timers,
   * canceling network requests, or cleaning up any subscriptions that were created in componentDidMount().

   * You should not call setState() in componentWillUnmount() because the component will never be re-rendered.
   * Once a component instance is unmounted, it will never be mounted again.
   * @param {Function} callback
   */
  const useComponentWillUnmount = callback => {
    useEffect(() => {
      return () => {
        callback();
      };
      // eslint-disable-next-line
    }, []);
  };

  return {
    componentDidMount: useComponentDidMount,
    onDependenciesChange: useOnDependenciesChange,
    componentWillUnmount: useComponentWillUnmount
  };
};

export default useLifecycleMethods;
