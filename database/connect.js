import mongoose from 'mongoose'
export const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.DEV_DB_URL)
    console.log('Database successful connected')
  } catch (err) {
    console.error(err)
  }
}