'use server'

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { writeFile } from 'fs/promises'
import { join } from "path"
import fs from "fs"
import cron from "node-cron"


//add recipe------------------------------------------------------------//
export async function addRecipe(formData) {
    const IdI = formData.get('IdI');
    const title = formData.get('title');
    const description = formData.get('description');
    const type = formData.get('type');
    const status = formData.get('status');
    const difficulty = formData.get('difficulty');
    const category = formData.getAll('category');
    const nbr_serves = formData.get('nbr_serves');
    const preparation_time = formData.get('preparation_time');
    const cooking_time = formData.get('cooking_time');
    const cooking_temperature = formData.get('cooking_temperature');
    const note = formData.get('note');
    const likes = formData.get('likes');
    const video_link = formData.get('video_link');
    const seoTitle = formData.get('seoTitle');
    const seoDescription = formData.get('seoDescription');
    const date = formData.get('date');
    const img = formData.get('img');
    const video = formData.get('video');
    const glucides = formData.get('glucides');
    const proteines = formData.get('proteines');
    const graisses = formData.get('graisses');
    const kcal = formData.get('kcal');
    const ingredient_title = formData.get('ingredient_title');
    const ingredientList = JSON.parse(formData.get('ingredientList'));
    const lienRecetteList = JSON.parse(formData.get('lienRecetteList'));
    const instructionList = JSON.parse(formData.get('instructionList'));
    const origineList = formData.getAll('origine');
    const tagsList = formData.getAll('tags');
    const ustensileList = formData.getAll('ustensiles');
    const rubrique = formData.get('rubrique');
    const author = formData.get('author');
    const scheduledOn = formData.get('scheduledOn');

    let sheduleDate = date ? new Date(date) : null;


    if (status === 'brouillon') {
        if (!IdI) {
            return { error: "Veuillez remplir IDI" };
        }
    }
    else {
        if (
            !IdI || !title || !description || !type || !status || tagsList.length === 0 ||
            !difficulty || !nbr_serves || !cooking_time || category.length === 0
        ) {
            return { error: "Veuillez remplir tous les champs requis" };
        }
    }


    //handle image
    let image = null;
    const bytes = await img.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const name = `${Date.now()}-${img.name}`
    const path = join('recipe_img', name)
    const fullPath = join('./public', path)

    //handle video
    let vid = null;
    const videobBytes = await video.arrayBuffer()
    const VideoBuffer = Buffer.from(videobBytes)
    const videoname = `${Date.now()}-${video.name}`;
    const videopath = join('recipe_video', videoname);
    const videoFullPath = join('./public', videopath);


    try {

        if (img.size !== 0) {
            await writeFile(fullPath, buffer)
            image = `/${path}`?.replace(/\\/g, '/')
        }
        if (video.size !== 0) {
            await writeFile(videoFullPath, VideoBuffer)
            vid = `/${videopath}`?.replace(/\\/g, '/')
        }

        await prisma.recipes.create({
            data: {
                id_intern: IdI,
                title,
                slug: title.split(' ').join('-'),
                description,
                is_paying: type,
                status,
                difficulty,
                note,
                likes: Number(likes),
                glucides: Number(glucides),
                proteines: Number(proteines),
                graisses: Number(graisses),
                kcal: Number(kcal),
                ingredient_title,
                seoTitle,
                seoDescription,
                nbr_serves: Number(nbr_serves),
                preparation_time: Number(preparation_time),
                cooking_time: Number(cooking_time),
                cooking_temperature: Number(cooking_temperature),
                total_time: Number(preparation_time) + Number(cooking_time),
                author,
                video_link,
                rank: 2,
                rubrique,
                scheduledAt: sheduleDate,
                scheduledOn,
                category: {
                    create: category.map((el) => ({
                        title: el,
                    })),
                },
                origine: {
                    create: origineList.map((el) => ({
                        title: el,
                        img: "46879"
                    })),
                },
                tags: {
                    create: tagsList.map((el) => ({
                        title: el,
                    })),
                },
                ustensiles: {
                    create: ustensileList.map((el) => ({
                        title: el,
                    })),
                },
                ingredients: {
                    create: ingredientList.map((el) => ({
                        qte_gramme: Number(el.quantite),
                        unite: el.unite,
                        ingredient: el.name,
                    })),
                },
                steps: {
                    create: instructionList.map((el, index) => ({
                        title: el.title,
                        description: el.description,
                        step: index + 1,
                    })),
                },
                relatedRecipe: {
                    create: lienRecetteList.map((el) => ({
                        name: el.name,
                        link: el.link,
                    })),
                },
                imgPath: image,
                videoPath: vid,
            },
            include: {
                category: true,
                ingredients: true,
                steps: true,
                relatedRecipe: true,
                origine: true,
                tags: true,
                ustensiles: true,
            },
        });

        revalidatePath('/dashboard/nouvelle_recette');

    } catch (error) {
        console.error(error);
    }
}



