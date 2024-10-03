'use client'

import { useState, useEffect } from "react"
import { Bookmark } from "lucide-react";
import { saveRecipe } from "@/app/actions/user-action";


const Saves = ({id, userId, userRecipes}) => {

    const [isSaved, setIsSaved] = useState(false);

    //get saves
    useEffect(() => {
        
        const saves = userRecipes.some(el => el.userId === userId)
        if (saves) {
            setIsSaved(true)
        }

    }, [userId]);

    //handle save
    const handleSave = async () => {

        try {
            const result = await saveRecipe(userId, id)
            if (result && result.saved !== undefined) {
                setIsSaved(result.saved)
            } else {
                console.error('Erreur: Aucun résultat de save reçu.')
            }
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <div className="flex items-center justify-between text-darkblue mt-4">
            <Bookmark
                onClick={handleSave}
                className={`${isSaved && 'text-red'} size-5 cursor-pointer hover:text-blue duration-300`}
            />
        </div>
    )
}

export default Saves