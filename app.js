const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const sharp = require('sharp');
const Jimp = require('jimp');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/meme', (req, res) => {
    //res.json({msg: 'This is CORS-enabled for a Single Route'})
    const url = req.body.data;
    if(url) {
        axios.get(url).then((response) => {

            let postData = response.data[0].data.children[0].data;
            if(postData){
                let title = postData.title;
                let imgUrl = postData.url;



                if(title && url) {
                    /*Jimp.read(imgUrl, (err, img) => {
                        if(err) throw err;

                        img.resize(600).getBase64(Jimp.AUTO, (e, img464) => {

                        })
                    });*/
                    Jimp.read(imgUrl)
                        .then((image) => {

                            image.resize(700, Jimp.AUTO).getBase64(Jimp.AUTO, (e, img64) => {
                                if(e) throw e;
                                console.log('success');
                                res.send({
                                    title, img: img64
                                })
                            })
                        })
                        .catch((error) => {
                            throw error;
                        })


                    /*sharp(imgUrl)
                        .resize({width: 600})
                        .toBuffer()
                        .then(data => {
                            res.send({
                                title, data
                            })
                    })*/
                }

                //console.log(title + " - " + url);
            }
            //console.log(response.data[0].data.children);
        });
    }
    //console.log(req.body.data);
});

app.get('/', (req, res) => {

    res.send('Go away!');
});

app.listen(port, () => {
    console.log(`Server started listening at ${port}`);
});