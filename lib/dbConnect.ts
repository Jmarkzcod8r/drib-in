import mongoose from 'mongoose'

async function dbConnect() {
  try {
    // console.log(process.env.MONGODB_URI_A!)
    await mongoose.connect(process.env.MONGODB_URI_A!)
    console.log('connected to Mongodb')
  } catch (error) {
    throw new Error('Connectionn failed!')
  }
}

export default dbConnect