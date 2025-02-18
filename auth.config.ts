import CredentialsProvider from "next-auth/providers/credentials";
import { postRequest } from "./utils/axiosHelper";
import axios from "axios";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Enter your username" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials: Record<string, string> | undefined) {
        if (!credentials) {
          throw new Error("Credentials are missing");
        }

        const loginData = {
          email: credentials.username,
          password: credentials.password,
        };

     
        console.log("Login Data:", JSON.stringify(loginData, null, 2));

        try {
          const response: any = await postRequest({
            url: "/user/login",
            data: loginData,
          });
          console.log('serverresp', response)

          if (response && response?.user) {
            return {
              accessToken: response.token,
              user: response.user,
            };
          }
          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 3600,
    updateAge: 60
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      },
    },
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user.user;
      }
      return token;
    },
    async session({ session, token }:any) {
      session.accessToken = token.accessToken; 
      session.user = token.user;
      return session;
    },
  },
};
