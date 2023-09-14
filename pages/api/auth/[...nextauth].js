import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24,
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };
        const apiPath = process.env.NEXT_PUBLIC_API_PATH;
        const res = await fetch(`${apiPath}/auth/login`, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        if (!res.ok) {
          throw new Error(user.message);
        }
        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile, account }) {
      if (account.provider === "google") {
        const apiPath = process.env.NEXT_PUBLIC_API_PATH;
        const res = await fetch(`${apiPath}/auth/check-email`, {
          method: "POST",
          body: JSON.stringify({ email: profile.email }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.statusCode === 500) {
          function generateRandomString(length) {
            const characters =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let result = "";
            for (let i = 0; i < length; i++) {
              result += characters.charAt(
                Math.floor(Math.random() * characters.length)
              );
            }
            return "A" + result + "1";
          }

          const randomPass = generateRandomString(8);
          const apiPath = process.env.NEXT_PUBLIC_API_PATH;
          const res = await fetch(`${apiPath}/auth/register`, {
            method: "POST",
            body: JSON.stringify({
              f_name: profile.given_name,
              l_name: profile.family_name,
              email: profile.email,
              password: randomPass,
            }),
            headers: { "Content-Type": "application/json" },
          });
          if (!res.ok) {
            return false;
          }
          return true;
        }
      }
      return true;
    },

    async jwt({ token, user, account }) {
      // console.log(profile)
      if (account && user) {
        if (account.provider === "google") {
          const apiPath = process.env.NEXT_PUBLIC_API_PATH;
          const res = await fetch(`${apiPath}/auth/check-email`, {
            method: "POST",
            body: JSON.stringify({ email: token.email }),
            headers: { "Content-Type": "application/json" },
          });
          const data = await res.json();
          // console.log(data)
          return { data: data };
        }
        return {
          data: user.user,
          // id:user.user.email
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.user.data = token.data;
      // console.log(session);
      return session;
    },
  },
};
export default NextAuth(authOptions);