//edit recipe ----------------------------------------------------------//
export async function editRecipe(formData) {

    const IdI = formData.get('IdI');
    const title = formData.get('title');
    const description = formData.get('description');
    const type = formData.get('type');
    const status = formData.get('status');
    const difficulty = formData.get('difficulty');
    const nbr_serves = formData.get('nbr_serves');
    const preparation_time = formData.get('preparation_time');
    const cooking_time = formData.get('cooking_time');
    const cooking_temperature = formData.get('cooking_temperature');
    const note = formData.get('note');
    const likes = formData.get('likes');
    const video_link = formData.get('video_link');
    const seoTitle = formData.get('seoTitle');
    const seoDescription = formData.get('seoDescription');
    const date = formData.get('date');
    const imgData = JSON.parse(formData.get('imgData'));
    const videoData = JSON.parse(formData.get('videoData'));
    const img = formData.get('img');
    const video = formData.get('video');
    const glucides = formData.get('glucides');
    const proteines = formData.get('proteines');
    const graisses = formData.get('graisses');
    const kcal = formData.get('kcal');
    const ingredient_title = formData.get('ingredient_title');
    const ingredientList = JSON.parse(formData.get('ingredientList'));
    const lienRecetteList = JSON.parse(formData.get('lienRecetteList'));
    const instructionList = JSON.parse(formData.get('instructionList'));
    const category = JSON.parse(formData.get('category'));
    const origine = JSON.parse(formData.get('origine'));
    const tags = JSON.parse(formData.get('tag'));
    const ustensile = JSON.parse(formData.get('ustensile'));
    const author = formData.get('author');
    const rubrique = formData.get('rubrique');
    const scheduledOn = formData.get('scheduledOn');
    const id = Number(formData.get('id'));

    let sheduleDate = date ? new Date(date) : null;

    if (status === 'brouillon') {
        if (!IdI) {
            return { error: "Veuillez remplir IDI." };
        }
    }
    else {
        if (
            !IdI || !title || !description || !type || !status || tags.length === 0 ||
            !difficulty || !nbr_serves || !cooking_time || category.length === 0
        ) {
            return { error: "Veuillez remplir tous les champs requis." };
        }
    }

    //handle image
    let image = imgData ? imgData : null;
    const bytes = await img.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const name = `${Date.now()}-${img.name}`
    const path = join('recipe_img', name)
    const fullPath = join('./public', path)

    //handle video
    let vid = videoData ? videoData : null;
    const videobBytes = await video.arrayBuffer()
    const VideoBuffer = Buffer.from(videobBytes)
    const videoname = `${Date.now()}-${video.name}`;
    const videopath = join('recipe_video', videoname);
    const videoFullPath = join('./public', videopath);

    try {

        if (img.size !== 0) {
            await writeFile(fullPath, buffer)
            image = `/${path}`?.replace(/\\/g, '/')
        }
        if (video.size !== 0) {
            await writeFile(videoFullPath, VideoBuffer)
            vid = `/${videopath}`?.replace(/\\/g, '/')
        }

        await prisma.recipes.update({
            where: { id },
            data: {
                id_intern: IdI,
                title,
                slug: title.split(' ').join('-'),
                description,
                is_paying: type,
                status,
                difficulty,
                note,
                likes: Number(likes),
                glucides: Number(glucides),
                proteines: Number(proteines),
                graisses: Number(graisses),
                kcal: Number(kcal),
                ingredient_title,
                seoTitle,
                seoDescription,
                nbr_serves: Number(nbr_serves),
                preparation_time: Number(preparation_time),
                cooking_time: Number(cooking_time),
                cooking_temperature: Number(cooking_temperature),
                total_time: Number(preparation_time) + Number(cooking_time),
                author,
                video_link,
                rank: 2,
                rubrique,
                scheduledAt: sheduleDate,
                scheduledOn,
                category: {
                    deleteMany: {},
                    create: category.map((el) => ({
                        title: el.label
                    }))

                },
                origine: {
                    deleteMany: {},
                    create: origine.map((el) => ({
                        title: el.label,
                        img: "46879"
                    })),
                },
                tags: {
                    deleteMany: {},
                    create: tags.map((el) => ({
                        title: el.label,
                    })),
                },
                ustensiles: {
                    deleteMany: {},
                    create: ustensile.map((el) => ({
                        title: el.label,
                    })),
                },
                ingredients: {
                    deleteMany: {},
                    create: ingredientList.map((el) => ({
                        qte_gramme: Number(el.qte_gramme),
                        unite: el.unite,
                        ingredient: el.ingredient,
                    })),
                },
                steps: {
                    deleteMany: {},
                    create: instructionList.map((el, index) => ({
                        title: el.title,
                        description: el.description,
                        step: index + 1,
                    })),
                },
                relatedRecipe: {
                    create: lienRecetteList.map((el) => ({
                        name: el.name,
                        link: el.link,
                    })),
                },
                imgPath: image,
                videoPath: vid,
            },
            include: {
                category: true,
                ingredients: true,
                steps: true,
                relatedRecipe: true,
                origine: true,
                tags: true,
                ustensiles: true,
            },
        });

    } catch (error) {
        console.log(error)
    }
}


