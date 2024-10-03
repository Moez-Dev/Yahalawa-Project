'use client'

import dynamic from 'next/dynamic'
const Select = dynamic(() => import("react-select"), { ssr: false })
import { useState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import DatePicker from '../../_components/DatePicker'
import { difficulté } from '../../_components/Data'
import UploadFile from '../../_components/UploadFile'
import Ingredientform from './Ingredientform'
import RecetteLieeForm from './RecetteLieeForm'
import InstructionForm from './InstructionForm'
import FaitNutri from './FaitNutri'
import { addRecipe } from '@/app/actions/recipe-action'
import { toast } from "sonner"



const FormData = ({ categoryList, origineList, tagsList, ustensileList, unitList, ingredientsList, author }) => {

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

    //handle difficulty
    const [difficulty, setDifficulty] = useState([])
    const handleDifficulty = (option) => {
        setDifficulty(option);
    };

    //handle origine
    const [origine, setOrigine] = useState([])
    const handleOrigine = (option) => {
        setOrigine(option);
    };

    //handle tags
    const [tag, setTag] = useState([])
    const handleTags = (option) => {
        setTag(option);
    };

    //handle ustensile
    const [ustensile, setUstensile] = useState([])
    const handleUstensile = (option) => {
        setUstensile(option);
    };

      //handle scheduledOn
      const [scheduledOn, setScheduledOn] = useState(null)
      const handleScheduledOn = (option) => {
          setScheduledOn(option);
      };


    //send data
    const [ingredientList, setIngredient] = useState([])
    const [lienRecetteList, setLienRecetteList] = useState([])
    const [instructionList, setInstructionList] = useState([])


    const handleAction = async (formData) => {
        formData.append('ingredientList', JSON.stringify(ingredientList));
        formData.append('lienRecetteList', JSON.stringify(lienRecetteList));
        formData.append('instructionList', JSON.stringify(instructionList));

        const result = await addRecipe(formData);

        if (result?.error) {
            toast.error(`${result?.error}`)
        }
        else {
            toast.success('La recette a été créée avec succées')
        }

    };

    //planning post
    const [date, setDate] = useState();


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

        return () => { window.removeEventListener('beforeunload', handleBeforeUnload)};
    }, 
    [isFormDirty]);


    return (

        <form action={handleAction} className="flex flex-col w-full bg-white rounded-md p-8">

            <section className="flex items-start space-x-40">

                <div className="flex flex-col space-y-6 w-72 md:w-96">

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Statut : <span className='text-red text-lg'>*</span></p>
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
                            components={{ IndicatorSeparator: () => null }}
                        />
                    </div>

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">IdI : <span className='text-red text-lg'>*</span></p>
                        <input
                            type="text"
                            name="IdI"
                            className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Titre : {status?.value !== "brouillon" && <span className='text-red text-lg'>*</span>}</p>
                        <input
                            type="text"
                            name="title"
                            className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Description : {status?.value !== "brouillon" && <span className='text-red text-lg'>*</span>}</p>
                        <textarea
                            rows="4"
                            className="p-2.5 w-72 md:w-96 resize-none rounded-md border border-gray outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            name='description'
                            onChange={handleInputChange}>
                        </textarea>
                    </div>

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Type : {status?.value !== "brouillon" && <span className='text-red text-lg'>*</span>}</p>
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
                        <p className="text-sm mb-1 text-[#94a3b8]">Categorie : {status?.value !== "brouillon" && <span className='text-red text-lg'>*</span>}</p>
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
                            components={{ IndicatorSeparator: () => null }}
                        />
                    </div>


                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Tags : {status?.value !== "brouillon" && <span className='text-red text-lg'>*</span>}</p>
                        <Select
                            options={tagsList.map((el, i) => ({
                                value: el.title,
                                label: el.title,
                                id: i
                            }))}
                            onChange={handleTags}
                            value={tag}
                            name="tags"
                            placeholder=""
                            className="w-72 md:w-96"
                            classNamePrefix="my-react-select"
                            isClearable={true}
                            isMulti
                            components={{ IndicatorSeparator: () => null }}
                        />
                    </div>


                    <div className='relative'>
                        <p className="text-sm mb-1 text-[#94a3b8]">Difficulté : {status?.value !== "brouillon" && <span className='text-red text-lg'>*</span>}</p>
                        <Select
                            options={difficulté}
                            onChange={handleDifficulty}
                            value={difficulty}
                            name="difficulty"
                            placeholder=""
                            className="w-72 md:w-96"
                            classNamePrefix="my-react-select"
                            isClearable={true}
                            components={{ IndicatorSeparator: () => null }}
                        />
                    </div>


                    <div className='flex items-center justify-between'>
                        <div >
                            <p className="text-sm mb-1 text-[#94a3b8]">Temps de cuisson : {status?.value !== "brouillon" && <span className='text-red text-lg'>*</span>}</p>
                            <input
                                type="number"
                                name="cooking_time"
                                className="w-[180px] rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                                onChange={handleInputChange}
                            />
                        </div>


                        <div>
                            <p className="text-sm mb-1 text-[#94a3b8]">Portion : {status?.value !== "brouillon" && <span className='text-red text-lg'>*</span>}</p>
                            <input
                                type="number"
                                name="nbr_serves"
                                className="w-[180px] rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>


                    <div className='flex items-center justify-between'>
                        <div>
                            <p className="text-sm mb-1 text-[#94a3b8]">Temperature :</p>
                            <input
                                type="number"
                                name="cooking_temperature"
                                className="w-[180px] rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                                onChange={handleInputChange}
                            />
                        </div>


                        <div className='relative'>
                            <p className="text-sm mb-1 text-[#94a3b8]">Temps de preparation :</p>
                            <input
                                type="number"
                                name="preparation_time"
                                className="w-[180px] rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>


                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Origine :</p>
                        <Select
                            options={origineList.map((el, i) => ({
                                value: el.title,
                                label: el.title,
                                id: i
                            }))}
                            onChange={handleOrigine}
                            value={origine}
                            name="origine"
                            placeholder=""
                            className="w-72 md:w-96"
                            classNamePrefix="my-react-select"
                            isClearable={true}
                            isMulti
                            components={{ IndicatorSeparator: () => null }}
                        />
                    </div>


                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Ustensile :</p>
                        <Select
                            options={ustensileList.map((el, i) => ({
                                value: el.title,
                                label: el.title,
                                id: i
                            }))}
                            onChange={handleUstensile}
                            value={ustensile}
                            name="ustensiles"
                            placeholder=""
                            className="w-72 md:w-96"
                            classNamePrefix="my-react-select"
                            isClearable={true}
                            isMulti
                            components={{ IndicatorSeparator: () => null }}
                        />
                    </div>

                    <Ingredientform unitList={unitList} ingredientsList={ingredientsList} ingredientList={ingredientList} setIngredient={setIngredient} status={status} />

                    <RecetteLieeForm ustensileList={ustensileList} lienRecetteList={lienRecetteList} setLienRecetteList={setLienRecetteList} />

                </div>


                {/* second part---------------------------------------------------------------------------- */}
                <div className="flex flex-col space-y-6 w-72 md:w-96">

                    <div>
                        <p className="font-semibold">Upload media:</p>
                        <div className="md:flex items-center justify-between flex-wrap mb-6 mt-2">
                            <UploadFile type="image" name="img" accept="image/jpeg, image/png, image/webp" />
                            <UploadFile type="video" name="video" accept="video/mp4, video/webm, video/ogg, video/avi, video/mpeg" />
                        </div>
                    </div>

                    <InstructionForm instructionList={instructionList} setInstructionList={setInstructionList} status={status} />

                    <div className='fixed right-6 shadow-lg rounded-md p-2 border-2 border-dashed'>
                        <p className="text-sm underline">Note :</p>
                        <textarea
                            rows="4"
                            className="p-2.5 w-48 h-48 resize-none rounded-md outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            name='note'
                            onChange={handleInputChange}
                        >
                        </textarea>
                    </div>

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Likes :</p>
                        <input
                            type="number"
                            name="likes"
                            className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            onChange={handleInputChange}
                        />
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
                    <div>
                        <p className="font-semibold mb-2 mt-6">Date de publication prévue:</p>
                        <DatePicker date={date} setDate={setDate} name="date" disbaled={status && status.value !== "programmée"} />
                    </div>

                    <div>
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
                            onChange={handleScheduledOn}
                            value={scheduledOn}
                            name="scheduledOn"
                            placeholder=""
                            className="w-72 md:w-96"
                            classNamePrefix="my-react-select"
                            isClearable={true}
                            isDisabled={status && status.value !== "programmée"}
                            components={{ IndicatorSeparator: () => null }}
                        />
                    </div>

                    <FaitNutri />

                    {/*Référencement Google----------------------------------------------------------- */}
                    <div>
                        <p className="font-semibold mb-2 mt-6">Référencement Google :</p>

                        <div>
                            <p className="text-sm mb-1 text-[#94a3b8]">Titre :</p>
                            <input
                                name="seoTitle"
                                className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            />
                        </div>

                        <div className='mt-6'>
                            <p className="text-sm mb-1 text-[#94a3b8]">Description :</p>
                            <textarea
                                rows="4"
                                className="p-2.5 w-72 md:w-96 resize-none rounded-md border border-gray outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                                name='seoDescription'>
                            </textarea>
                        </div>
                    </div>
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







