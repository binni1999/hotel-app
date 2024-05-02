const express = require('express')
const router = express.Router();
const Person = require('./../models/Person');

router.post('/', async (req, res) => {
    try {
        const data = req.body
        //Create a new Person document using the mongoose model
        const newPerson = new Person(data);

        //save the person to the database
        const savedPerson = await newPerson.save();
        res.status(201).json({ data: savedPerson })
    } catch (error) {
        res.status(500).json({ message: "There is some error" })
    }

})

router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "There is some error" })

    }
})


router.get("/:work", async (req, res) => {
    try {
        const workType = req.params.work; //Extract the worktype from the request
        if (workType === 'chef' || workType === 'manager' || workType === 'waiter') {
            const data = await Person.find({ work: workType });  //Find all person who work
            res.status(200).json(data)
        } else {
            res.status(404).json({ error: "Invalid work Type" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "There is some error" })
    }



})

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //return the updated document
            runValidators: true //RUn mongoose validators
        })
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('data updated');
        res.status(200).json(response);


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "There is some error" })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const result = await Person.findOneAndDelete(personId);
        if (!result) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log("data deleted");
        res.status(200).json({ message: 'Person deleted successfully' })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "There is some error" })
    }
})

module.exports = router;