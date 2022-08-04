import React, {forwardRef, PropsWithChildren} from "react"

interface MessageProps {
    isOwn: boolean
    name: string
    photoUrl: string
    text: string
}

const Message = forwardRef<HTMLDivElement, PropsWithChildren<MessageProps>>(({text, name, isOwn, photoUrl}, ref) => {
    return (
        <div ref={ref} className="flex mb-2">
            <div
                className={`${isOwn ? "bg-sky-600 ml-auto" : "bg-amber-600 mr-auto"} py-1 px-2 sm:py-2 sm:px-3 drop-shadow-lg rounded-md sm:max-w-[50%]`}>
                <div className="flex items-center">
                    <img src={photoUrl} alt={name} className="block mr-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full"/>
                    <div className="text-md sm:text-lg text-white">{name}</div>
                </div>
                <div>
                    <div className="text-sm sm:text-md text-white">{text}</div>
                </div>
            </div>
        </div>
    )
})

export default Message