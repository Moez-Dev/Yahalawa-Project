'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bookmark, Heart } from "lucide-react"
import lock from "@/public/home/lock.svg"
import { likeTip, saveTip } from "@/app/actions/user-action"

const TipCard = ({ el, session }) => {

    const userId = session?.user?.id
    const tipId = el.id
    const notPremium =  session?.user?.role !== "T_TELECOM"

    const [isSaved, setIsSaved] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        //get likes
        const likes = el.userTipsLike.some(el => el.userId === userId)
        if (likes) {
            setIsLiked(true)
        }

        //get saves
        const saves = el.userTips.some(el => el.userId === userId)
        if (saves) {
            setIsSaved(true)
        }

    }, [userId, tipId]);



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
            const result = await likeTip(userId, tipId)
            if (result && result.liked !== undefined) {
                setIsLiked(result.liked)
            } else {
                console.error('Erreur: Aucun résultat de like reçu.')
            }
        } catch (error) {
            console.error('Erreur lors du like:', error)
        }
    };

    //handle save
    const handleSave = async () => {

        try {
            const result = await saveTip(userId, tipId)
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
        <div dir="rtl" className="relative w-[280px] mx-10 my-6 hover:scale-[1.02] duration-300">

            <div className="relative w-[280px] h-[350px]">
                <Link href={(el.is_paying === 'T-Telecom' &&  notPremium) ? '/premium/login' : `/tip/${el.id}`}>
                    <Image
                        src={el.img}
                        alt="tip image"
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="rounded-sm cardBorder w-full h-auto"
                    />

                    {
                        (el.is_paying !== "Free" &&  notPremium) &&
                        <Image
                            src={lock}
                            alt="img"
                            className="absolute top-4 left-3 text-white"
                        />
                    }
                </Link>
            </div>

            <div className="p-2">
                <div className="flex items-start justify-between text-darkblue mt-2">
                    <p className="text-[22px] w-64 overflow-hidden line-clamp-2">{el.title}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={handleSave} className={`${isSaved ? "bookMarkSaved" : "bookMarkCard"  } pt-1.5`}  width="1.7em" height="1.7em" viewBox="0 0 24 24"><path fill="none"  d="M4 9c0-2.828 0-4.243.879-5.121C5.757 3 7.172 3 10 3h4c2.828 0 4.243 0 5.121.879C20 4.757 20 6.172 20 9v6.828c0 2.683 0 4.024-.844 4.435c-.845.41-1.9-.419-4.01-2.076l-.675-.531c-1.186-.932-1.78-1.398-2.471-1.398s-1.285.466-2.471 1.398l-.676.53c-2.11 1.658-3.164 2.487-4.009 2.077C4 19.853 4 18.51 4 15.828z" />
                    </svg>
                </div>

                <Link href={`/tip_category/${el.category[0]?.title}`}
                    className="categoryTitle text-lg mt-1.5 w-fit block hover:opacity-70 duration-300"
                >
                        {el.category && el.category[0]?.title}
                </Link>

                <div className="flex items-center likeColor">
                    <Heart
                        onClick={handleLike}
                        className={`${isLiked && 'text-red'} size-3 ml-1 cursor-pointer`}
                    />
                    <span>{formatNumber(el.likes + el.userTipsLike.length)}</span>
                </div>

            </div>
        </div>
    )
}

export default TipCard