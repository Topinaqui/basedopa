const mongoose = require('../../database')
const { Schema } = require('mongoose');
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    bio: String,
    avatar_url: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    uf: {
        type: String,
        require: true,
    },
    neighbord: {
        type: String,
        require: true,
    },
    children: {
        type: String,
        require: true,
    },
    date_birth: {
        type: String,
        require: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
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

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User