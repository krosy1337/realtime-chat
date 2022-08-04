import React, {FC, useContext} from "react"
import {Outlet} from "react-router-dom"
import Header from "components/Header"
import {useAuthState} from "react-firebase-hooks/auth"
import {Context} from "index"
import Loader from "components/Loader"

const Layout: FC = () => {
    const {auth} = useContext(Context)
    const loading = useAuthState(auth)[1]
    return (
        <div className="flex flex-col h-screen">
            <Header/>
            {
                loading
                    ?
                    <Loader/>
                    :
                    <Outlet/>

            }
        </div>
    )
}

export default Layout