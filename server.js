const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
mongoose
    .connect('mongodb+srv://sa:Vang14072002@cluster0.bigfqtb.mongodb.net/SaleManagement')
    .then(async() => {
        console.log('DB connection is successfully!');
    })
    .catch(error => console.log(error))
const port = process.env.port;
app.listen(port,() => {
    console.log(`App is running on port ${port}`);
});