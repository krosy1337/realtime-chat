import React, {createContext} from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import {BrowserRouter} from "react-router-dom"
import { auth, firestore } from "firebaseConfig"
import { Auth } from "firebase/auth"
import { Firestore } from "firebase/firestore"

interface IContext {
    auth: Auth
    firestore: Firestore
}

export const Context = createContext<IContext>({} as IContext)

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
)
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Context.Provider value={{
                auth,
                firestore,
            }}>
                <App/>
            </Context.Provider>
        </BrowserRouter>
    </React.StrictMode>
)
