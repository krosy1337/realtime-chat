import React, {useContext} from "react"
import "./App.css"
import {Navigate, Route, RouteObject, Routes} from "react-router-dom"
import {RouteNames} from "routes"
import Login from "components/Login"
import Chat from "components/Chat"
import Layout from "components/Layout"
import {useAuthState} from "react-firebase-hooks/auth"
import {Context} from "index"
import Home from "components/Home"

const App = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    const publicRoutes: RouteObject[] = [
        {
            path: RouteNames.LOGIN,
            element: <Login/>,
        },
        {
            path: "*",
            element: <Navigate to={RouteNames.LOGIN}/>,
        },
    ]

    const privateRoutes: RouteObject[] = [
        {
            path: RouteNames.CHATS,
            element: <Home/>,
        },
        {
            path: RouteNames.CURRENT_CHAT,
            element: <Chat/>,
        },
        {
            path: "*",
            element: <Navigate to={RouteNames.CHATS}/>,
        },
    ]

    return (
        <Routes>
            <Route element={<Layout/>}>
                {
                    user
                    ?
                    privateRoutes.map(({path, element}) =>
                        <Route key={path} path={path} element={element}/>
                    )
                    :
                    publicRoutes.map(({path, element}) =>
                        <Route key={path} path={path} element={element}/>
                    )
                }
            </Route>
        </Routes>
    )
}

export default App
