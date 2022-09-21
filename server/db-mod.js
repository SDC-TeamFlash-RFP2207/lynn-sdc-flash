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

    let query =
    `SELECT
      ${question_id} as question_id,
      ${page} as page,
      ${count} as count,
      json_agg(a) as answers
    FROM
      (SELECT
        *,
        COALESCE ((
          SELECT json_agg(
            json_build_object(
              'answer_id', answer_id,
              'url', url
            ))
          FROM a_photos
          WHERE answer_id = 5), '[]'::json) AS photos
      FROM
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
    const { body, name, email, product_id } = req;

    let query =
    `INSERT INTO
      q
      (product_id,
      q_body,
      username,
      user_email,
      date,
      reported,
      helpful_count)
    VALUES
      ($1,
      $2,
      $3,
      $4,
      NOW(),
      0,
      0)`

      const data = [product_id, body, name, email];

    return pool.query(query, data);
  },

  postA: (req) => {
    console.log('models.postA success!');
    const { body, name, email } = req.body;
    const { question_id } = req.params

    let query =
    `INSERT INTO
      a
      (question_id,
      a_body,
      username,
      user_email,
      date,
      reported,
      helpful_count)
    VALUES
      ($1,
      $2,
      $3,
      $4,
      NOW(),
      0,
      0)
    RETURNING
      a_id`;

      const data = [question_id, body, name, email];

    return pool.query(query, data);
  },

  postPhotos: (arr) => {
    console.log('models.postPhotos Success!');

    let query =
      `INSERT INTO
        a_photos
        (answer_id,
        url)
      VALUES
        ($1,
        $2)`;

    return pool.query(query, arr);
  },

  putQHelp: (req) => {
    const { question_id } = req;
    console.log('models.putQHelp success!');

    let query =
      `UPDATE q
      SET helpful_count = helpful_count + 1
      WHERE q_id = ${question_id};`

    return pool.query(query);
  },

  putQR: (req) => {
    const { question_id } = req;
    console.log('models.putQR success!');

    let query =
      `UPDATE q
      SET reported = reported + 1
      WHERE q_id = ${question_id};`;

    return pool.query(query);
  },

  putAHelp: (req) => {
    const { answer_id } = req;
    console.log('models.putAHelp success!');

    let query =
      `UPDATE a
      SET helpful_count = helpful_count + 1
      WHERE a_id = ${answer_id};`;
    return pool.query(query);
  },

  putAR: (req) => {
    const { answer_id } = req;
    console.log('models.putAR success!');

    let query =
    `UPDATE a
    SET reported = reported + 1
    WHERE a_id = ${answer_id};`;

    return pool.query(query);
  },

}