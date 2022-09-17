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
    //   pool.query("SELECT json_agg(q) FROM q", (err, res) => {
    //   console.log(err, res);
    // })
  },

  getAs: pool.query("SELECT json_agg(a) FROM a", (err, res) => {
    console.log(err, res);
  }),

  getPhotos: pool.query("SELECT json_agg(a_photos) FROM a_photos", (err, res) => {
    console.log(err, res);
  }),

  postQ: pool.query("", (err, res) => {
    console.log(err, res);
  }),

  postA: pool.query("", (err, res) => {
    console.log(err, res);
  }),

  postPhoto: pool.query("", (err, res) => {
    console.log(err, res);
  }),
}