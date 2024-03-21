const connection = require('../config/database');

class Model_Pemilik {

    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM pemilik ORDER BY id_pemilik DESC', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async login(email) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }    

    static async create(data) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO pemilik SET ?', data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async getId(id) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE id_users = ?', [id], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}


    static async update(id, data) {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE pemilik SET ? WHERE id_pemilik = ?', [data, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM pemilik WHERE id_pemilik = ?', id, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Model_Pemilik;
