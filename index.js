const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

//Middleware

app.use(express.json());
app.use(helmet());
app.use(cors());

//Import Routes
const authRouter = require('./routes/authRoute');
const pacienteRouter = require('./routes/pacienteRoute');
const prontuarioRouter = require('./routes/prontuarioRoute');

//Connect to DB
dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));

//Route Middlewares
app.use('/api/user', authRouter);
app.use('/api/paciente', pacienteRouter);
app.use('/api/prontuario', prontuarioRouter);

const port = 5000;
app.listen(port, () => console.log(`Running on port ${port}`));
