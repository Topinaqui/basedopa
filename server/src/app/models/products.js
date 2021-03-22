const mongoose = require('../../database');

const ProductsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    img: {
        type: String,
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    description:{
        type: String,
        require: true,
    },
    age: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    completed: {
        type: Boolean,
        require: true,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Products = mongoose.model('Products', ProductsSchema);

module.exports = Products;