const mongoose = require('mongoose');


const connect = async()=>{
    mongoose.connect('mongodb://localhost:27017/chat_app')

}


module.exports = connect;