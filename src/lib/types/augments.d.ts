import 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's username. */
      name: string;
      email: string;
      id: string;
      image: string;
    };
    accessToken: string;
  }
}
