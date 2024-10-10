import express from 'express'
import { pool } from './database.js'

const app = express()
const PORT = process.env.PORT || 3000;

app.get("/games", async (req, res) => {
  const query = `SELECT id, title FROM games;`
  try {
    const results = await pool.query(query);
    
    res.status(200).json(
      { "games": results.rows }
    );

  } catch (error) {
    res.status(500).json({
      "error": error.message
    })
  }
});

app.get("/games/safe/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const query = `SELECT * FROM games where id = $1;`
  const values = [id];
  try {
    const results = await pool.query(query, values);
    
    if (results.rows.length != 1) {
      res.status(500).json({
        "error": f`expected 1 matching result for game ${id}, but got ${results.rows.length}`
      })
      return;
    }

    res.status(200).json(
      results.rows[0]
    );

  } catch (error) {
    res.status(500).json({
      "error": error.message
    })
  }
});

// What happens if you visit "localhost:3000/games/unsafe/1; DROP TABLE games"
app.get("/games/unsafe/:id", async (req, res) => {
  const id = req.params.id;
  
  const query = `SELECT * FROM games where id = ${id};`
  
  // This query will become:
  // `SELECT * FROM games where id = 1; DROP TABLE games`
  // !!

  try {
    const results = await pool.query(query);
    res.status(200).json(
      { "games": results.rows }
    );

  } catch (error) {
    res.status(500).json({
      "error": error.message
    })
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})