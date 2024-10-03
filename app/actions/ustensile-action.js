'use server'

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"


//add
export async function addUstensile(formData) {

    const title = formData.get('title')

    if(title === "") {
        return { error: "Veuillez remplir tous les champs requis." }
    }

    try {
        await prisma.ustensiles.create({
            data: { title }
        })
        revalidatePath('/dashboard/ustensiles')

    } catch (error) {
        console.log(error)
    }
}

//edit
export async function editUstensile(formData) {

    const title = formData.get('title')
    const id = Number(formData.get('id'))

    if(title === "") {
        return { error: "Veuillez remplir tous les champs requis." }
    }

    try {
      await prisma.ustensiles.update({
        where: { id },
        data: { title }
      })
      revalidatePath('/dashboard/ustensiles')

    } catch (error) {
        console.log(error)
    }
}

//delete
export async function deleteUstensile(id) {

    try {
        await prisma.ustensiles.delete({ where: { id } })
        revalidatePath('/dashboard/unites')
  
      } catch (error) {
          console.log(error)
      }
}