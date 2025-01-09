const express = require('express');
const app = express();
const taskRouter  = require('./routes/taskRouter'); // Import the taskRouter
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/task', taskRouter);
// app.use('/task', order);
// const orderRouter = require('./routes/orderRouter');

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
