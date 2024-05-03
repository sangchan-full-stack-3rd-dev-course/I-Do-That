const express = require('express');
const app = express();

const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');

app.use("/users", userRouter);
app.use("/posts", postRouter);


app.listen(1990);