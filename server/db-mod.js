const { Pool, Client } = require('pg')
const Pass = require('../env/config.js');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'atelier',
  password: Pass.PASS,
  port: 5432,
});
pool.connect();

module.exports = {

  getQs: (req) => {
    console.log("models.getQs works");
    return pool.query(`SELECT * FROM q LIMIT 3`);
  },

  getAs: (req) => {
    // **** this should not return anything that has been reported. **** \\
    return pool.query("SELECT * FROM a LIMIT 3")
  },

  // getPhotos: pool.query("SELECT * FROM a_photos", (err, res) => {
  //   console.log(err, res);
  // }),

  // postQ: pool.query("", (err, res) => {
  //   console.log(err, res);
  // }),

  // postA: pool.query("", (err, res) => {
  //   console.log(err, res);
  // }),

  // postPhoto: pool.query("", (err, res) => {
  //   console.log(err, res);
  // }),
}