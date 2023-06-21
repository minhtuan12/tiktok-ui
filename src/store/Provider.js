import Context from "~/store/Context";
import {useReducer} from "react";
import reducer, {initState} from "~/store/reducer";

function Provider({children}) {
    const [state, dispatch] = useReducer(reducer, initState)

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export default Provider