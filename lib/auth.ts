import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import dbConnect from './dbConnect'
import UserModel from './models/UserModel'
import NextAuth from 'next-auth'

// I guess this is an example of how you configure NextAuth which has the session propeerty in it.
// Firth you import it and then configure it like this. NextAuth(config)

// this is auth.ts is the dependency for the middleware.ts and providers.ts
// This is your configuration
export const config = {

  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: 'email',
        },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect()
        if (credentials == null) return null

        const user = await UserModel.findOne({ email: credentials.email },)
        console.log('mongo user:', user)

        // const user2 = await user.findOne({ email: credentials.email },)
        // console.log('mongo user:', user2)

        if (user) {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          )
          if (isMatch) {
            return user
          }
        } else {
          console.log('user???')
        }
        return null
      },
    }),
    ],

// I'm guessing these are the callbacks pages in regards to [...nextauth]

  pages: {
    signIn: '/signin',
    newUser: '/register',
    error: '/signin',
  },


  callbacks: {
    // authorized({ request, auth}:any){
    //     const protectedPaths = [
    //         /\/shipping/,
    //         /\/payment/,
    //         /\/place-order/,
    //         /\/profile/,
    //         /\/order\/(.*)/,
    //         /\/shipping/,
    //     ]
    //     const { pathname} = request.nextUrl
    //     if (protectedPaths.some((p) => p.test(pathname))) return !!auth
    //     return true
    // },

    async jwt({ user, trigger, session, token }: any) {
      if (user) {
        token.user = {
          _id: user._doc._id,
          email: user._doc.email,
          name: user._doc.name,
          isAdmin: user._doc.isAdmin,

          // _id: user._id,
          // email: user.email,
          // name: user.name,
          // isAdmin: user.isAdmin,
        }
      }
      if (trigger === 'update' && session) {
        token.user = {
          ...token.user,
          email: session.user.email,
          name: session.user.name,

          isAdmin: session.user.isAdmin
        }
      }
      return token
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user
      }
      return session
    },
    secret: `${process.env.NEXTAUTH_SECRET}`,
  },

}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config)

// import CredentialsProvider from 'next-auth/providers/credentials'
// import bcrypt from 'bcryptjs'
// import dbConnect from './dbConnect'
// import UserModel from './models/UserModel'
// import NextAuth from 'next-auth'

// export const config = {
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         email: {
//           type: 'email',
//         },
//         password: { type: 'password' },
//       },
//       async authorize(credentials) {
//         await dbConnect()
//         if (credentials == null) return null

//         const user = await UserModel.findOne({ email: credentials.email })

//         if (user) {
//           const isMatch = await bcrypt.compare(
//             credentials.password as string,
//             user.password
//           )
//           if (isMatch) {
//             return user
//           }
//         }
//         return null
//       },
//     }),
//   ],
//   pages: {
//     signIn: '/signin',
//     newUser: '/register',
//     error: '/signin',
//   },
//   callbacks: {
//     async jwt({ user, trigger, session, token }: any) {
//       if (user) {
//         token.user = {
//           _id: user._id,
//           email: user.email,
//           name: user.name,
//           isAdmin: user.isAdmin,
//         }
//       }
//       if (trigger === 'update' && session) {
//         token.user = {
//           ...token.user,
//           email: session.user.email,
//           name: session.user.name,
//         }
//       }
//       return token
//     },
//     session: async ({ session, token }: any) => {
//       if (token) {
//         session.user = token.user
//       }
//       return session
//     },
//   },
// }

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth(config)