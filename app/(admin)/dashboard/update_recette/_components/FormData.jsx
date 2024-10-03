'use client'

import dynamic from 'next/dynamic'
const Select = dynamic(() => import("react-select"), { ssr: false })
import { Suspense, useState } from "react"
import { useFormStatus } from "react-dom"
import { difficulté } from '../../_components/Data'
import UploadFile from '../../_components/UploadFile'
import Ingredientform from './Ingredientform'
import RecetteLieeForm from './RecetteLieeForm'
import InstructionForm from './InstructionForm'
import FaitNutri from './FaitNutri'
import { deleteCategorySelected, deleteTagSelected, deleteUstensileSelected, editRecipe } from '@/app/actions/recipe-action'
import { toast } from 'sonner'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import DatePicker from '../../_components/DatePicker'
import { Copy, CircleCheck } from 'lucide-react'



const FormData = ({ recette, origineList, categoryList, ustensileList, unitList, allIngredients, tagsList }) => {


    const { pending } = useFormStatus()

    //handle type
    const [type, setType] = useState(recette.is_paying ? { value: recette.is_paying, label: recette.is_paying } : null)
    const handleType = (option) => {
        setType(option);
    };

    //handle status
    const [status, setstatus] = useState(recette.status ? { value: recette.status, label: recette.status } : null)
    const handlestatus = (option) => {
        setstatus(option);
    };

    //handle categorie
    const [categorie, setCategorie] = useState(recette.category ? recette.category.map(cat => ({ value: cat.title, label: cat.title })) : [])
    const handleCategorie = (option) => {

        const deletedCategory = recette.category.find(cat => !option.includes(cat));

        if (deletedCategory) {
            deleteCategorySelected(deletedCategory.id)
        }

        setCategorie(option);
    };

    //handle difficulty
    const [difficulty, setDifficulty] = useState(recette.difficulty ? { value: recette.difficulty, label: recette.difficulty } : null)
    const handleDifficulty = (option) => {
        setDifficulty(option);
    };

    //handle origine
    const [origine, setOrigine] = useState(recette.origine ? recette.origine.map(cat => ({ value: cat.title, label: cat.title })) : [])
    const handleOrigine = (option) => {

        const deleteOrigine = recette.origine.find(el => !option.includes(el));

        if (deleteOrigine) {
            deleteTagSelected(deleteOrigine.id)
        }
        setOrigine(option);
    };

    //handle tags
    const [tag, setTag] = useState(recette.tags ? recette.tags.map(cat => ({ value: cat.title, label: cat.title })) : [])
    const handleTags = (option) => {

        const deletedTag = recette.tags.find(el => !option.includes(el));

        if (deletedTag) {
            deleteTagSelected(deletedTag.id)
        }

        setTag(option);
    };

    //handle ustensile 
    const [ustensile, setUstensile] = useState(recette.ustensiles ? recette.ustensiles.map(cat => ({ value: cat.title, label: cat.title })) : [])
    const handleUstensile = (option) => {

        const deletedUstensile = recette.ustensiles.find(el => !option.includes(el));

        if (deletedUstensile) {
            deleteUstensileSelected(deletedUstensile.id)
        }

        setUstensile(option);
    };


    //handle scheduledOn
    const [scheduledOn, setScheduledOn] = useState(recette.scheduledOn ? { value: recette.scheduledOn, label: recette.scheduledOn } : null)
    const handleScheduledOn = (option) => {
        setScheduledOn(option);
    };



    //send data
    const [newIngredientList, setNewIngredientList] = useState([])
    const [newInstructionList, setNewInstructionList] = useState([])
    const [lienRecetteList, setLienRecetteList] = useState([])
    const [imgData, setImgData] = useState(recette.imgPath)
    const [videoData, setvideoData] = useState(recette.videoPath)

    const handleAction = async (formData) => {

        formData.append('imgData', JSON.stringify(imgData));
        formData.append('videoData', JSON.stringify(videoData));
        formData.append('category', JSON.stringify(categorie));
        formData.append('ustensile', JSON.stringify(ustensile));
        formData.append('tag', JSON.stringify(tag));
        formData.append('origine', JSON.stringify(origine));

        formData.append('ingredientList', JSON.stringify(newIngredientList));
        formData.append('lienRecetteList', JSON.stringify(lienRecetteList));
        formData.append('instructionList', JSON.stringify(newInstructionList));

        const result = await editRecipe(formData);

        if (result?.error) {
            toast.error(`${result?.error}`)
        }
        else {
            toast.success('La recette a été mis a jour');
        }
    };

    //planning post
    const [date, setDate] = useState(recette.scheduledAt)


    //copy URL
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {

        navigator.clipboard.writeText(`https://www.yahalawa.net/recipe/${recette.id}`)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch((error) => {
                console.error('Erreur lors de la copie du texte :', error);
            });
    };



    return (

        <form action={handleAction} className="flex flex-col w-full bg-white rounded-md p-8">

            <section className="flex items-start space-x-40">
                <div className="flex flex-col space-y-6 w-72 md:w-96">

                    <div className='flex items-center bg-lightgray rounded-md w-fit p-2 space-x-3'>
                        <p>{`https://www.yahalawa.net/recipe/${recette.id}`}</p>
                        {!copied
                        ?
                        <Copy 
                            onClick={handleCopy}
                            size="18"
                            className='cursor-pointer hover:text-blue duration-300' 
                         />
                        :
                        <CircleCheck size="20" className="text-green" />
                        }
                    </div>

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Statut : <span className='text-red text-lg'>*</span></p>
                        <Select
                            options={[
                                { value: 'publiée', label: 'publiée' },
                                { value: 'non publiée', label: 'non publiée' },
                                { value: 'brouillon', label: 'brouillon' },
                                { value: 'programmée', label: 'programmée' }
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

                    <div className='relative'>
                        <p className="text-sm mb-1 text-[#94a3b8]">IdI : <span className='text-red text-lg'>*</span></p>
                        <input
                            type="text"
                            name="IdI"
                            className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            defaultValue={recette.id_intern}
                        />
                    </div>

                    <div className='relative'>
                        <p className="text-sm mb-1 text-[#94a3b8]">Titre : <span className='text-red text-lg'>*</span></p>
                        <input
                            type="text"
                            name="title"
                            className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            defaultValue={recette.title}
                        />
                    </div>

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Description : <span className='text-red text-lg'>*</span></p>
                        <textarea
                            rows="4"
                            className="p-2.5 w-72 md:w-96 resize-none rounded-md border border-gray outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            name='description'
                            defaultValue={recette.description}
                        >
                        </textarea>
                    </div>

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Type : <span className='text-red text-lg'>*</span></p>
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
                        <p className="text-sm mb-1 text-[#94a3b8]">Categorie : <span className='text-red text-lg'>*</span></p>
                        <Select
                            options={categoryList.map((el, i) => ({
                                value: el.title,
                                label: el.title,
                                id: i
                            }))}
                            onChange={handleCategorie}
                            value={categorie}
                            placeholder=""
                            className="w-72 md:w-96"
                            classNamePrefix="my-react-select"
                            isClearable={true}
                            isMulti
                            components={{ IndicatorSeparator: () => null }}
                        />
                    </div>


                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Tags : <span className='text-red text-lg'>*</span></p>
                        <Select
                            options={tagsList.map((el, i) => ({
                                value: el.title,
                                label: el.title,
                                id: i
                            }))}
                            onChange={handleTags}
                            value={tag}
                            placeholder=""
                            className="w-72 md:w-96"
                            classNamePrefix="my-react-select"
                            isClearable={true}
                            isMulti
                            components={{ IndicatorSeparator: () => null }}
                        />
                    </div>

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Difficulté : <span className='text-red text-lg'>*</span></p>
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
                        <div>
                            <p className="text-sm mb-1 text-[#94a3b8]">Temps de cuisson : <span className='text-red text-lg'>*</span></p>
                            <input
                                type="number"
                                name="cooking_time"
                                className="w-[180px] rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                                defaultValue={recette.cooking_time}
                            />
                        </div>

                        <div>
                            <p className="text-sm mb-1 text-[#94a3b8]">Portion : <span className='text-red text-lg'>*</span></p>
                            <input
                                type="number"
                                name="nbr_serves"
                                className="w-[180px] rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                                defaultValue={recette.nbr_serves}
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <div className='relative'>
                            <p className="text-sm mb-1 text-[#94a3b8]">Temperature :</p>
                            <input
                                type="number"
                                name="cooking_temperature"
                                className="w-[180px] rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                                defaultValue={recette.cooking_temperature}
                            />
                        </div>

                        <div>
                            <p className="text-sm mb-1 text-[#94a3b8]">Temps de preparation :</p>
                            <input
                                type="number"
                                name="preparation_time"
                                className="w-[180px] rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                                defaultValue={recette.preparation_time}
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
                            placeholder=""
                            className="w-72 md:w-96"
                            classNamePrefix="my-react-select"
                            isClearable={true}
                            isMulti
                            components={{ IndicatorSeparator: () => null }}
                        />
                    </div>


                    <Ingredientform newIngredientList={newIngredientList} setNewIngredientList={setNewIngredientList} unitList={unitList} allIngredients={allIngredients} recette={recette} />

                    <RecetteLieeForm ustensileList={ustensileList} lienRecetteList={recette.relatedRecipe} setLienRecetteList={setLienRecetteList} />

                </div>


                {/* second part---------------------------------------------------------------------------- */}
                <div className="flex flex-col space-y-8 w-72 md:w-[470px]">

                    <div>
                        <p className="font-semibold">Upload media:</p>
                        <div className="md:flex items-center justify-between flex-wrap mb-6 mt-2 ">
                            <UploadFile type="image" name="img" accept="image/jpeg, image/png, image/webp"
                            />
                            <UploadFile type="video" name="video" accept="video/mp4, video/webm, video/ogg, video/avi, video/mpeg"
                            />
                            {
                                recette.imgPath
                                    ?
                                    <Suspense fallback={<Skeleton className="w-16 h-32" />}>
                                        <Image src={`${recette.imgPath}`} alt="img" width='75' height='75' />
                                    </Suspense>
                                    :
                                    <span>&#128683;</span>
                            }
                        </div>
                    </div>

                    <InstructionForm recette={recette} newInstructionList={newInstructionList} setNewInstructionList={setNewInstructionList} />

                    <div className='fixed right-6 shadow-lg rounded-md p-2 border-2 border-dashed'>
                        <p className="text-sm underline">Note :</p>
                        <textarea
                            rows="4"
                            className="p-2.5 w-48 h-48 resize-none rounded-md  outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            name='note'
                            defaultValue={recette.note}
                        >
                        </textarea>
                    </div>

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Likes :</p>
                        <input
                            type="number"
                            name="likes"
                            className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            defaultValue={recette.likes}
                        />
                    </div>

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Link youytube :</p>
                        <input
                            type="text"
                            name="video_link"
                            className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            defaultValue={recette.video_link}
                        />
                    </div>

                    {/* handle Date------------------------------------------------------------- */}
                    <div>
                        <p className="font-semibold mb-2 mt-6">Date de publication prévue:</p>
                        <DatePicker date={date} setDate={setDate} name="date" />
                    </div>

                    <div>
                        <p className="text-sm mb-1 text-[#94a3b8]">Rubrique :</p>
                        <input
                            type="text"
                            name="rubrique"
                            className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                            defaultValue={recette.rubrique}
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

                    <FaitNutri recette={recette} />

                    {/*Référencement Google----------------------------------------------------------- */}
                    <div>
                        <p className="font-semibold mb-2 mt-6">Référencement Google :</p>

                        <div>
                            <p className="text-sm mb-1 text-[#94a3b8]">Titre :</p>
                            <input
                                name="seoTitle"
                                className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                                defaultValue={recette.seoTitle}
                            />
                        </div>

                        <div className='mt-6'>
                            <p className="text-sm mb-1 text-[#94a3b8]">Description :</p>
                            <textarea
                                rows="4"
                                className="p-2.5 w-72 md:w-96 resize-none rounded-md border border-gray outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
                                name='seoDescription'
                                defaultValue={recette.seoDescription}>
                            </textarea>
                        </div>
                    </div>
                </div>
                <input type='hidden' name="author" value={recette.author} />
            </section>

            <input type="hidden" name="id" value={recette.id} />

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







