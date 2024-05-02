const express = require('express')
const router = express.Router();
const MenuItem = require('./../models/MenuItem')


router.post('/', async (req, res) => {
    try {
        const menu = req.body;
        const savedMenu = new MenuItem(menu);
        const result = await savedMenu.save();
        console.log('data saved');
        res.status(200).json({ data: result })


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "There is some error" })

    }
})
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        res.status(200).json({ data: data })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "There is some error" })
    }
})

router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste;
        if (taste === 'sweet' || taste === 'spicy' || taste === 'sour') {
            const menu = await MenuItem.find({ taste });
            res.status(200).json(menu)
        } else {
            res.status(404).json({ error: 'invalid taste filter' })
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "There is some error" })
    }
})

module.exports = router;