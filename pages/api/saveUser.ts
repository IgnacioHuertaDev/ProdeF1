// import { NextApiRequestWithFormData } from 'interfaces/'
// import mongoose, { Document } from 'mongoose'
// import multer from 'multer'
// import type { NextApiResponse } from 'next'
// import sharp from 'sharp'

import { NextApiRequestWithFormData } from 'interfaces/nextApiRequestWithFormData'
import { NextApiResponse } from 'next'

// Configuramos Multer para manejar la carga de archivos
// const storage = multer.memoryStorage()
// const upload = multer({ storage: storage })

// Definimos el schema de la colección de usuarios
// interface UserDocument extends Document {
//   name: string
//   image: {
//     data: Buffer
//     contentType: string
//   }
// }

// const userSchema = new mongoose.Schema<UserDocument>({
//   name: String,
//   image: {
//     data: Buffer,
//     contentType: String,
//   },
// })

// // Creamos el modelo de la colección de usuarios
// const User =
//   mongoose.models.User || mongoose.model<UserDocument>('User', userSchema)

// Definimos la ruta para subir una imagen de perfil
export default async function handler(
  req: NextApiRequestWithFormData,
  res: NextApiResponse
) {
  // const { id } = req.query
  // if (req.method === 'POST') {
  //   upload.single('image')(req, res, async (err) => {
  //     if (err) {
  //       console.error(err)
  //       return res
  //         .status(500)
  //         .send('Ha ocurrido un error al subir la imagen de perfil.')
  //     }
  //     const imageBuffer = req.file.buffer
  //     try {
  //       // Procesar la imagen para reducir la calidad
  //       const processedImageBuffer = await sharp(imageBuffer)
  //         .jpeg({ quality: 60 })
  //         .toBuffer()
  //       // Buscamos al usuario por ID
  //       const user = await User.findById(id)
  //       // Si el usuario no existe, devolvemos un error 404
  //       if (!user) {
  //         return res.status(404).send('Usuario no encontrado.')
  //       }
  //       // Actualizamos el campo "image" con la nueva imagen
  //       user.image = {
  //         data: processedImageBuffer,
  //         contentType: req.file.mimetype,
  //       }
  //       // Guardamos los cambios en la base de datos
  //       await user.save()
  //       res.send('Imagen de perfil actualizada correctamente.')
  //     } catch (err) {
  //       console.error(err)
  //       res
  //         .status(500)
  //         .send('Ha ocurrido un error al actualizar la imagen de perfil.')
  //     }
  //   })
  // } else {
  //   res.status(405).send('Método no permitido.')
  // }
}
