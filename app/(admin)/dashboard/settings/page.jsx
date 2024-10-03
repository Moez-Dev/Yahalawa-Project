import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AddForm from "./_components/AddForm"
import EditForm from "./_components/EditForm"
import DeleteForm from "./_components/DeleteForm"
import prisma from "@/lib/db"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
redirect

const Page = async () => {

    const session = await auth()
    const role = session?.user?.role

    if (role !== "SUPER_ADMIN") {
        redirect('/dashboard/home')
    }


    const allAdmin = await prisma.user.findMany({
        where: {
            OR: [
                { role: 'ADMIN' },
                { role: 'SUPER_ADMIN' }
            ]
        }
    });

    const admin = await prisma.user.findMany({
        where: {
            role: 'ADMIN',
        }
    });



    return (
        <main className='ml-12 mt-8'>

            <h1 className="text-2xl font-semibold tracking-wide mb-4">Settings</h1>

            <div className="flex items-start justify-center h-screen mb-2">
                <Tabs defaultValue="Ajouter" className="w-[500px] shadow-lg bg-white rounded-md p-6">
                    <section className="w-full flex flex-col items-center">
                        <TabsList className="flex items-center w-fit grid-cols-2">
                            <TabsTrigger value="Ajouter">Ajouter admin</TabsTrigger>
                            <TabsTrigger value="Edit">Editer admin</TabsTrigger>
                            <TabsTrigger value="Supprimer">Supprimer admin</TabsTrigger>
                        </TabsList>
                        <TabsContent value="Ajouter">
                            <AddForm />
                        </TabsContent>
                        <TabsContent value="Edit">
                            <EditForm allAdmin={allAdmin} />
                        </TabsContent>
                        <TabsContent value="Supprimer">
                            <DeleteForm admin={admin} />
                        </TabsContent>
                    </section>
                </Tabs>

            </div>
        </main>
    )
}

export default Page