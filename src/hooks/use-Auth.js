import { useEffect, useState } from "react";
// import AuthContext from "../routes/AuthContext";
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { auth, db } from "../services/firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { DASHBOARD, LOGIN } from "../routes/AppRoutes";
import { Timestamp, collection, doc, getDoc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
// // import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

function useAuth() {
    const [authUser, isLoading, error] = useAuthState(auth);
    // return React.useContext(AuthContext);
    return { user: authUser, isLoading, error };
}

export function useLogin() {
    const [isLoading, setLoading] = useState(false);
    // const toast = useToast();
    const navigate = useNavigate();
    async function login({ email, password, redirectTo = DASHBOARD }) {
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    // console.log(user?.providerData[0].email,'user ---');
                    //     const docRef = doc(db, 'users',getUInfofromStorage('email'));
                    // const payload = {name : ,email: '', createdAt: new Date(year,month,day,hours,minutes)}
                    // await setDoc(docRef, payload)
                    const docRef = doc(db, "users", user?.providerData[0].email ); //get user data from database
                    const docSnap = await getDoc(docRef);
                    // console.log(docSnap.data() ,'doc ---');
                    // onSnapshot(collection(db, "users"), (snapshot) =>  //get user data from database
                    //     // console.log(snapshot.docs.map((doc) => doc.data()))  , user?.providerData[0].email 
                    //     console.log(snapshot, 'snapshot ---')
                    // )

                    if (docSnap.exists()) {
                        // console.log("Document data:", docSnap.data());
                        localStorage.setItem('userInfo', JSON.stringify(docSnap.data() ) )
                      } else {
                        // docSnap.data() will be undefined in this case
                        toast.error("No such document!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                      }

                    toast.success("You are logged in", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    navigate(redirectTo);
                })
                .catch((err) => {
                    console.log(err.code);
                    console.log(err.message);
                });


        } catch (error) {
            console.log(error, '23456789---');
            // toast.error("Error Notification !", {
            //     position: toast.POSITION.TOP_LEFT
            //   });
            // notify()
            toast.error('Logging in failed', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            setLoading(false);

        } finally {
            setLoading(false);
        }
    }

    return { login, isLoading };
}

export function useRegister() {
    const [isLoading, setLoading] = useState(false);
    // const toast = useToast();
    const navigate = useNavigate();

    async function register({
        username,
        email,
        password,
        redirectTo = LOGIN,
    }) {
        setLoading(true);

        // const usernameExists = await isUsernameExists(username);

        // if (usernameExists) {
        //     // toast({
        //     //   title: "Username already exists",
        //     //   status: "error",
        //     //   isClosable: true,
        //     //   position: "top",
        //     //   duration: 5000,
        //     // });
        //     setLoading(false);
        // } else {
        const defaultImg = 'data:image/jpeg;base64,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'
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log(res);
            await setDoc(doc(db, "users", res.user.email), {
                email: res.user.email,
                username: username,
                avatar: defaultImg,
                bio:'',
                createdAt: moment().format("DD-MM-YYYY hh:mm a"),
            });

            //   toast({
            //     title: "Account created",
            //     description: "You are logged in",
            //     status: "success",
            //     isClosable: true,
            //     position: "top",
            //     duration: 5000,
            //   });
            toast.success("Account created", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            navigate(redirectTo);
        } catch (error) {
            console.log(error, 'error');
            //   toast({
            //     title: "Signing Up failed",
            //     description: error.message,
            //     status: "error",
            //     isClosable: true,
            //     position: "top",
            //     duration: 5000,
            //   });
            toast.error('Signing Up failed or email exists', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } finally {
            setLoading(false);
        }
        // }
    }

    return { register, isLoading };
}


export function useLogout() {
    const [signOut, isLoading, error] = useSignOut(auth);
    // const toast = useToast();
    const navigate = useNavigate();

    async function logout() {
        if (await signOut()) {
            // toast({
            //   title: "Successfully logged out",
            //   status: "success",
            //   isClosable: true,
            //   position: "top",
            //   duration: 5000,
            // });
            localStorage.removeItem('userInfo')
            navigate(LOGIN);
        } // else: show error [signOut() returns false if failed]
    }

    return { logout, isLoading };
}

export default useAuth;

// const getUInfofromStorage = (type) => {
//     const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//     return userInfo ? userInfo[type] : "";
//   }