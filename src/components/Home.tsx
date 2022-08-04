import React, {FC, useEffect, useState} from "react"
import Select, {SingleValue} from "react-select"
import Modal from "components/Modal"
import {addDoc, collection, serverTimestamp} from "firebase/firestore"
import {firestore} from "firebaseConfig"
import {useCollectionData} from "react-firebase-hooks/firestore"
import {useNavigate} from "react-router-dom"
import Loader from "components/Loader"

interface IOption {
    value: string
    label: string
}

const Home: FC = () => {
    const [value, setValue] = useState<IOption | null>(null)
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [chats, loading] = useCollectionData(collection(firestore, "chats"))
    const [options, setOptions] = useState<IOption[]>([])
    const navigator = useNavigate()

    const onChange = (newValue: SingleValue<IOption>) => {
        setValue(newValue)
        if (newValue) {
            navigator(`/chat/${newValue.value}`)
        }
    }

    const createChat = async (chatName: string) => {
        await addDoc(collection(firestore, "chats"), {
            name: chatName
        })
        await addDoc(collection(firestore, chatName), {
            uid: "HJDisZ-33KsaBI0KYhqQ",
            displayName: "Chat Bot",
            photoUrl: "https://static10.tgstat.ru/channels/_0/3f/3f1f570638db96e58ac12ccf94441c40.jpg",
            text: "Chat created",
            createAt: serverTimestamp(),
        })
        navigator(`/chat/${chatName}`)
    }

    useEffect(() => {
        if (chats) {
            setOptions(chats.map((c) => ({value: c.name, label: c.name})))
        }
    }, [chats])

    if (loading) {
        return <Loader />
    }
    return (
        <div className="grow">
            <div className="container">
                <div className="h-full flex">
                    <div className="p-10 bg-sky-600 m-auto rounded-2xl flex items-center flex-col sm:flex-row gap-1 sm:gap-5">
                        <button className="btn" onClick={() => setModalOpen(true)}>Create chat</button>
                        <div className="text-lg font-medium text-white">Or</div>
                        <Select className="w-44" placeholder="Select chat" options={options}
                                value={value} onChange={onChange} isLoading={loading}/>
                    </div>
                </div>
            </div>
            {chats && <Modal open={modalOpen} onClose={() => setModalOpen(false)} createChat={createChat} chats={chats} />}
        </div>
    )
}

export default Home