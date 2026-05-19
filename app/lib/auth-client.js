"use client"

import { createAuthClient } from "better-auth/react"

// Better Auth client'ı oluştur
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000/api/auth",
})

export const {
    signIn,
    signUp,
    signOut,
    useSession,
    SessionProvider
} = authClient

// await authClient.signIn.email(
//   {
//     email: "email@example.com",
//     password: "password",
//   },
//   {
//     onError: (ctx) => {
//       // Handle the error
//       if (ctx.error.status === 403) {
//         alert("Please verify your email address");
//       }
//       //you can also show the original error message
//       alert(ctx.error.message);
//     },
//   }
// );

// const { data, error } = await authClient.resetPassword({
//   newPassword: "password1234",
//   token,
// });
