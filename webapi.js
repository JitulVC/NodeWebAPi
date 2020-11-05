const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const api = express();
api.use(express.json());

let grefresh_token = null;
const access_token_secret = process.env.ACCESS_TOKEN_SECRET || 'mySecret';
const refresh_token_secret = process.env.REFRESH_TOKEN_SECRET || 'myPastSecret';
const port = process.env.PORT || 3200;

const stocks = [
    {
        id: 1,
        prod_code: '7843-394-24',
        prod_desc: ' Wireless Optical Mouse',
        prod_brand: 'Logitech',
        stock_qty: 43
    },
    {
        id: 2,
        prod_code: '7843-394-14',
        prod_desc: 'HD 1080p Webcam',
        prod_brand: 'Logitech',
        stock_qty: 25
    },
    {
        id: 3,
        prod_code: '7843-394-25',
        prod_desc: 'Jabra 710 Wireless Bluetooth Speaker',
        prod_brand: 'Jabra',
        stock_qty: 49
    },
    {
        id: 4,
        prod_code: '7843-394-28',
        prod_desc: 'Logitech K840 Mechanical Keyboard',
        prod_brand: 'Logitech',
        stock_qty: 21
    },
    {
        id: 5,
        prod_code: '7843-394-29',
        prod_desc: 'Stereo Wireless Headset',
        prod_brand: 'Jabra',
        stock_qty: 15
    },
    {
        id: 6,
        prod_code: '7843-394-35',
        prod_desc: 'Atolla 7-Port USB Hub With Smart Charging Port',
        prod_brand: 'Atolla',
        stock_qty: 19
    },
    {
        id: 7,
        prod_code: '7843-394-38',
        prod_desc: 'Logitech M500 mouse',
        prod_brand: 'Logitech',
        stock_qty: 16
    },
    {
        id: 8,
        prod_code: '7843-394-41',
        prod_desc: 'HP 27q Pavilion 27-Inch QHD Monitor',
        prod_brand: 'HP',
        stock_qty: 9
    },
    {
        id: 9,
        prod_code: '7843-394-44',
        prod_desc: 'Steelseries Arctis Pro headset',
        prod_brand: 'Arctis',
        stock_qty: 5
    },
    {
        id: 10,
        prod_code: '7843-394-45',
        prod_desc: 'SanDisk Ultra Dual Drive USB stick',
        prod_brand: 'SanDisk',
        stock_qty: 28
    },
    {
        id: 11,
        prod_code: '7843-394-51',
        prod_desc: 'Logitech G920S webcam',
        prod_brand: 'Logitech',
        stock_qty: 12
    },
    {
        id: 12,
        prod_code: '7843-394-52',
        prod_desc: 'Logitech G Pro mechanical keyboard',
        prod_brand: 'Logitech',
        stock_qty: 6
    }
];

const users = [
    {
        id: 1,
        user_name: 'sharon@abc.com',
        user_pwd: '123456'
    },
    {
        id: 2,
        user_name: 'carol@abc.com',
        user_pwd: '123456'
    }
];

api.get('/', (req,res) =>{
    res.send('Welcome to webapi');
});

api.post('/login', (req,res) =>{
    try{
        const { user_name } = req.body;
        const { user_pwd } = req.body;
        const user = users.find(c=> c.user_name == user_name && c.user_pwd == user_pwd);
        if (!user)
            res.send('User not found!');
        else{
            const user_detail = {name:user_name}; 
            const access_token = jwt.sign(user_detail,access_token_secret,{expiresIn: '1m'});
            const refresh_token = jwt.sign(user_detail,refresh_token_secret, {expiresIn: '2m'});
            grefresh_token = refresh_token;
            res.send({access_token:access_token, refresh_token: refresh_token});       
        }        
    }
    catch (err){
        console.error(err.message);
    }
});

api.get('/stock', authenticateToken, (req,res) =>{
    res.send(stocks);
});

api.get('/stock/:id', (req,res) =>{
    const stock = stocks.find(c => c.id == parseInt(req.params.id));
    if (!stock)
        res.send('Product not found!');
    else
        res.send(stock);
});

api.post('/stock', (req,res) =>{
    const stock = {
        id: stocks.length+1,
        prod_code: req.body.prod_code,
        prod_desc: req.body.prod_desc,
        prod_brand: req.body.prod_brand,
        stock_qty: req.body.stock_qty
    };
    stocks.push(stock);
    res.send(stock);
});

api.put('/stock/:id', (req,res) =>{
    const stock = stocks.find(c=> c.id == parseInt(req.params.id));
    if (!stock)
        res.send('Product not found!');
    else{
        stock.prod_code = req.body.prod_code;
        stock.prod_desc = req.body.prod_desc;
        stock.prod_brand = req.body.prod_brand;
        stock.stock_qty = req.body.stock_qty;
        res.send(stock);
    };
});

api.delete('/stock/:id', (req,res) =>{
    const stock = stocks.find(c=> c.id == parseInt(req.params.id));
    if (!stock)
        res.send('Product not found!');
    else{
        const index = stocks.indexOf(stock);
        stocks.splice(index,1);
        res.send(stock);
    }
});

function authenticateToken(req, res, next){
    try{
        const authHeader = req.headers['authorization'];
        if (authHeader == undefined && authHeader == null)
            res.sendStatus(401);

        const token = authHeader.split(' ')[1];
        if (token == null) 
            res.sendStatus(401);
        
        jwt.verify(token, access_token_secret, (err, user)=>{
            if (err) 
                return res.sendStatus(403);
            req.user = user;
            next();
        });    
    }
    catch (err){
        console.error(err.message);
    }
};

api.listen(port, ()=> console.log(`Server running on port ${port}...`));