//delete recipe--------------------------------------------------//
export async function deleteRecipe(id) {

    try {
        // delete img
        const recipe = await prisma.recipes.findUnique({ where: { id } })
        let imgPath = recipe.imgPath
        let videoPath = recipe.videoPath

        if (imgPath) {
            fs.unlink(`public/${imgPath}`, (err) => {
                if (err) {
                    console.error(`Error removing img: ${err}`);
                    return;
                }

                console.log(`File ${imgPath} has been successfully removed.`);
            })
        };

        if (videoPath) {
            {
                fs.unlink(`public/${videoPath}`, (err) => {
                    if (err) {
                        console.error(`Error removing img: ${err}`);
                        return;
                    }

                    console.log(`File ${videoPath} has been successfully removed.`);
                })
            };
        }

        //delete recipe
        await prisma.recipes.delete({ where: { id } })
        revalidatePath('/dashboard/recettes')

    } catch (error) {
        console.log(error)
    }
};


//delete category recipe --------------------------------------------------//
export async function deleteCategorySelected(id) {

    try {
        await prisma.categoryRecipesSelected.delete({ where: { id } })

    } catch (error) {
        console.log(error)
    }
}

//delete origine recipe -------------------------------------------------//
export async function deleteOrigineSelected(id) {

    try {
        await prisma.origineRecipe.delete({ where: { id } })

    } catch (error) {
        console.log(error)
    }
}

//delete tags recipe -------------------------------------------------//
export async function deleteTagSelected(id) {

    try {
        await prisma.tagsRecipe.delete({ where: { id } })

    } catch (error) {
        console.log(error)
    }
}

//delete ustensile recipe -----------------------------------------------//
export async function deleteUstensileSelected(id) {

    try {
        await prisma.ustensilesRecipe.delete({ where: { id } })

    } catch (error) {
        console.log(error)
    }
}

//delete ingredient --------------------------------------------------//
export async function deleteIngRecipe(id) {

    try {
        await prisma.ingredientsRecipe.delete({ where: { id } })

    } catch (error) {
        console.log(error)
    }
}

//delete step recipe ---------------------------------------------//
export async function deleteStep(id) {

    try {
        await prisma.recipeSteps.delete({ where: { id } })

    } catch (error) {
        console.log(error)
    }
}


//schedule post -----------------------------------------------------//
cron.schedule('9 16 * * *', async () => {

    try {
        const scheduledRecipe = await prisma.recipes.findFirst({
            where: {
                status: 'programmée',
            },
            orderBy: {
                scheduledAt: 'desc',
            }
        });

        if (scheduledRecipe) {
            await prisma.recipes.updateMany({
                where: {
                    scheduledAt: { lte: scheduledRecipe.scheduledAt },
                    status: 'programmée',
                },
                data: {
                    status: 'publiée',
                }
            })


            //get topic by rubrique name
            const topic = await prisma.topics.findFirst({
                where: { 
                    title: scheduledRecipe.rubrique,
                    type: scheduledRecipe.scheduledOn
                 }
            })

            //increment  recipeOrder 
            await prisma.topicsSection.updateMany({
                where: { topicsId: topic.id },
                data: {
                    recipeOrder: {
                        increment: 1 
                    }
                }
            });

            //insert recipe in topic
            await prisma.topicsSection.create({
                data: {
                    idi: scheduledRecipe.id_intern,
                    recipeId: Number(scheduledRecipe.id),
                    recipeOrder: 0,
                    topicsId: topic.id
                }
            });
        }

    } catch (error) {
        console.log('Failed to post schedule date', error)
    }
});




