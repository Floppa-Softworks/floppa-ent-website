import nextAuth from 'next-auth';
import discord from 'next-auth/providers/discord';

export default nextAuth({
  providers: [
    discord({
      clientId: '861271636907917322',
      clientSecret: 'iOnLjDUsyWWUlLGrZMh0HbDaYMnjYtGI',
      authorization: { params: { scope: 'identify guilds' } },
    }),
  ],
  jwt: {
    secret: 'hello',
  },
  secret: 'hello',
  callbacks: {
    async jwt({ token, account }: any) {
      const newToken = token;

      if (account) {
        newToken.accessToken = account.access_token;
        newToken.details = account;
        newToken.id = token.sub;
      }
      return newToken;
    },
    async session({ session, token }: any) {
      const newSession = session;

      newSession.accessToken = token.accessToken;
      newSession.details = token.details;
      newSession.user.id = token.id;

      return session;
    },
  },
});
