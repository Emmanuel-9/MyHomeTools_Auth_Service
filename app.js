const express = require('express');

const app = express();
const port = 4000

app.get('/', (req, res) => {
    res.send("hurray")
})


app.listen(port, () => {
    console.log("hurray!!")
});