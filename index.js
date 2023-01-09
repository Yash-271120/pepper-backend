const express = require('express');
const mongoose = require('mongoose');
const Click = require('./Click');
const cors = require('cors')
const moment = require('moment');

const app = express();
const port = process.env.PORT || 5000;

//connect to DB
mongoose.connect('mongodb+srv://yash1234:yash1234@cluster0.ucweqwj.mongodb.net/clicks?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log("Connected to DB");
})

// mongoose.connect('mongodb://localhost:27017/clicks', { useNewUrlParser: true, useUnifiedTopology: true },()=>{
//     console.log("Connected to DB");
// })

// routes
app.get('/', (req, res) => {
    res.send('Welcome To Admin Panel');
});

app.post('/click',cors(),async (req, res) => {
    try {
        const click = new Click({
            clicked_at: moment(Date.now()).format('DD/MM/YYYY')
        });
        await click.save();
        return res.send(click);

    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/clicks', async (req, res) => {
    try {
        const clicks = await Click.find({});
        var dateToClicksMap = {};
        clicks.forEach((click) => {
            const date = click.clicked_at;
            if(dateToClicksMap[date]){
                dateToClicksMap[date]++;
            }else{
                dateToClicksMap[date] = 1;
            }
        });
        const data = {
            clicks_count : clicks.length,
            date_to_clicks_map : dateToClicksMap
        }
        return res.send(data);
    } catch (error) {
        res.status(500).send(error);
}
});

app.listen(port, () => console.log(`Listening on port ${port}`));