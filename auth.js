import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Facebook from "next-auth/providers/facebook"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import prisma from "./lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import axios from 'axios'




export const { handlers: { GET, POST }, auth, signIn, signOut, } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
        Credentials({
            name: "credentials",
            maxAge: 24 * 60 * 60,
            authorize: async (credentials) => {

                try {
                    if (!credentials) { return null }

                    const { email, phone_number, password } = credentials;

                    if (email) {
                        console.log('this is email part')
                        const user = await prisma.user.findUnique({ where: { email } });

                        if (!user) {
                            throw new Error("User not found.")
                        }

                        if (!user.emailChecked) {
                            throw new Error("User not verified.")
                        }


                        const isMatch = await bcrypt.compare(password, user.password);
                        if (!isMatch) {
                            throw new Error("Invlaid password.")
                        }
                        return user;
                    }

                    else {
                        const response = await axios.post('http://localhost:3000/api/premiumAuth/login', {
                            phone_number,
                            password
                        });

                        if (response.status === 401) {
                            throw new Error('Invalid phone number or password.');
                        }

                        let user = await prisma.user.findUnique({
                            where: { phone_number: Number(phone_number) },
                        });

                        if (!user) {
                            user = await prisma.user.create({
                                data: {
                                    name: phone_number,
                                    phone_number: Number(phone_number),
                                    role: 'T_TELECOM'
                                },
                            });
                        }
                        return user;

                    }
                } catch (error) {
                    console.log(error);
                    throw error
                }

            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                await prisma.user.update({
                    where: { id: user.id },
                    data: { lastLogin: new Date() },
                });
                token = { ...token, ...user }
            }
            return token;
        },
        async session({ session, token, user }) {
            session.user = token;
            return session;
        },
    },
    secret: process.env.AUTH_SECRET,
});

































