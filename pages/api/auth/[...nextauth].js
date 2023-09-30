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
    async signIn({ profile, account, user }) {
      return true;
    },

    async jwt({ token, user, account }) {
      // console.log(profile)
      if (account && user) {
        if (account.provider === "google") {
          const apiPath = process.env.NEXT_PUBLIC_API_PATH;
          const res = await fetch(`${apiPath}/auth/google/google-login`, {
            method: "POST",
            body: JSON.stringify({ idToken: account.id_token }),
            headers: { "Content-Type": "application/json" },
          });
          const data = await res.json();
          // console.log(data);
          return { user: data.user, access_token: data.access_token };
        }
        // console.log(user);
        return {
          user: user.user,
          access_token: user.token.access_token,
        };
      }
      return token;
    },

    async session({ session, token }) {
      session = { token };
      // console.log(session.token);
      return session.token;
    },
  },
};
export default NextAuth(authOptions);
