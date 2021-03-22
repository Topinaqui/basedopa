const express = require('express');
// const authMiddleware = require('../middleware/auth');

const Users = require('../models/user');
const Products = require('../models/products');

const router = express.Router();

// router.use(authMiddleware);


// Like / Dislike
router.post('/:userId/likes', async (req, res) => {
    try {
        console.log(req.headers.username)
        console.log(req.params.userId)
        console.log(req.io, req.connectedUsers);

        const { username } = req.headers;
        const { userId } = req.params;

        const loggedUsers = await Users.findById(username);
        let targetUsers = null

        try {
            targetUsers = await Users.findById(userId);
        } catch (error) {
            return res.status(400).json({ error: 'User not exists' });
        }

        if (targetUsers.likes.includes(loggedUsers._id)) {
            const loggedSocket = req.connectedUsers[username];
            const targetSocket = req.connectedUsers[userId];

            if (loggedSocket) {
                req.io.to(loggedSocket).emit('match', targetUsers);
            }

            if (targetSocket) {
                req.io.to(targetSocket).emit('match', loggedUsers);
            }
        }

        loggedUsers.likes.push(targetUsers._id);

        await loggedUsers.save();

        return res.json(loggedUsers);
    } catch (err) {
        return res.status(400).send({ error: 'Error loading projects' });
    }
})

router.post('/:userId/dislikes', async (req, res) => {
    try {
        const { username } = req.headers;
        const { userId } = req.params;

        const loggedUsers = await Users.findById(username);
        let targetUsers = null

        try {
            targetUsers = await Users.findById(userId);
        } catch (error) {
            return res.status(400).json({ error: 'User not exists' });
        }


        loggedUsers.dislikes.push(targetUsers._id);

        await loggedUsers.save();

        return res.json(loggedUsers);
    } catch (err) {
        return res.status(400).send({ error: 'Error loading projects' });
    }
})

//
router.get('/', async (req, res) => {
    try {
        const user = await Users.find().populate(['products']);

        return res.send({ user });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading users' });
    }
})

router.get('/:userId', async (req, res) => {
    try {
        const user = await Users.findById(req.params.userId).populate(['products']);
        return res.send({ user });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading users' });
    }
})


router.post('/', async (req, res) => {
    try {
        const { name, username, email, password, bio, avatar_url, city, uf, neighbord, children, date_birth, products } = req.body;

        const project = await Users.create({
            name,
            email,
            username,
            password,
            bio,
            avatar_url,
            city,
            uf,
            neighbord,
            children,
            date_birth
        });

        await Promise.all(products.map (async product => {
            const userProducts = new Products({ ...product, user: project._id });

            await  userProducts.save();

            project.products.push(userProducts);
        }));

        await project.save();

        return res.send({ project });

    } catch (err) {  console.log(err)
        return res.status(400).send({ error: 'Erro ao criar um novo usuário' });
    }
})


router.put('/:userId', async (req, res) => {
    try {
        const { name, username, email, password, bio, avatar_url, city, uf, neighbord, children, date_birth, products } = req.body;

        const project = await Users.findByIdAndUpdate(req.params.userId, {
            name,
            email,
            username,
            password,
            bio,
            avatar_url,
            city,
            uf,
            neighbord,
            children,
            date_birth
        }, {new: true} );

        project.products = [];

        await Products.remove({ user: project._id });

        await Promise.all(products.map (async product => {
            const userProducts = new Products({ ...product, user: project._id });

            await  userProducts.save();

            project.products.push(userProducts);
        }));

        await project.save();

        return res.send({ project });
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Erro ao atualizar user' });
    }
})

router.delete('/:usersId', async (req, res) => {
    try {
        const user = await Users.findByIdAndRemove(req.params.usersId)

        return res.send()

    } catch (error) {
        return res.status(400).send({ error: "error deleting user" })
    }
})

module.exports = app => app.use('/users', router)