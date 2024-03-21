var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var Model_Users = require('../model/model_user');

// GET halaman utama
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// GET halaman registrasi
router.get('/register', function(req, res, next) {
    res.render('auth/register');
});

// GET halaman login
router.get('/login', function(req, res, next) {
    res.render('auth/login');
});

router.post('/saveusers', async (req, res) => {
  try {
      let { email, password } = req.body; // Pastikan ini benar
      let enkripsi = await bcrypt.hash(password, 10);
      let Data = {
          email,
          password: enkripsi
      };
      await Model_Users.storeData(Data);
      req.flash('success', 'Registrasi berhasil');
      res.redirect('/login');
  } catch (error) {
      console.error(error);
      req.flash('error', 'Gagal melakukan registrasi');
      res.redirect('/register');
  }
});

router.post('/log', async (req, res) => {
    let { email, password } = req.body;
    try {
        let Data = await Model_Users.login(email);
        if (Data.length > 0) {
            let enkripsi = Data[0].password;
            let cek = await bcrypt.compare(password, enkripsi);
            if (cek) {
                req.session.userId = Data[0].id_users;
                req.flash('success', 'Berhasil login');
                res.redirect('/kapal');
            } else {
                req.flash('error', 'Email atau password salah');
                res.redirect('/login');
            }
        } else {
            req.flash('error', 'Akun tidak ditemukan');
            res.redirect('/login');
        }
    } catch (err) {
        console.error(err);
        req.flash('error', 'Error pada fungsi');
        res.redirect('/login');
    }
});

router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
      if (err) {
          console.error(err);
      } else {
          res.redirect('/login');
      }
  });
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});





module.exports = router;
