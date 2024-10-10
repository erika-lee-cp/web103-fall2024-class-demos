import express from 'express'
import { pool } from './database.js'

const app = express()
const PORT = process.env.PORT || 3000;

app.get("/games", async (req, res) => {
  const query = `SELECT id, title FROM games;`
  try {
    const results = await pool.query(query);
    res.status(200).json({
      "games": results.rows,
    });
  } catch (error) {
    res.status(500).json({
      "error": error.message,
    });
  }
});


app.get("/games/:id", async (req, res) => {
  const gameId = parseInt(req.params.id);

  const query = `SELECT * FROM games WHERE id = $1;`
  const value = [gameId];

  try {
    const results = await pool.query(query, value);
    if (results.rows.length != 1) {
      res.status(500).json({
        "error": `expected 1 matching result for game ${gameId}, but got ${results.rows.length}`
      });
      return;
    }
    res.status(200).json(
      results.rows[0]
    );
  } catch (error) {
    res.status(500).json({
      "error": error.message,
    });
  }
});

app.get("/games/platform/:platformName", async (req, res) => {
  const platform = req.params.platformName;
  const query = `SELECT * FROM games WHERE platform = $1`;
  const values = [platform];
  try {
    const results = await pool.query(query, values);
    res.status(200).json({
      "games": results.rows,
    });
  } catch (error) {
    res.status(500).json({
      "error": error.message,
    });
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})
