import React, {FC, useContext, useEffect, useRef, useState} from "react"
import {Context} from "index"
import {useCollectionData} from "react-firebase-hooks/firestore"
import {addDoc, collection, orderBy, query, serverTimestamp} from "firebase/firestore"
import Loader from "components/Loader"
import {useAuthState} from "react-firebase-hooks/auth"
import Message from "components/Message"
import {Navigate, useParams} from "react-router-dom"
import {RouteNames} from "routes"

const Chat: FC = () => {
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const params = useParams()
    const q = query(collection(firestore, params.chatId || ""), orderBy("createAt"))
    const [messages, loading] = useCollectionData(q)
    const [message, setMessage] = useState<string>("")
    const chatRef = useRef<HTMLDivElement | null>(null)

    const sendMessage = async () => {
        if (user && message && params.chatId) {
            setMessage("")
            await addDoc(collection(firestore, params.chatId), {
                uid: user.uid,
                displayName: user.displayName,
                photoUrl: user.photoURL,
                text: message,
                createAt: serverTimestamp(),
            })
        }
    }

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current?.scrollBy({top: chatRef.current?.scrollHeight})
        }
    }, [messages])

    if (loading || !params.chatId) {
        return <Loader/>
    }

    if (messages?.length === 0) {
        return <Navigate to={RouteNames.CHATS} />
    }

    return (
        <div className="grow pb-10">
            <div className="container pt-2 sm:pt-10">
                <div className="bg-slate-200 rounded-sm drop-shadow-lg mb-5 h-[70vh] overflow-y-auto p-2 sm:p-5"
                     ref={chatRef}>
                    {(messages && user) ? messages.map((m) =>
                        <Message key={m.createAt} isOwn={user.uid === m.uid} name={m.displayName} photoUrl={m.photoUrl}
                                 text={m.text}/>
                    ) : null}
                </div>
                <form className="flex flex-col items-end" onSubmit={(e) => {
                    e.preventDefault()
                    sendMessage()
                }}>
                    <input type="text" className="textField mb-2"
                           value={message} onChange={(e) => setMessage(e.currentTarget.value)}/>
                    <button type="submit" className="btn btn-primary text-xl ml-auto px-5">Send</button>
                </form>
            </div>
        </div>
    )
}

export default Chat