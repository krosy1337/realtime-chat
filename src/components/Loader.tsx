import React, {FC} from "react"

const Loader: FC = () => {
    return (
        <div className="grow">
            <div className="container">
                <div className="h-[100%] flex">
                    <div className="lds-default m-auto">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader