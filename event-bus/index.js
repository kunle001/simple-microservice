const express= require('express');
const bodyParser= require('body-parser')
const axios= require('axios');


const all_events=[]

const app= express()
app.use(bodyParser.json())


app.post('/events', (req, res,next)=>{
    const event= req.body;

    all_events.push(event)

    // axios.post('http//localhost:4000/events', event);
    // axios.post('http//localhost:4001/events', event);
    // axios.post('http//localhost:4002/events', event);

    res.send({status: "OK"})
});

app.get('/events', (req, res, next)=>{
    res.status(200).json({
        data: all_events
    })
})

app.listen(4005, ()=>{
    console.log('Listening on port 4005')
})