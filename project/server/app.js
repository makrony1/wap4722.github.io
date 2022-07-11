const express = require('express');
const path = require('path');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const cartItemRouter = require('./routes/cartItemRouter');
const orderRouter = require('./routes/orderRouter');
const cors = require('cors');

const app = express();

 
app.use(cors());
app.use(express.json());
app.use('/users',userRouter);

app.use(express.static(path.join(__dirname,'res','img')));

app.use((req, res, next) => {
    const auth = req.headers.authorization;
    if(auth== null || auth==undefined || auth.length==0){
        res.status(401).json({success: false,msg:'No Access Token'});
        return;
    }
    const token = auth.split(' ')[1];
    if(token === 'null'){
        res.status(401).json({success: false,msg:'No Access Token'});
    } else {
        req.user = token.split('-')[0];
        next();
    }
})

app.use('/products', productRouter);
app.use('/CartItems', cartItemRouter);
app.use('/orders', orderRouter);

app.use((req, res, next) => {
    res.status(404).json({ error: true, message: req.url + " API not supported!" });
  });

app.listen(3000, ()=>console.log('listen on 3000'));