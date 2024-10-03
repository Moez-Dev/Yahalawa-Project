'use client'

import { useEffect, useState } from "react"
import { CloudUpload } from "lucide-react"

const UploadFile = ({ type, accept, name }) => {

    const [file, setFile] = useState(null);


    return (
        <div className="size-36 overflow-hidden">

            <div className="absolute bg-white w-36 h-36 flex flex-col items-center justify-center border-2 border-blue border-dashed rounded-md text-center">
                <CloudUpload className="text-blue" />
                {file ? <strong className="text-sm tracking-wide">{file.name}</strong> : <p className="text-sm tracking-wide">upload <br /> {type}</p>}
            </div>

            <input
                type="file"
                className="bg-white outline-none w-full h-full z-20 opacity-0"
                name={name}
                accept={accept}
                onChange={(e) => setFile(e.target.files[0])}
            />

        </div>
    )
}

export default UploadFile