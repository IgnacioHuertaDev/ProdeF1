import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { compare } from 'bcrypt'
import dbConnect from 'lib/dbConnect'
import clientPromise from 'lib/mongodb'
import User from 'models/User'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    // Email & Password
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        await dbConnect()

        // Find user with the email
        const user = await User.findOne({
          email: credentials?.email,
        })

        // Email Not found
        if (!user) {
          throw new Error('El mail no esta registrado')
        }

        // Check hased password with DB hashed password
        const isPasswordCorrect = await compare(
          credentials!.password,
          user.hashedPassword
        )

        // Incorrect password
        if (!isPasswordCorrect) {
          throw new Error('La contraseña es incorrecta')
        }

        return user
      },
    }),
  ],
  pages: {
    signIn: '/auth',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  debug: process.env.NODE_ENV === 'development',
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
})
