'use server'

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

//----update order---------------------------------------------//
export async function editItems(newOrder) {

  try {
    for (let i = 0; i < newOrder.length; i++) {
      await prisma.subEditableMenu.update({
        where: { id: newOrder[i].id },
        data: { order: i },
      });
      revalidatePath('/dashboard/gestion_menu')
    }
    return { success: true };
  } catch (error) {
    console.error('Failed to update order', error);
  }
};


//----add items----------------------------------------------//
export async function addItem(formData) {
  const id = formData.get('id')
  const item = formData.get('item')

  if (item === "") {
    return { error: "Veuillez remplir tous les champs requis." }
  }

  //send data
  try {

    //catch order number
    const itemCount = await prisma.subEditableMenu.count({
      where: { editableMenuId: Number(id) },
    })

    await prisma.subEditableMenu.create({
      data: {
        title: item,
        order: itemCount,
        editableMenu: {
          connect: { id: Number(id) },
        },
      }
    })
    revalidatePath('/dashboard/gestion_menu')

  } catch (error) {
    console.error('Failed to create item', error)
  }
};

//---Delete item----------------------------------------------------//

export async function deleteItems(id) {

  try {
    await prisma.subEditableMenu.delete({ where: { id } })
    revalidatePath('/dashboard/gestion_menu')

  } catch (error) {
    console.error('Failed to delete item', error)
  }
}