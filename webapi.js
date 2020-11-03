const express = require('express');
require('dotenv').config();
const api = express();
api.use(express.json());

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

api.get('/', (req,res) =>{
    res.send('Welcome to webapi');
});

api.get('/stock', (req,res) =>{
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

const port = process.env.PORT || 3200;
api.listen(port, ()=> console.log(`Server running on port ${port}...`));
