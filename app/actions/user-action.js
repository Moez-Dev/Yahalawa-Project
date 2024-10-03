'use server'

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { revalidateTag } from 'next/cache'


//like recipe-----------------------------------------------------------------//
export async function likeRecipe(userId, recipeId) {
  try {
    const existingLike = await prisma.userLike.findFirst({
      where: {
        userId: userId,
        recipeId: recipeId,
      },
    });

    let liked;
    if (existingLike) {
      await prisma.userLike.delete({
        where: {
          id: existingLike.id,
        },
      });
      liked = false;

    } else {
      await prisma.userLike.create({
        data: {
          userId: userId,
          recipeId: recipeId,
        },
      });
      liked = true;
    }

    revalidatePath('/tags')
    return { liked }

  } catch (error) {
    console.error('Erreur lors du like de la recette:', error);
  }
};


//Save recipe--------------------------------------------------------------//
export async function saveRecipe(userId, recipeId) {
  try {
    const existingSave = await prisma.userRecipe.findFirst({
      where: {
        userId: userId,
        recipeId: recipeId,
      },
    });

    let saved;
    if (existingSave) {
      await prisma.userRecipe.delete({
        where: {
          id: existingSave.id,
        },
      });
      saved = false;

    } else {
      await prisma.userRecipe.create({
        data: {
          userId: userId,
          recipeId: recipeId,
        },
      });
      saved = true;
    }
    revalidatePath('/tags')
    return { saved }

  } catch (error) {
    console.error('Erreur lors du save de la recette:', error);
  }
};



//like tip-----------------------------------------------------------------//
export async function likeTip(userId, tipId) {

  try {
    const existingLike = await prisma.userTipsLike.findFirst({
      where: {
        userId: userId,
        tipId: tipId,
      },
    });
    console.log(existingLike)

    let liked;
    if (existingLike) {
      await prisma.userTipsLike.delete({
        where: {
          id: existingLike.id,
        },
      });
      liked = false;

    } else {
      await prisma.userTipsLike.create({
        data: {
          userId: userId,
          tipId: tipId,
        },
      });
      liked = true;
    }

    revalidateTag('tipLike') 
    return { liked }

  } catch (error) {
    console.error('Erreur lors du like de la recette:', error);
  }
};


//Save tips--------------------------------------------------------------//
export async function saveTip(userId, tipId) {
  try {
    const existingSave = await prisma.userTips.findFirst({
      where: {
        userId: userId,
        tipId: tipId,
      },
    });

    let saved;
    if (existingSave) {
      await prisma.userTips.delete({
        where: {
          id: existingSave.id,
        },
      });
      saved = false;

    } else {
      await prisma.userTips.create({
        data: {
          userId: userId,
          tipId: tipId,
        },
      });
      saved = true;
    }
    revalidateTag('tipSave')
    return { saved }

  } catch (error) {
    console.error('Erreur lors du save de la recette:', error);
  }
};

