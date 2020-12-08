const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    inpFile: {
        type: String,
        required: true
    },
    writeups: {
        type: String,
        required: true
    },
    filter: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    
});


let Admin = module.exports = mongoose.model('Admin', AdminSchema);

// const Admin = mongoose.model('Admin', AdminSchema);
// module.exports = Admin;

// module.exports = {
//     User: mongoose.model('User', UserSchema)
// }