'use server'

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"


//create recipe topic---------------------------------------------//
export async function newTopic(formData, type) {

    const title = formData.get('title')
    const recette = formData.getAll('recette')

    if (!title || recette.length === 0) {
        return { error: "Veuillez remplir tous les champs requis." }
    }

    //split id & name
    const recipes = recette.map((value) => {
        const [id, IdI] = value.split('|');
        return { id, IdI };
    });

    try {

        await prisma.topics.create({
            data: {
                title,
                order: 0,
                type: type,
                section: {
                    create: recipes.map((el, index) => ({
                        idi: el.IdI,
                        recipeOrder : index + 1,
                        recipeId: parseInt(el.id)
                    }))
                }
            }
        });

        revalidatePath('/dashboard/rubriques_recettes')

    } catch (error) {
        console.log("failed to create topic", error)
    };
};

//update recipe topic------------------------------------------------//
export async function updateTopic(formData) {

    const title = formData.get('title')
    const recette = formData.getAll('recette')
    const id = formData.get('id')

    if (!title || recette.length === 0) {
        return { error: "Veuillez remplir tous les champs requis." }
    }

    const recipes = recette.map((value) => {
        const [id, IdI] = value.split('|');
        return { id, IdI };
    });


    try {
        await prisma.topics.update({
            where: { id },
            data: {
                title,
                section: {
                    deleteMany: {},
                    create: recipes.map((el, index) => ({
                        idi: el.IdI,
                        recipeOrder : index + 1,
                        recipeId: parseInt(el.id)
                    }))
                }
            }
        });

        revalidatePath('/dashboard/rubriques_recettes')

    } catch (error) {
        console.log("failed to update topic", error)
    };
};


//delete topic-------------------------------------------------//
export async function deleteTopic(id) {
    try {
        await prisma.topics.delete({ where: { id } })
        revalidatePath('/dashboard/rubriques_recettes')
  
      } catch (error) {
          console.log(error)
      }
}

//delete topics section ----------------------------------------//
export async function deleteSection(id) {
    try {
        await prisma.topicsSection.delete({ where: { id } })
  
      } catch (error) {
          console.log(error)
      }
}


//----topic order---------------------------------------------//
export async function editTopicOrder(newOrder) {

    try {
      for (let i = 0; i < newOrder.length; i++) {
        await prisma.topics.update({
          where: { id: newOrder[i].id },
          data: { order: i },
        });
        revalidatePath('/dashboard/rubriques_recettes')
      }
      return { success: true };
    } catch (error) {
      console.error('Failed to update order', error);
    }
  };


//----recipe order---------------------------------------------//
export async function editRecipeTopic(newOrder) {

    try {
      for (let i = 0; i < newOrder.length; i++) {
        await prisma.topicsSection.update({
          where: { id: newOrder[i].id },
          data: { recipeOrder: i },
        });
        revalidatePath('/dashboard/rubriques_recettes')
      }
      return { success: true };
    } catch (error) {
      console.error('Failed to update order', error);
    }
  };


// TIPS------------------------------------------------------------------------------------------------//
//create recipe topic---------------------------------------------//
export async function newTopicTip(formData, type) {

    const title = formData.get('title')
    const tips = formData.getAll('tips')

    if (!title || tips.length === 0) {
        return { error: "Veuillez remplir tous les champs requis." }
    }

    //split id & name
    const allTips = tips.map((value) => {
        const [id, IdI] = value.split('|');
        return { id, IdI };
    });

    try {

        await prisma.topicsTip.create({
            data: {
                title,
                order: 0,
                type: type,
                section: {
                    create: allTips.map((el, index) => ({
                        idi: el.IdI,
                        tipsOrder : index + 1,
                        tipsId: parseInt(el.id)
                    }))
                }
            }
        });

        revalidatePath('/dashboard/rubriques_tips')

    } catch (error) {
        console.log("failed to create topic", error)
    };
};

//update recipe topic------------------------------------------------//
export async function updateTopicTip(formData) {

    const title = formData.get('title')
    const tips = formData.getAll('tips')
    const id = formData.get('id')

    if (!title || tips.length === 0) {
        return { error: "Veuillez remplir tous les champs requis." }
    }

    const allTtips = tips.map((value) => {
        const [id, IdI] = value.split('|');
        return { id, IdI };
    });


    try {
        await prisma.topicsTip.update({
            where: { id },
            data: {
                title,
                section: {
                    deleteMany: {},
                    create: allTtips.map((el, index) => ({
                        idi: el.IdI,
                        tipsOrder : index + 1,
                        tipsId: parseInt(el.id)
                    }))
                }
            }
        });

        revalidatePath('/dashboard/rubriques_tips')

    } catch (error) {
        console.log("failed to update topic", error)
    };
};


//delete topic tips-------------------------------------------------//
export async function deleteTopicTip(id) {
    try {
        await prisma.topicsTip.delete({ where: { id } })
        revalidatePath('/dashboard/rubriques_tips')
  
      } catch (error) {
          console.log(error)
      }
}

//delete topics tips section ----------------------------------------//
export async function deleteTipSection(id) {
    try {
        await prisma.topicsTipSection.delete({ where: { id } })
  
      } catch (error) {
          console.log(error)
      }
}

//----topic tips order---------------------------------------------//
export async function editTopicTipOrder(newOrder) {

    try {
      for (let i = 0; i < newOrder.length; i++) {
        await prisma.topicsTip.update({
          where: { id: newOrder[i].id },
          data: { order: i },
        });
        revalidatePath('/dashboard/rubriques_tips')
      }
      return { success: true };
    } catch (error) {
      console.error('Failed to update order', error);
    }
  };


//----tips order---------------------------------------------//
export async function editTipSection(newOrder) {

    try {
      for (let i = 0; i < newOrder.length; i++) {
        await prisma.topicsTipSection.update({
          where: { id: newOrder[i].id },
          data: { tipsOrder: i },
        });
        revalidatePath('/dashboard/rubriques_tips')
      }
      return { success: true };
    } catch (error) {
      console.error('Failed to update order', error);
    }
  };
