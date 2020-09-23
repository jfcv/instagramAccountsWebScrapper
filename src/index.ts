import express from 'express';
const app = express();

//port definition
const port = process.env.PORT || 3000;

import indexRoutes from './routes/index'

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(indexRoutes);

app.listen(port, ()=>{
    console.log('Server running on port ,', port);
    
});