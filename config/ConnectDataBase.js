const mongoose = require("mongoose")

const ConnectToDatabase = async function (){
    try {
        const connect  = await mongoose.connect(process.env.MONGOOSE_URI)
        console.log(`DataBase Connect`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = ConnectToDatabase