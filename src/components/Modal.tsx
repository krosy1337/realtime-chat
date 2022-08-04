import React, {FC, useRef} from "react"
import {useOnClickOutside} from "hooks/useOutside"
import {DocumentData} from "firebase/firestore"
import {SubmitHandler, useForm} from "react-hook-form"

interface ModalProps {
    open: boolean
    onClose: (value: boolean) => void
    createChat: (name: string) => void
    chats: DocumentData[]
}

interface ChatNameFields {
    name: string
}

const Modal: FC<ModalProps> = ({open, onClose, createChat, chats}) => {
    const {register, reset, handleSubmit, formState: {errors}} = useForm<ChatNameFields>()
    const modalRef = useRef<HTMLDivElement | null>(null)
    useOnClickOutside(modalRef, onClose)

    const onCreateChat: SubmitHandler<ChatNameFields> = ({name: value}) => {
        const chatName = value.trim().replaceAll(" ", "_")
        createChat(chatName)
        onClose(false)
        reset()
    }

    return (
        <>
            <div className={`bg-black bg-opacity-20 fixed top-0 bottom-0 left-0 right-0 flex 
        ${open ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity`}>
                {open && <div ref={modalRef} className="m-auto p-5 bg-white rounded-sm w-72">
                    <form onSubmit={handleSubmit(onCreateChat)} className="flex flex-col">
                        <div className="mb-2">
                            <input type="text" className={`textField ${errors.name && "error"}`}
                                   placeholder="Chat name"
                                   autoFocus
                                   {...register("name", {
                                       required: "Chat name is required field",
                                       pattern: {
                                           value: /^[A-Za-z0-9_ ]+$/,
                                           message: "Please do not use special characters",
                                       },
                                       validate: value => chats.find(({name}) => name === value)
                                           ?
                                           "This name is already in use" : true
                                   })}/>
                            {errors.name && <div className="text-red-700 text-base">{errors.name.message}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">Create</button>
                    </form>
                </div>}
            </div>
        </>

    )
}

export default Modal