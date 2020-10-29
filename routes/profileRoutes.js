const router = require('express').Router();
const authCheck = require('../middleware/authCheck');

router.get('/', authCheck, (req, res) => {
    res.send(req.user);
});

module.exports = router;