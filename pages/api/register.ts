import bcrypt from 'bcrypt'
import dbConnect from 'lib/dbConnect'
import User from 'models/User'
import { UserPredictions } from 'models/UserPredictions'
import type { NextApiRequest, NextApiResponse } from 'next'

interface ResponseData {
  error?: string
  msg?: string
}

const validateEmail = (email: string): boolean => {
  const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  return regEx.test(email)
}

const validateForm = async (
  username: string,
  email: string,
  password: string
) => {
  if (username.length < 3) {
    return { error: 'El nombre debe tener 3 caracteres o mas' }
  }
  if (!validateEmail(email)) {
    return { error: 'El email es invalido' }
  }

  await dbConnect()
  const emailUser = await User.findOne({ email: email })
  const userName = await User.findOne({ name: username })

  if (emailUser) {
    return { error: 'Este email ya esta registrado' }
  }

  if (userName) {
    return { error: 'Este nombre de usuario ya esta registrado' }
  }

  if (password.length < 4) {
    return { error: 'La contraseña debe tener 4 o mas caracteres' }
  }

  return null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // validate if it is a POST
  if (req.method !== 'POST') {
    return res
      .status(200)
      .json({ error: 'This API call only accepts POST methods' })
  }

  // get and validate body variables
  const { username, email, password } = req.body

  const errorMessage = await validateForm(username, email, password)
  if (errorMessage) {
    return res.status(400).json(errorMessage as ResponseData)
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 12)

  // create new User on MongoDB
  const newUser = new User({
    name: username,
    email,
    hashedPassword,
  })

  newUser
    .save()
    .then(() =>
      res.status(200).json({ msg: 'Successfuly created new User: ' + newUser })
    )
    .catch((err: string) =>
      res.status(400).json({ error: "Error on '/api/register': " + err })
    )

  // When users registers we generate prediction schema
  const newUserPredictions = new UserPredictions({
    usuario: username,
  })

  newUserPredictions
    .save()
    .then(() =>
      res.status(200).json({
        msg: 'Successfuly created new UserPredictions: ' + newUserPredictions,
      })
    )
    .catch((err: string) =>
      res.status(400).json({ error: "Error on '/api/register': " + err })
    )
}
