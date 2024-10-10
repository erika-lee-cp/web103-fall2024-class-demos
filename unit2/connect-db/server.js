import express from 'express'
import { pool } from './database.js'

const app = express()
const PORT = process.env.PORT || 3000;
app.get("/bosses", async (req, res) => {


  const getBossesQuery = `
  SELECT * FROM bosses;
`
  const results = await pool.query(getBossesQuery);
  console.log(results.rows);
  res.status(200).json(
    {'bosses':results.rows}
  );
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})