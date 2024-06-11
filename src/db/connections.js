import { connect, disconnect } from "mongoose"

async function connectDataBase(){
    try{
        await connect(process.env.MONGO_DB_URL /*|| "mongodb://localhost:27017/"*/)
    }
    catch(error) {
        console.log(error)
        throw new Error("Cannot Connect to MongoDB")
    }
}

async function disconnectDataBase(){
    try{
        await disconnect()
    }
    catch(error) {
        console.log(error);
        throw new Error("Cannot Disconnect to MongoDB")
    }
}

export {connectDataBase, disconnectDataBase}