import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
    // sets user in INITIAL_STATE to user var in local storager if it exists otherwise null
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
};

// returns an object to be used to track variables from INITIAL_STATE
export const Context = createContext(INITIAL_STATE);

// creates <Context.Provider>
export const ContextProvider = ({ children }) => {
    // fetches user info from form and uses reducer to place INITIAL_STATE vars in state vars
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    // constantly runs and updates local storage user var (used by components to decide what to display) to state user var
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]); 

    return (
        <Context.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </Context.Provider>
    );
};