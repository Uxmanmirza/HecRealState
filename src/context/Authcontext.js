import React, {
    createContext,
    useContext,
    useReducer,
    useEffect,
    useState,
  } from 'react';
  import auth from '@react-native-firebase/auth';
  import firestore from "@react-native-firebase/firestore"
  
  const AuthContext = createContext();
  
  const initialState = {isAuthenticated: false};
  
  
  const reducer = (state, {type, payload}) => {
    switch (type) {
      case 'LOGIN':
        return Object.assign({}, {isAuthenticated: true}, {user: payload.user});
      case 'LOGOUT':
        return Object.assign({}, {isAuthenticated: false});
      default:
        return state;
    }
  };
  
  export default function AuthContextProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        auth().onAuthStateChanged(async (user) => {
            console.log(user)
            if (user) {
                // console.log(user)
                const userData = (await firestore().collection('users').doc(user.uid).get()).data();
                console.log(userData)
                dispatch({ type: "LOGIN", payload: { user: userData } })
            } else {
                console.log("user isn't signed in")
                dispatch({ type: "LOGOUT" })
            }
        })
    }, [])
  
    // const [initializing, setInitializing] = useState(true);
    // const [user, setUser] = useState();
  
    // function onAuthStateChanged(user) {
    //   setUser(user);
    //   if (initializing) setInitializing(false);
    // }
  
    // useEffect(() => {
    //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //   dispatch({ type: "LOGIN", payload: { user } })
    //   return subscriber; // unsubscribe on unmount
      
    // }, []);
  
    return (
      <AuthContext.Provider value={{...state, dispatch}}>
        {children}
      </AuthContext.Provider>
    );
  }
  
  export const useAuthContext = () => {
    return useContext(AuthContext);
  };
  