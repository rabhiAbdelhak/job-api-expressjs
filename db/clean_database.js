const mongoose = require('mongoose');
const connectDB = require('./connect');
const User = require('../models/User');
require('dotenv').config();

const clean = async () => {
    try {
     await connectDB(process.env.DATABASE_URI);
     User.deleteMany();
     process.exit();
    }catch(err){
      console.log(err)
    }
}

clean();