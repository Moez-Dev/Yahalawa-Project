import Footer from "@/components/home/Footer";
import MobileNavbar from "@/components/home/MobileNavbar";
import Navbar from "@/components/home/Navbar";
import prisma from "@/lib/db";

const Page = async () => {

  const content = await prisma.footer.findFirst({
    select: {
      tt_terms: true,
    },
  });


  return (
    <main className="flex min-h-screen flex-col px-3 md:px-8 lg:px-32 py-8">

      <header className="w-full mb-8">
        <Navbar />
        <MobileNavbar />
      </header>

      <div className="mb-12" dangerouslySetInnerHTML={{ __html: content.tt_terms }} />

      <Footer />

    </main>
  )
}

export default Page