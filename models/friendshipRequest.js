const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new mongoose.Schema({

    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    time: { type: Date, default: Date.now },
});
