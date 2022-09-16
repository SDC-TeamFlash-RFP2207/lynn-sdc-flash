const { Pool, Client } = require('pg')
const Pass = require('../env/config.js');

/* These files have been deleted to save space */
// const Questions = require('./questions.csv');
// const Answers = require('./answers.csv');
// const A_Photos = require('./answers_photos.csv');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'atelier',
  password: Pass.PASS,
  port: 5432,
});
pool.connect();

pool.query('CREATE TABLE questions(q_id SERIAL, question_id numerical, a_body VARCHAR(500), date timestamp, username VARCHAR(25), user_email VARCHAR(25), reported integer, helpful_count integer, PRIMARY KEY(q_id)', (err, res) => {
  console.log(err, res);
}).then(res => {
    pool.query("COPY questions(q_id, question_id, a_body, date, username, user_email, reported, helpful_count) FROM Answers DELIMITER ',' CSV HEADER;", (err, res) => {
    console.log(err, res)
  }).then(res => {
    pool.query("alter table questions alter column date type date using to_timestamp(date / 1000)::date;");
    console.log(err, res);
  })
}).catch(err => console.log(err));

pool.query('CREATE TABLE answers(a_id SERIAL, product_id numerical, q_body VARCHAR(500), date timestamp, username VARCHAR(25), user_email VARCHAR(25), reported integer, helpful_count integer, PRIMARY KEY(a_id)', (err, res) => {
  console.log(err, res);
}).then(res => {
    pool.query("COPY answers(a_id, product_id, q_body, date, username, user_email, reported, helpful_count) FROM Answers DELIMITER ',' CSV HEADER;", (err, res) => {
    console.log(err, res)
  }).then(res => {
    pool.query("alter table answers alter column date type date using to_timestamp(date / 1000)::date;");
    console.log(err, res);
  })
}).catch(err => console.log(err));

pool.query('CREATE TABLE answers_photos(p_id SERIAL, answers_id numerical, url varchar(200) PRIMARY KEY(p_id)', (err, res) => {
  console.log(err, res);
}).then(res => {
    pool.query("COPY answers(a_id, answers_id, url) FROM A_Photos DELIMITER ',' CSV HEADER;", (err, res) => {
    console.log(err, res)
  })
}).catch(err => console.log(err));