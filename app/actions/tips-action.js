'use server'

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { writeFile } from 'fs/promises'
import { join } from "path"
import fs from "fs"
import cron from "node-cron"


//add tips --------------------------------------------------------//
export async function addTips(formData) {

    const IdI = formData.get('IdI')
    const title = formData.get('title')
    const description = formData.get('description')
    const type = formData.get('type')
    const status = formData.get('status')
    const category = formData.getAll('category')
    const note = formData.get('note')
    const likes = formData.get('likes')
    const seoTitle = formData.get('seoTitle')
    const seoDescription = formData.get('seoDescription')
    const date = formData.get('date')
    const img = formData.get('img')
    const video = formData.get('video')
    const video_link = formData.get('video_link')
    const author = formData.get('author')
    const rubrique = formData.get('rubrique')
    const scheduledOn = formData.get('scheduledOn')

    let sheduleDate = date ? new Date(date) : null;


    if (status === 'brouillon') {
        if (!IdI) {
            return { error: "Veuillez remplir IDI" };
        }
    }
    else {
        if(!IdI || !title || !description || !type || !status || category.length === 0) {
            return { error: "Veuillez remplir tous les champs requis" }
        }
    }


    //handle image
    let image = null;
    const bytes = await img.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const name = `${Date.now()}-${img.name}`
    const path = join('tips_img', name)
    const fullPath = join('./public', path)

    //handle video
    let vid = null;
    const videobBytes = await video.arrayBuffer()
    const VideoBuffer = Buffer.from(videobBytes)
    const videoname = `${Date.now()}-${video.name}`;
    const videopath = join('tips_video', videoname);
    const videoFullPath = join('./public', videopath);


    try {
        if (img.size !== 0) {
            await writeFile(fullPath, buffer)
            image = `/${path}`?.replace(/\\/g, '/') 
        }
        if (video.size !== 0) {
            await writeFile(videoFullPath, VideoBuffer)
            vid =`/${videopath}`?.replace(/\\/g, '/')
        }

        // send data
        await prisma.tips.create({
            data: { 
                id_intern: IdI, 
                title,
                slug : title.split(' ').join('-'), 
                author,
                description,
                is_paying: type, 
                status,
                note, 
                likes: Number(likes),
                seoTitle,
                seoDescription,
                img: image,
                video: vid,
                video_link,
                rubrique,
                scheduledAt: sheduleDate,
                scheduledOn,
                category: {
                    create: category.map((el) => ({
                      title: el,
                    })),
                  },
            },
            include: {
                category: true
            }
        })

revalidatePath('/dashboard/nouvelle_astuce')

    } catch (error) {
    console.log(error)
}
};


//edit tips ----------------------------------------------------------//
export async function editTips(formData) {

    const IdI = formData.get('IdI')
    const title = formData.get('title')
    const description = formData.get('description')
    const type = formData.get('type')
    const status = formData.get('status')
    const category = JSON.parse(formData.get('category'))
    const note = formData.get('note')
    const likes = formData.get('likes')
    const seoTitle = formData.get('seoTitle')
    const seoDescription = formData.get('seoDescription')
    const imgData = JSON.parse(formData.get('imgData'))
    const videoData = JSON.parse(formData.get('videoData'))
    const img = formData.get('img')
    const video = formData.get('video')
    const video_link = formData.get('video_link')
    const date = formData.get('date')
    const author = formData.get('author')
    const rubrique = formData.get('rubrique')
    const scheduledOn = formData.get('scheduledOn')
    const id = Number(formData.get('id'))

    let sheduleDate = date ? new Date(date) : null;
    

    if(!IdI || !title || !description || !type || !status || category.length === 0) {
        return { error: "Veuillez remplir tous les champs requis." }
    }


        //handle image
        let image = imgData ? imgData : null;
        const bytes = await img.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const name = `${Date.now()}-${img.name}`
        const path = join('tips_img', name)
        const fullPath = join('./public', path)
    
        //handle video
        let vid = videoData ? videoData : null;
        const videobBytes = await video.arrayBuffer()
        const VideoBuffer = Buffer.from(videobBytes)
        const videoname = `${Date.now()}-${video.name}`;
        const videopath = join('tips_video', videoname);
        const videoFullPath = join('./public', videopath);


    try {

        if (img.size !== 0) {
            await writeFile(fullPath, buffer)
            image = `/${path}`?.replace(/\\/g, '/') 
        }
        if (video.size !== 0) {
            await writeFile(videoFullPath, VideoBuffer)
            vid =`/${videopath}`?.replace(/\\/g, '/')
        }

        await prisma.tips.update({
            where: { id },
            data: { 
                id_intern: IdI,
                title,
                description,
                is_paying: type,
                status,
                author,  
                note, 
                likes: Number(likes),
                seoTitle,
                seoDescription,
                img: image,
                video: vid,
                video_link,
                rubrique,
                scheduledAt: sheduleDate,
                scheduledOn,
                category: {
                    deleteMany: {},
                    create: category.map((el) => ({
                        title: el.label
                      }))
              
                  }  
                },
                include: {
                    category: true
                }
        })
        revalidatePath('/dashboard/update_astuce')

    } catch (error) {
        console.log(error)
    }
};


//delete tips --------------------------------------------------------//
export async function deleteTips(id) {

    try {

        // delete img
        const tips = await prisma.tips.findUnique({where: { id }})
        let imgPath = tips.img
        let videoPath = tips.video_link

        if(imgPath)
            {fs.unlink(`public/${imgPath}`, (err) => {
            if (err) {
              console.error(`Error removing img: ${err}`);
              return;
            }
          
            console.log(`File ${imgPath} has been successfully removed.`);
          })};

          if(videoPath) {
            {fs.unlink(`public/${videoPath}`, (err) => {
                if (err) {
                  console.error(`Error removing img: ${err}`);
                  return;
                }
              
                console.log(`File ${videoPath} has been successfully removed.`);
              })};
          }

        //delete tips
        await prisma.tips.delete({ where: { id } })
        revalidatePath('/dashboard/gestion_tips')

    } catch (error) {
        console.log(error)
    }
}


//delete category tips --------------------------------------------------------------//
export async function deleteCategorySelected(id) {

    try {
        await prisma.categoryTipsSelected.delete({ where: { id } })
        revalidatePath('/dashboard/update_astuce')
  
      } catch (error) {
          console.log(error)
      }
}



//schedule tips -----------------------------------------------------//
cron.schedule('7 13 * * *', async () => {

    try {
        const scheduledTips = await prisma.tips.findFirst({
            where: {
                status: 'programmée',
            },
            orderBy: {
                scheduledAt: 'desc',
            }
        });


        if (scheduledTips) {
            await prisma.tips.updateMany({
                where: {
                    scheduledAt: { lte: scheduledTips.scheduledAt },
                    status: 'programmée',
                },
                data: {
                    status: 'publiée',
                }
            })


            //get topic by rubrique name
            const topic = await prisma.topicsTip.findFirst({
                where: { 
                    title: scheduledTips.rubrique,
                    type: scheduledTips.scheduledOn
                 }
            })

            //increment tipsOrder 
            await prisma.topicsTipSection.updateMany({
                where: { topicsTipId: topic.id },
                data: {
                    tipsOrder: {
                        increment: 1 
                    }
                }
            });

            //insert recipe in topic
            await prisma.topicsTipSection.create({
                data: {
                    idi: scheduledTips.id_intern,
                    tipsId: Number(scheduledTips.id),
                    tipsOrder: 0,
                    topicsTipId: topic.id
                }
            });
        }

    } catch (error) {
        console.log('Failed to post schedule date', error)
    }
});