const express = require('express')
require('./db/index.js');
const shortCtrl = require('./controller/shortController.js')
const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.get('/', (req, res) => {
    res.send({
        name: "Vikas"
    })
})
app.post('/add' , shortCtrl.addUrl);

// app.post('/add/:url/:custom' , shortCtrl.addUrlWithCustom);

app.get('/show/:code' , shortCtrl.findUrl);

app.get('/show' , shortCtrl.findAll);

app.delete('/delete/:code' , shortCtrl.deleteUrl);


app.listen(port, () => {
    console.log('server is up on ' + port)
})