import React, {FC, useContext} from "react"
import {NavLink} from "react-router-dom"
import {RouteNames} from "routes"
import {Context} from "index"
import {useAuthState} from "react-firebase-hooks/auth"

const Header: FC = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    const logout = () => {
        auth.signOut()
    }

    return (
        <div className="h-12 bg-sky-600 drop-shadow-lg">
            <div className="container">
                <div className="flex items-center justify-between h-12">
                    <NavLink to={RouteNames.CHATS} className="text-2xl font-medium text-white">Chat</NavLink>
                    <div>
                        {
                            user
                                ?
                                <button className="btn" onClick={logout}>Logout</button>
                                :
                                <NavLink to={RouteNames.LOGIN}>
                                    <button className="btn">Login</button>
                                </NavLink>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header