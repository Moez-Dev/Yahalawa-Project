'use server'


import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"


//add
export async function addCategoryTips(formData) {

    const title = formData.get('title')
    const status = formData.get('status')

    if(title === "" || status === "") {
        return { error: "Veuillez remplir tous les champs requis." }
    }

    try {
            await prisma.categoryTips.create({
                data: { title, status }
            })
            revalidatePath('/dashboard/categories_tips')

    } catch (error) {
        console.log(error)
    }
}


//edit
export async function editCategoryTips(formData) {

    const title = formData.get('title')
    const status = formData.get('status')
    const id = Number(formData.get('id'))

    if(title === "" || status === "") {
        return { error: "Veuillez remplir tous les champs requis." }
    }

    try {
            await prisma.categoryTips.update({
                where: { id },
                data: { title, status }
            })
            revalidatePath('/dashboard/categories_tips')

    } catch (error) {
        console.log(error)
    }
}


//delete
export async function deleteCategoryTips(id) {

    try {
        await prisma.categoryTips.delete({ where: { id } })
        revalidatePath('/dashboard/categories_tips')
  
      } catch (error) {
          console.log(error)
      }
}