const mongoose = require('../../database')

const ProjectSchema = new mongoose.Schema({
    bio: {
        type: String,
        required: true,
    },
    avatar_url: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    uf: {
        type: String,
        required: true,
    },
    neighbord: {
        type: String,
        required: true,
    },
    children: {
        type: String,
        required: true,
    },
    date_birth: {
        type: String,
        required: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project