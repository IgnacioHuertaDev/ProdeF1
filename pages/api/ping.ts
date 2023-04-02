import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { APP_KEY } = process.env
  const ACTION_KEY = req.headers.authorization!.split(' ')[1]

  try {
    if (req.method === 'POST') {
      res.status(200).json({
        success: `Pong post`,
      })
    } else {
      res.status(200).json({
        success: `Pong ${req.method}`,
      })
    }
    if (ACTION_KEY === APP_KEY) {
      res.status(200).json({
        success: `Pong`,
      })
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } catch (err) {
    res.status(500).json({ error: `Error: ${err}` })
  }
}
