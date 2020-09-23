import express from 'express';
const app = express();

//port definition
const port = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(port, ()=>{
    console.log('Server running on port ,', port);
    
});