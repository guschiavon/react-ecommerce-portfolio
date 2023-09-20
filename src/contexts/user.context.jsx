import {
  createContext,
  useState,
  useEffect
 } from "react"; 
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";


// the actual value you want to access
export const UserContext = createContext({
  // empty state of an object should be null
  currentUser: null,
  setCurrentUser: () => null
})

export const UserProvider = ({ children }) => {
  // we access the data leveraging the useState() hook:
  const [currentUser, setCurrentUser] = useState(null);
  // instantiate a constant  with the state value 
  const value = { currentUser, setCurrentUser };
  // Centralizing authentication observer on the context
  // initialize the component and immediately check if there is a user authenticated (run once)
  useEffect(() => {
    // pass a callback to the authStateChanged method
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {        
        createUserDocumentFromAuth(user)
      }
      setCurrentUser(user)
    })
    return unsubscribe
  }, []);
  // pass the values to the component tree using the value attribute. 
  // all children of the provider have access to the state values
  // components that will provide value need to use the useContext hook in order to update the state and consequently the context
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}