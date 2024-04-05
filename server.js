const mongoose = require('mongoose');
const app = require('./app');
mongoose
    .connect('mongodb+srv://sa:Vang14072002@cluster0.bigfqtb.mongodb.net/test')
    .then(async() => {
        console.log('DB connection is successfully!');
    })
    .catch(error => console.log(error))
const port = 14722;
app.listen(port,() => {
    console.log(`App is running on port ${port}`);
});