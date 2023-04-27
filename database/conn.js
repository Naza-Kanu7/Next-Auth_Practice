import mongoose from "mongoose";

const connectMongo = async () => {
    try {

        const { connection } = await mongoose.connect(process.env.MONGO_URL)
        console.log('connected to database')
        
        if(connection.readyState == 1) {
            console.log('connected to database')
            return Promise.resolve(true)
        }
    } catch (error) {
        console.log('not connected to database')
        return Promise.reject(error)
    }
}

export default connectMongo