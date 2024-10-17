// lib/auth.ts (or any other shared location for your auth configuration)
import GithubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { validateUser } from "@/db/db";
export const authOptions: AuthOptions = {
  providers: [
       
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Enter name" },
        password: { label: "Password", type: "password", placeholder: "Enter password"  }
      },
      async authorize(credentials, req) {
        //console.log("credentials",credentials);
        const user:any = await validateUser(credentials?.username??"",credentials?.password??"");
        if (!user)
          {throw new Error("User not found")}
        //console.log(typeof(user))
        return {
          id: user.id,
          "username":user.username??"",
          "password":user.password??"",
          "role":user.role??"",
          "streamername":user.streamername??""
        }   
      },
    
    }),

    
  ],

  session: {
    strategy: "jwt",
    }
    ,
    jwt: {
      
      secret: process.env.NEXTAUTH_SECRET || "", 
    },
    callbacks:{
      async jwt({ token, user }:{token:any,user:any}) {
        if (user) {
          token.id = user.id;
          token.username = user.username;
          token.role=user.role
          token.streamername=user.streamername
         
        
        }
        return token;
      },
    async session({ session, token }:{session:any,token:any}) {
      session.user = {
        id: token.id,
        username: token.username,
        role:token.role,
        streamername:token.streamername
       
       
      };
      return session;
    },
  
    }

};
