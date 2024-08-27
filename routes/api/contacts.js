const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: "hello, db worked!"
    });
});

// router.get('/:contactId', getContactById);

// router.post('/', async (req, res, next) => {
//     const { error } = createContactSchema.validate(req.body);
//     if (error) return res.status(400).json({ message: error.details[0].message });
//     next();
// }, createContact);

// router.put('/:contactId', async (req, res, next) => {
//     const { error } = createContactSchema.validate(req.body);
//     if (error) return res.status(400).json({ message: error.details[0].message });
//     next();
// }, updateExistingContact);

// router.delete('/:contactId', deleteContact);

module.exports = router;
