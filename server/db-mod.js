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
    const { product_id, page=0, count=5 } = req;

    let query =
      `SELECT
        ${product_id} as product_id,
        ${page} as page,
        ${count} as count,
        json_agg(q) as questions
      FROM
        (SELECT
          *
        FROM
          q
        WHERE
          product_id = ${ product_id }
        AND reported = 0
        OFFSET ${ page * count } ROWS
        FETCH FIRST ${ count } ROW ONLY)
        q`;
    return pool.query(query);
  },

  getAs: (req) => { /* returns list of unreported answers and photos that correspond to a question id */
    console.log('models.getAs success!');
    const { question_id, page=0, count=5} = req;
    console.log(req);

    let query =
    `SELECT
      ${question_id} as question_id,
      ${page} as page,
      ${count} as count,
      json_agg(a) as answers
    FROM
      (SELECT
        *,
        json_agg(a_photos) as photos
      FROM
        (select
          answer_id,
          url
        from
          a_photos
       where answer_id = 5)
        a
      WHERE
        question_id = ${ question_id }
      AND reported = 0
      OFFSET ${ page * count } ROWS
      FETCH FIRST ${ count } ROW ONLY)
      a`;

    return pool.query(query);


  },


  postQ: (req) => {
    console.log('models.postQ success!');
    return pool.query(`INSERT INTO q(q_id, product_id, q_body, date, username, user_email, reported, helpful_count) VALUES( *** !! figure this shizz out !! *** )`);
  },

  postA: (req) => {
    // how to add photos as well?
    console.log('models.postA success!');
    return pool.query(`INSERT INTO a(a_id, question_id, a_body, date, username, user_email, reported, helpful_count) VALUES( *** !! figure this shizz out !! *** )`);
  },

  putQHelp: (req) => {
    console.log('models.putQHelp success!');
    return pool.query(`INSERT INTO q(q_id, product_id, q_body, date, username, user_email, reported, helpful_count) VALUES( *** !! figure this shizz out !! *** )`);
  },

  putQR: (req) => {
    console.log('models.putQR success!');
    return pool.query(`INSERT INTO q(q_id, product_id, q_body, date, username, user_email, reported, helpful_count) VALUES( *** !! figure this shizz out !! *** )`);
  },

  putAHelp: (req) => {
    console.log('models.putAHelp success!');
    return pool.query(`INSERT INTO a(a_id, question_id, a_body, date, username, user_email, reported, helpful_count) VALUES( *** !! figure this shizz out !! *** )`);
  },

  putAR: (req) => {
    console.log('models.putAR success!');
    return pool.query(`INSERT INTO a(a_id, question_id, a_body, date, username, user_email, reported, helpful_count) VALUES( *** !! figure this shizz out !! *** )`);
  },

}