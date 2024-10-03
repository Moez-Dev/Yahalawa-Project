'use client'

import dynamic from 'next/dynamic'
const Select = dynamic(() => import("react-select"), { ssr: false })
import { useState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import { addTips } from "@/app/actions/tips-action"
import UploadFile from '../../_components/UploadFile'
import DatePicker from '../../_components/DatePicker'
import { toast } from "sonner"



const FormData = ({ categoryList, author }) => {

    const { pending } = useFormStatus()

    //handle type
    const [type, setType] = useState(null)
    const handleType = (option) => {
        setType(option);
    };

    //handle status
    const [status, setstatus] = useState(null)
    const handlestatus = (option) => {
        setstatus(option);
    };

    //handle categorie
    const [categorie, setCategorie] = useState([])
    const handleCategorie = (option) => {
        setCategorie(option);
    };


    //send data
    const handleAction = async (formData) => {
        const result = await addTips(formData)

        if (result?.error) {
            toast.error(`${result?.error}`)
        }
        else {
            toast.success('L\'astuce a été créée avec succées.')
        }
    };

    //planning post
    const [date, setDate] = useState()


    //detects window closure
    const [isFormDirty, setIsFormDirty] = useState(false);

    const handleInputChange = (e) => {
        setIsFormDirty(true);
    };

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isFormDirty) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => { window.removeEventListener('beforeunload', handleBeforeUnload) };
    },
        [isFormDirty]);



    return (

        <form action={handleAction} className="flex flex-col w-full bg-white rounded-md p-8">

            <section className="flex items-start space-x-24">
                <div className="flex flex-col space-y-6">

                    <div>
                        <p className="text-sm text-[#94a3b8]">Statut : <span className='text-red text-lg'>*</span></p>
                        <Select
                            options={[
                                { value: 'publiée', label: 'publiée' },
                                { value: 'non publiée', label: 'non publiée' },
                                { value: 'brouillon', label: 'brouillon' },
                                { value: 'programmée', label: 'programmée' },
                            ]}
                            onChange={handlestatus}
                            value={status}
                            name="status"
                            placeholder=""
                            className="w-72 md:w-96"
                            classNamePrefix="my-react-select"
                            isClearable={true}
                            components={{
                                IndicatorSeparator: () => null
                            }}
                        />
                    </div>

                    <div>
                        <p className="text-sm text-[#94a3b8]">IDI : <span className='text-red text-lg'>*</span></p>
                        <input
                            name="IdI"
                            className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <p className="text-sm text-[#94a3b8]">Titre : {status?.value !== "brouillon" && <span className='text-red text-lg'>*</span>}</p>
                        <input
                            name="title"
                            className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <p className="text-sm text-[#94a3b8]">Description : {status?.value !== "brouillon" && <span className='text-red text-lg'>*</span>}</p>
                        <textarea
                            rows="4"
                            className="p-2.5 w-72 md:w-96 resize-none rounded-md border border-gray outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            name='description'
                            onChange={handleInputChange}>
                        </textarea>
                    </div>

                    <div>
                        <p className="text-sm text-[#94a3b8]">Type : {status?.value !== "brouillon" && <span className='text-red text-lg'>*</span>}</p>
                        <Select
                            options={[{ value: 'Free', label: 'Free' },
                            { value: 'T-Telecom', label: 'T-Telecom' }
                            ]}
                            onChange={handleType}
                            value={type}
                            name="type"
                            placeholder=""
                            className="w-72 md:w-96"
                            classNamePrefix="my-react-select"
                            isClearable={true}
                            components={{ IndicatorSeparator: () => null }}
                        />
                    </div>


                    <div>
                        <p className="text-sm text-[#94a3b8]">Categories : {status?.value !== "brouillon" && <span className='text-red text-lg'>*</span>}</p>
                        <Select
                            options={categoryList.map((el, i) => ({
                                value: el.title,
                                label: el.title,
                                id: i
                            }))}
                            onChange={handleCategorie}
                            value={categorie}
                            name="category"
                            placeholder=""
                            className="w-72 md:w-96"
                            classNamePrefix="my-react-select"
                            isClearable={true}
                            isMulti
                            components={{
                                IndicatorSeparator: () => null
                            }}
                        />
                    </div>

                    <div className='fixed right-6 shadow-lg rounded-md p-2 border-2 border-dashed'>
                        <p className="text-sm underline">Note :</p>
                        <textarea
                            rows="4"
                            className="p-2.5 w-48 h-48 resize-none rounded-md  outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            name='note'
                            onChange={handleInputChange}
                        >
                        </textarea>
                    </div>

                    <div>
                        <p className="text-sm text-[#94a3b8]">Likes :</p>
                        <input
                            type="number"
                            name="likes"
                            className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>


                <div className="flex flex-col">
                    <p className="font-semibold">Upload media:</p>
                    <div className="md:flex items-center justify-between flex-wrap mb-6 mt-2">
                        <UploadFile type="image" name="img" accept="image/jpeg, image/png, image/webp" />
                        <UploadFile type="video" name="video" accept="video/mp4, video/webm, video/ogg, video/avi, video/mpeg" />
                    </div>

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Link youytube :</p>
                        <input
                            type="text"
                            name="video_link"
                            className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* handle Date------------------------------------------------------------- */}
                    <p className="font-semibold mb-2 mt-6">Date de publication prévue:</p>
                    <DatePicker date={date} setDate={setDate} name="date" disbaled={status && status.value !== "programmée"} />

                    <div className='my-6'>
                        <p className="text-sm mb-1 text-[#94a3b8]">Rubrique :</p>
                        <input
                            type="text"
                            name="rubrique"
                            className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            onChange={handleInputChange}
                            disabled={status && status.value !== "programmée"}
                        />
                    </div>

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Poster sur :</p>
                        <Select
                            options={[{ value: 'Free', label: 'Free' },
                            { value: 'T-Telecom', label: 'T-Telecom' }
                            ]}
                            onChange={handleType}
                            value={type}
                            name="scheduledOn"
                            placeholder=""
                            className="w-72 md:w-96"
                            classNamePrefix="my-react-select"
                            isClearable={true}
                            isDisabled={status && status.value !== "programmée"}
                            components={{ IndicatorSeparator: () => null }}
                        />
                    </div>


                    {/*Référencement Google----------------------------------------------------------- */}
                    <p className="font-semibold mb-2 mt-6">Référencement Google :</p>

                    <input
                        placeholder="Titre"
                        name="seoTitle"
                        className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 mb-6 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                        onChange={handleInputChange}
                    />

                    <textarea
                        rows="4"
                        className="p-2.5 w-72 md:w-96 resize-none rounded-md border border-gray outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                        placeholder="Description"
                        name='seoDescription'
                        onChange={handleInputChange}>
                    </textarea>
                </div>

                <input type='hidden' name="author" value={author} />
            </section>

            <div className="flex flex-col items-center justify-center mt-12">
                <button className="green-btn text-sm" type="submit" disabled={pending} >
                    {pending
                        ?
                        <div className="flex items-center space-x-1">
                            <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="white"><path fill-rule="evenodd" d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14m0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10" clip-rule="evenodd" opacity="0.2" /><path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7z" /></g></svg>
                            <span>Sauvgarder</span>
                        </div>
                        :
                        'Sauvgarder'
                    }
                </button>
            </div>
        </form>
    )
}

export default FormData







