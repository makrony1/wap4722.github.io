const express = require('express');
const productRouter = require('./routes/productRouter');
const bookRouter = require('./routes/bookRouter');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json()); 

app.use('/products', productRouter);
app.use('/book', bookRouter);


app.listen(3000, ()=>console.log('listen on 3000'));