const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("Hello world");
})

router.use('/users', require('./users'));
router.use('/', require('./swagger'));

module.exports = router;