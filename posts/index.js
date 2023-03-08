const express= require('express');
const bodyParser= require('body-parser')
const {randomBytes}= require('crypto')
const cors= require('cors')
const axios= require('axios')

const posts= {};

app= express();
app.use(bodyParser.json());
app.use(cors())

app.get('/post', (req, res)=>{
    res.send(posts)
});

app.post('/post', async (req, res)=>{
    const id= randomBytes(4).toString('hex');
    const {title}= req.body;
    posts[id]= {id,title};

    await axios.post('http://localhost:4005/events', {
        type: "postCreated",
        data: {
            id,title
        }
    });

    res.status(201).send(posts[id]);

});

app.listen(4000, ()=>{
    console.log('listening on port 4000')
});

module.exports= app