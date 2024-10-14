import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
const handler=NextAuth({
    providers: [
        GithubProvider({
          clientId: "Ov23liqLaLlIqKaj4J6o",
          clientSecret:"39d862ecf19ed18c976b65bd29758c788ae311da",
        }),
        
      ],
    
})
export { handler as GET, handler as POST }