import Context from "~/store/Context";
import {useContext} from "react";
import {StoreContext} from "~/store/index";

export const useStore = () => {
    const [state, dispatch] = useContext(Context)

    return [state, dispatch]
}