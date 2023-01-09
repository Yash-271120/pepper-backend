const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
    clicked_at: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Click', clickSchema);