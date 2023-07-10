import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user: {
        "_id":"64aa4a4adb6c053d72dd7f5c",
        "username":"Chetan",
        "email":"chetan@gmail.com",
        "profilePicture":"",
        "coverPicture":"",
        "followers":[],
        "followings":[],
        "isAdmin":false,
        "city":"Aligarh",
        "desc":"hey its my updated description",
        "from":"Uttar Pradesh",
        "relationship":{"$numberInt":"1"}
    },
    isFetching:false, 
    error:false,
};

export const AuthContext  = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AuthReducer,INITIAL_STATE);

    return(
        <AuthContext.Provider
            value={{
                user:state.user,
                isFetching:state.isFetching,
                error:state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
