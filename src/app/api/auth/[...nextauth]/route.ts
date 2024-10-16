import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { validateUser } from "@/db/db";
const handler=NextAuth({
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
              "role":user.role??""
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
             
            
            }
            return token;
          },
        async session({ session, token }:{session:any,token:any}) {
          session.user = {
            id: token.id,
            username: token.username,
            role:token.role
           
           
          };
          return session;
        },
      
        }
    
})
 export{handler as GET ,handler as POST}