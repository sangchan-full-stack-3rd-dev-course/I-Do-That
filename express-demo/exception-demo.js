const express = require('express');
const app = express();

const phones = [
    { id : 1, company : 'apple'},
    { id : 2, company : 'samsung'},
    { id : 3, company : 'xiaomi'}
];

app.use(express.json());
app.get('/phones', (req, res) => {
    res.json(phones);
});

app.get('/phones/:id', (req, res) => {
    let {id} = req.params;

    let phone = phones.find(p => p.id === parseInt(id));
    let stateInfo = {
        errorMessage : "",
        stateCode : 200
    };

    if (!phone) {
        stateInfo.errorMessage = "해당 핸드폰은 저희 매장에 없습니다."
        stateInfo.stateCode = 404;
    }
    
    res.status(stateInfo.stateCode).json({
        error : stateInfo.errorMessage,
        phone : phone
    });
});

app.listen(2005);