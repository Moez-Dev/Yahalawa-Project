'use server'

import { signIn, signOut } from "@/auth"
import { saltAndHashPassword } from "@/components/SaltAndHashPassword"
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'


//log with social--------------------------------------------------//
export async function doSocialLogin(formData) {
  const action = formData.get('action');
  await signIn(action, { redirectTo: "/" });
}

// logout-----------------------------------------------------------//
export async function doLogout() {
  await signOut({ redirectTo: "/login" });
}

// logout TT-----------------------------------------------------------//
export async function LogoutTT() {
  await signOut({ redirectTo: "/premium/login" });
}

//register with credentials-------------------------------------------//
export async function register(formData) {

  //get data
  const name = formData.get("name")
  const email = formData.get("email")
  const password = formData.get("password")

  //get transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.EMAIL_SERVICE,
    port: process.env.EMAIL_PORT,
    secure: process.env.NODE_ENV !== 'development',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      const hash = saltAndHashPassword(password)
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hash
        }
      });

      const verificationToken = jwt.sign({ userId: newUser.id }, process.env.AUTH_SECRET, { expiresIn: '1h' })

      const verificationUrl = `http://localhost:3000/check_email?token=${verificationToken}`

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Yahalawa: account verification',
        html: `
            <div style="font-family: Tajawal, sans-serif; text-align: center; margin-top: 10px; border: 1px solid #e2e8f0; border-radius: 6px; padding: 1em;">
                <p  style="font-size: 1.2rem;">يرجى التحقق من بريدك الإلكتروني بالضغط على الزر التالي</p>
                <a href="${verificationUrl}" 
                   style="
                       display: inline-block;
                       padding: 10px 20px;
                       font-size: 1.2rem;
                       background: linear-gradient(95.84deg, #FE2C54 0%, #F338D0 132.7%);
                       color: #ffffff;
                       border: 1px solid #FE2C54;
                       border-radius: 6px;
                       transition: background-color 0.3s;
                       text-decoration: none;
                       margin-top: 10px;
                   ">
                   تأكيد البريد الإلكتروني
                </a>
            </div>
        `
      });

    }
    else {
      return { error: "بيانات اعتماد غير صالحة" }
    }

  } catch (error) {
    console.log(error)
  }
};


// check email-----------------------------------------------------//
export async function checkEmail(token) {

  if (!token) return { message: 'Token is required.' }

  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET)
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { emailChecked: true },
    })

    return { message: '.تم التحقق من البريد الإلكتروني بنجاح' }

  } catch (error) {
    return { message: 'رمز غير صالح أو منتهي الصلاحية', error };
  }
}



export async function login(formData, type) {
  try {
    if (type === 'email') {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false
      });
    } else if (type === 'phone') {
      await signIn("credentials", {
        phone_number: formData.get("phone_number"),
        password: formData.get("password"),
        redirect: false
      });
    }
  } catch (error) {
    console.error("Server error:", error);
    return { error: error.message || "An unexpected error occurred." };
  }
}





//forgot pasword ---------------------------------------------------//
export async function forgotPwd(formData) {
  
  const email = formData.get('email')

    //get transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: process.env.EMAIL_SERVICE,
      port: process.env.EMAIL_PORT,
      secure: process.env.NODE_ENV !== 'development',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
   
    if(!user) return {error: "بيانات اعتماد غير صالحة"}

    const resetToken = jwt.sign({ userId: user.id }, process.env.AUTH_SECRET, { expiresIn: '1h' });

    const resetUrl = `http://localhost:3000/reset_password?token=${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Yahalawa: account verification',
      html: `
          <div style="font-family: Tajawal, sans-serif; text-align: center; margin-top: 10px; border: 1px solid #e2e8f0; border-radius: 6px; padding: 1em;">
              <p  style="font-size: 1.2rem;">لقد طلبت إعادة تعيين كلمة المرور</p>
              <p  style="font-size: 1.2rem;">انقر على الزر أدناه لإعادة تعيين كلمة المرور الخاصة بك</p>
              <a href="${resetUrl}" 
                 style="
                     display: inline-block;
                     padding: 10px 20px;
                     font-size: 1.2rem;
                     background: linear-gradient(95.84deg, #FE2C54 0%, #F338D0 132.7%);
                     color: #ffffff;
                     border: 1px solid #FE2C54;
                     border-radius: 6px;
                     transition: background-color 0.3s;
                     text-decoration: none;
                     margin-top: 10px;
                 ">
                 إعادة تعيين كلمة المرور
              </a>
          </div>
      `
    });

  } catch (error) {
    return { message: 'رمز غير صالح أو منتهي الصلاحية', error };
  }
}


//reset password---------------------------------------------------//
export async function resetPwd(token, password) {
  try {

    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    const userId = decoded.userId;

    const hashedPassword = saltAndHashPassword(password);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }
    catch (error) {
      return { message: 'رمز غير صالح أو منتهي الصلاحية', error };
    }
}


//edit user password ----------------------------------------------//
export async function editPwd(formData) {

  const email = formData.get('email')
  const current_password = formData.get('current_password')
  const new_password = formData.get('new_password')
  const confirm_password = formData.get('confirm_password')


  if (!current_password && !new_password && !confirm_password) {
    return { error: ".الرجاء إكمال كافة الحقول" }
  }

  if (new_password !== confirm_password) {
    return { error: "كلمة المرور غير متطابقة" }
  }

  try {
    const hash = saltAndHashPassword(new_password)

    await prisma.user.update({
      where: { email },
      data: { password: hash }
    })

  } catch (error) {
    console.log(error)
  }
};

// Delete user--------------------------------------------------//

export async function deleteUser(id) {

  try {
    await prisma.user.delete({ where: { id } })
    revalidatePath('/dashboard/yahalawa_users')

  } catch (error) {
    console.log(error)
  }
};