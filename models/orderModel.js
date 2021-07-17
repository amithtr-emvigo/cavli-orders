const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({

    orderid: {
        type: String,
        required: true
    },
    companyname: {
        type: String,
        required: true
    },
    customeraddress: {
        type: String,
        required: true
    },
    ordereditem: {
        type: String,
        required: true
    },
    createdon: {
        type: Date,
        default: Date.now()
    }

});

module.exports = {Order: mongoose.model('order', orderSchema )};