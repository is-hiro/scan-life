import {fileURLToPath} from 'url'
import path from 'path'
import {existsSync} from 'fs'

export const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const getImage = async (req, res) => {
  try {
    const {filename} = req.params
    const filePath = path.join(__dirname, '..', '..','uploads', filename)

    if (!existsSync(filePath)) {
      return res.status(404).json({message: 'File not found'})
    }

    res.sendFile(filePath)
  } catch (err) {
    console.error(err)
    res.status(500).json({error: 'Server error'})
  }
}