'use client'

import { likeRecipe } from "@/app/actions/user-action";
import { Heart } from "lucide-react"
import { useState, useEffect } from "react"


const Likes = ({ likes, userLikes, userId, id }) => {

    const [isLiked, setIsLiked] = useState(false);

    //get likes
    useEffect(() => {
        const likes = userLikes.some(el => el.userId === userId)
        if (likes) {
            setIsLiked(true)
        }
    }, [userId]);

    //convert likes format 
    const formatNumber = (num) => {
        if (num >= 1000) {
            const thousands = Math.floor(num / 1000);
            const rest = num % 1000;

            const restFormatted = rest.toString().slice(0, 3);

            return `${thousands}k${restFormatted}`;
        }
        return num.toString();
    };

    //handle like
    const handleLike = async () => {

        try {
            const result = await likeRecipe(userId, id)
            if (result && result.liked !== undefined) {
                setIsLiked(result.liked)
            } else {
                console.error('Erreur: Aucun résultat de like reçu.')
            }
        } catch (error) {
            console.error('Erreur lors du like:', error)
        }
    };


    return (
        <div className="flex items-center likeColor">
            <Heart
                onClick={handleLike}
                className={`${isLiked && 'text-red'} size-3 ml-1 cursor-pointer`}
            />
            <span>{formatNumber(likes + userLikes.length)}</span>
        </div>
    )
}

export default Likes