import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
const url = "https://flag-gilt.vercel.app/api/challenge";
const token = "uM0M7uypyeeHZ741XIrs9KsFOUEhxUdtXJA=";

app.post("/flag", async (req, res) => {
  try {
    let apiResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const cursor = [];
    let result = await apiResponse.json();
    cursor.push(result.nextCursor);

    while (result.nextCursor) {
      apiResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cursor: result.nextCursor }),
      });

      result = await apiResponse.json();
      result.nextCursor
        ? cursor.push(result.nextCursor)
        : cursor.push(result.flag);
    }

    const flagResult = { cursor, result };

    res.json(flagResult);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
