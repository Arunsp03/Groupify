import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
const handler=NextAuth({
    providers: [
        GithubProvider({
          clientId: process.env.GITHUB_clientId_local??"",
          clientSecret:process.env.GITHUB_clientSecret??"",
        }),
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            const response = await fetch("")
            if (!response.ok) return null
            return (await response.json()) ?? null
          },
        
        }),
    
        
      ],
      session: {

        strategy: "jwt",
      
      
        
        }
      
      
    
})
export { handler as GET, handler as POST }