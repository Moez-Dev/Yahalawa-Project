'use server'

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"


//edit yahalawa terms 
export async function editTerms(formData) {

    const yahalawa_terms = formData.get('terms')
    const id = Number(formData.get('id'))

    try {
        await prisma.footer.update({
            where: { id },
            data: { yahalawa_terms }
        })

        revalidatePath('/dashboard/yahalawa_terms')

    } catch (error) {
        console.log(error)
    }
}


//edit TT terms 
export async function editTTTerms(formData) {

    const tt_terms = formData.get('tt_terms')
    const id = Number(formData.get('id'))

    try {
        await prisma.footer.update({
            where: { id },
            data: { tt_terms }
        })

        revalidatePath('/dashboard/TT_terms')

    } catch (error) {
        console.log(error)
    }
};


//edit about 
export async function editAbout(formData) {

    const about = formData.get('about')
    const id = Number(formData.get('id'))

    try {
        await prisma.footer.update({
            where: { id },
            data: { about }
        })

        revalidatePath('/dashboard/yahalawa_terms')

    } catch (error) {
        console.log(error)
    }
};