'use server'

import { signIn, signOut } from "@/auth"
import prisma from "@/lib/db"
import { saltAndHashPassword } from "@/components/SaltAndHashPassword"
import { revalidatePath } from "next/cache"

//register---------------------------------------------//
export async function adminRegister(formData) {

  const name = formData.get("name")
  const email = formData.get("email")
  const password = formData.get("password")

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      const hash = saltAndHashPassword(password)
      await prisma.user.create({
        data: {
          name,
          email,
          password: hash,
          emailChecked: true,
          role: "ADMIN"
        }
      })
    }
    else {
      return { error: "Cette email existe deja !!" }
    }

  } catch (error) {
    console.log(error)
  }
};


//LOGIN---------------------------------------------------------// 
export async function adminLog(formData) {

  const email = formData.get("email")
  const password = formData.get("password")

  const user = await prisma.user.findUnique({
    where: {
      email: email,
      OR: [
        { role: "SUPER_ADMIN" },
        { role: "ADMIN" }
      ]
    }
  });

  if (!user) {
    return { error: "Identifiants incorrects." }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false
    });

  } catch (error) {
    console.error("Server error:", error);
    return { error: error.message || "An unexpected error occurred." };

  }
};

// logout -----------------------------------------------------------//
export async function adminLogout() {
  await signOut({ redirectTo: "/adminAuth" });
}


//edit  ---------------------------------------------------------//
export async function editAdmin(formData) {

  const email = formData.get('email')
  const name = formData.get('name')
  const new_password = formData.get('new_password')

  try {
    const hash = saltAndHashPassword(new_password)

    await prisma.user.update({
      where: { email },
      data: {
        name,
        email,
        password: hash
      }
    })

  } catch (error) {
    console.log(error)
  }
};


//supprimer  ----------------------------------------------//
export async function deletAdmin(formData) {

  const email = formData.get('email')

  try {
    await prisma.user.delete({ where: { email } })
    revalidatePath('/dashboard/settings')

  } catch (error) {
    console.log(error)
  }

};
