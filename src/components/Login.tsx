import React, {FC, useContext} from "react"
import {Context} from "index"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import {useAuthState} from "react-firebase-hooks/auth"
import Loader from "components/Loader"

const Login: FC = () => {
    const {auth} = useContext(Context)
    const loading = useAuthState(auth)[1]

    const login = async () => {
        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth, provider)
    }

    if (loading) {
        return <Loader />
    }
    return (
        <div className="grow">
            <div className="container">
                <div className="h-full flex">
                    <div className="p-10 bg-sky-600 m-auto rounded-2xl">
                        <button className="btn text-2xl" onClick={login}>Log in with Google</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login