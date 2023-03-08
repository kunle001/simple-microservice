const express= require('express');
const bodyParser= require('body-parser');
const {randomBytes}= require('crypto');
const cors= require('cors');
const axios= require('axios')

const app =express();
app.use(bodyParser.json());
app.use(cors())

const commentByPostId={}

app.get('/posts/:id/comments', (req, res)=>{
    res.status(200).json({
        comment: commentByPostId[req.params.id] || []
    })
})

app.post('/posts/:id/comments', (req, res)=>{
    const commentId= randomBytes(4).toString('hex');

    const {content}= req.body;
    const comments= commentByPostId[req.params.id] || []

    comments.push({id: commentId, comment: content});

    commentByPostId[req.params.id]= comments;

    axios.post('http://localhost:4005/events', {comments})

    res.status(200).json({
        comments
    })
})

app.listen(4001, ()=>{
    console.log('listening on port 4001' )
});

module.exports= app