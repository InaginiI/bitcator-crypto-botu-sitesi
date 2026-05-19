import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import clientPromise from "./mongodb"
import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/mySecondDatabase");
const db = client.db();

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true,
        //     sendResetPassword: async ({ user, url, token }, request) => {
        //         await sendEmail({
        //             to: user.email,
        //             subject: "Reset your password",
        //             text: `Click the link to reset your password: ${url}`,
        //         });
        //     },
        //     onPasswordReset: async ({ user }, request) => {
        //         // your logic here
        //         console.log(`Password for user ${user.email} has been reset.`);
        //     },
        // },
        requireEmailVerification: false,
        // requireEmailVerification: true,
    },
    // emailVerification: {
    //     sendVerificationEmail: async ({ user, url, token }, request) => {
    //         await sendEmail({
    //             to: user.email,
    //             subject: "Verify your email address",
    //             text: `Click the link to verify your email: ${url}`,
    //         });
    //     },
    // },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 24 hours
    },
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
})
