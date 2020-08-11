const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


var uri = '';
if (process.env.NODE_ENV === 'production') {
    uri = process.env.MONGO_URI
}
else {
    uri = "mongodb+srv://jatinm:finishd123@cluster0.coxkm.mongodb.net/testing?retryWrites=true&w=majority"
}

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const todosRouter = require('./routes/todo');
const userRouter = require('./routes/user');

app.use('/api/todo/', todosRouter);
app.use('/api/user/', userRouter);

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});