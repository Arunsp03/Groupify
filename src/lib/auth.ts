// import NextAuth from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { validateUser } from "@/db/db";
// export const{handlers,signIn,signOut,auth}=NextAuth({
//     providers: [
       
//         CredentialsProvider({
//           name: 'Credentials',
//           credentials: {
//             username: { label: "Username", type: "text", placeholder: "Enter name" },
//             password: { label: "Password", type: "password", placeholder: "Enter password"  }
//           },
//           async authorize(credentials, req) {
//             //console.log("credentials",credentials);
//             const user:any = await validateUser(credentials?.username??"",credentials?.password??"");
//             if (!user)
//               {throw new Error("User not found")}
//             //console.log(typeof(user))
//             return user   
//           },
        
//         }),
    
        
//       ],

//       session: {
//         strategy: "jwt",
//         }
//         ,
//         jwt: {
//           // Optional: Add custom JWT signing options
//           secret: process.env.NEXTAUTH_SECRET || "", // Ensure this is set
//         },
      
      
    
// })
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { validateUser } from "@/db/db";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Enter name" },
        password: { label: "Password", type: "password", placeholder: "Enter password" }
      },
      async authorize(credentials, req) {
        // Validate the user with the credentials provided
        const user:any = await validateUser(credentials?.username ?? "", credentials?.password ?? "");

        // If user validation fails, throw an error
        if (!user) {
          throw new Error("Invalid username or password");
        }

        // Return the user object, NextAuth will include this in the JWT
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET || "", // Ensure this secret is set
  },
});

export { handler as GET, handler as POST };

