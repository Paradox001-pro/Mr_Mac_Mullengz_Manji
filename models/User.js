const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    },
    password: {
        type: String,
        required: true
    },
    // address: {
    //     type: String,
    //     required: true
    // },
    // phone_number: {
    //     type: Number,
    //     required: true
    // }
});

let User = module.exports = mongoose.model('User', UserSchema);
//  = User;

// module.exports = {
//     User: mongoose.model('User', UserSchema)
// }