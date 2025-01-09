const mongoose = require('mongoose');

const uri = "mongodb+srv://Devvv:19092005@cluster0.oavsr.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(uri, {
    // userNewUrlParser: true,
    // useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log(err);
});