
require('express-async-errors');
const express = require('express');
const connectDB = require('./db/connect');
const authRouter = require('./routes/auth');
const jobRouter = require('./routes/jobs');
const {autheticationMiddleware} = require('./middleware/authentication')
const app = express();
require('dotenv').config();
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//extra securite packages
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const ratelimter = require('express-rate-limit');
const { use } = require('express/lib/router');

app.use(express.json());
app.use(helmet())
app.use(cors());
app.use(xss());
app.use(ratelimter({
  windowsMs : 15*60*100, // 15 minute
  max: 100, //limit each ip adress with 100 request per windowsMS
}))

//index route 
app.get('/', (req, res) => {
  res.send('Jobs Api');
})

// extra packages

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs',autheticationMiddleware, jobRouter)
app.get('/api/v1/', autheticationMiddleware, (req, res) => {
  res.send('<h1>Dashboard</h1>');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.DATABASE_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
