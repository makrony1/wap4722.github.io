const express = require('express');
const productRouter = require('./routes/productRouter');
const bookRouter = require('./routes/bookRouter');

const app = express();

app.use(express.json()); 

app.use('/products', productRouter);
app.use('/books', bookRouter);


app.listen(3000, ()=>console.log('listen on 3000'));