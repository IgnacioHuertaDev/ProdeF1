import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { APP_KEY } = process.env
  const ACTION_KEY = req.headers.authorization!.split(' ')[1]

  console.log(APP_KEY)
  console.log(ACTION_KEY)
  try {
    if (ACTION_KEY === APP_KEY) {
      // Process the POST request
      res.status(200).json({ success: 'Success' })
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } catch (err) {
    res.status(500).json({ error: 'Error' })
  }
}
