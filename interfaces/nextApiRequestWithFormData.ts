import { NextApiRequest } from 'next'
import { Request } from './multer'

export interface NextApiRequestWithFormData extends NextApiRequest {
  fileFields: Record<string, Request>
}
