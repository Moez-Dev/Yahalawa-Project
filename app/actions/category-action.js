'use server'

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"


//add
export async function addCategory(formData) {

    const title = formData.get('title')
    const status = formData.get('status')
    const description = formData.get('description')
    const seoTitle = formData.get('seoTitle')
    const seoDescription = formData.get('seoDescription')


    if(title === "" || status === "") {
        return { error: "Veuillez remplir tous les champs requis." }
    }

    try {
            await prisma.category.create({
                data: { title, seoTitle, description, seoDescription, status }
            })
            revalidatePath('/dashboard/categories')

    } catch (error) {
        console.log(error)
    }
}


//edit
export async function editCategory(formData) {

    const title = formData.get('title')
    const status = formData.get('status')
    const description = formData.get('description')
    const seoTitle = formData.get('seoTitle')
    const seoDescription = formData.get('seoDescription')
    const id = Number(formData.get('id'))

    
    if(title === "" || status === "") {
        return { error: "Veuillez remplir tous les champs requis." }
    }

    try {
            await prisma.category.update({
                where: { id },
                data: { title, seoTitle, description, seoDescription, status }
            })
            revalidatePath('/dashboard/categories')

    } catch (error) {
        console.log(error)
    }
}


//delete
export async function deleteCategory(id) {

    try {
        await prisma.category.delete({ where: { id } })
        revalidatePath('/dashboard/categories')
  
      } catch (error) {
          console.log(error)
      }
}