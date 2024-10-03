'use server'

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"


//add
export async function addUnit(formData) {

    const title = formData.get('title')

    if(title === "") {
        return { error: "Veuillez remplir tous les champs requis." }
    }

    try {
        await prisma.unit.create({
            data: { title }
        })
        revalidatePath('/dashboard/unites')

    } catch (error) {
        console.log(error)
    }
}

//edit
export async function editUnit(formData) {

    const title = formData.get('title')
    const id = Number(formData.get('id'))

    if(title === "") {
        return { error: "Veuillez remplir tous les champs requis." }
    }

    try {
      await prisma.unit.update({
        where: { id },
        data: { title }
      })
      revalidatePath('/dashboard/unites')

    } catch (error) {
        console.log(error)
    }
}

//delete
export async function deleteUnit(id) {

    try {
        await prisma.unit.delete({ where: { id } })
        revalidatePath('/dashboard/unites')
  
      } catch (error) {
          console.log(error)
      }
}