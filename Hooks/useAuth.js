import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from "../config/firebase";

import { useSelector } from "react-redux";
import { selectEmail } from "../redux/selectors";

// TODO: do I need this?

// export function useAuth() {
//     const [user, setUser] = useState();

//     useEffect(() => {
//         const unsubscribeFromAuthStateChange = onAuthStateChanged(auth, user => {
//             if (user) {
//                 setUser(user);
//             } else {
//                 setUser(undefined)
//             }
//         })
//         return unsubscribeFromAuthStateChange
//   }, []);
// }

export const useAuth = () => {
    return {
        email: useSelector(selectEmail)
    }
}