const express = require('express');
const path = require('path');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const { join } = require('path');

const app = express();



app.use('/user', userRoute);
app.use('/product', productRoute);

app.get("/", (req, res, next)=>{
    res.status(200).sendFile(path.join(__dirname,'views','home.html'))
})


app.use(express.static(path.join(__dirname,'public','assets')));
app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname, 'views','404-page.html'))
});

app.use((err, req, res, next)=>{
    res.status(500)
    console.log('hhhhhhhhhh',err);
    res.render('error', { error: err })
})

app.listen(3000, ()=>console.log("Running on http://localhost:3000"));