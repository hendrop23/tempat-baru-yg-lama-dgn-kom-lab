var express = require('express');
const Model_Users = require('../model/model_user');
const router = express.Router();

router.get('/', async function(req, res, next) {
    try {
        let id = req.session.userId;
        let Data = await Model_Users.getId(id);

        if (Data.length > 0) {
            res.render('users/index', {
                title: 'Beranda Pengguna',
                email: Data[0].email
            });
        } else {
            res.status(401).json({ error: 'Pengguna tidak ditemukan' });
        }
    } catch (error) {
        res.status(501).json('Butuh akses login');
    }
});

module.exports = router;
