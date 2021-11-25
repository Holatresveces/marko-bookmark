const path = require("path");
const express = require("express");
const cors = require("cors");
const metascraper = require("metascraper")([
  require("metascraper-description")(),
  require("metascraper-image")(),
  require("metascraper-title")(),
  require("metascraper-url")(),
]);
const got = require("got");

const app = express();
app.use(cors());

app.use(express.static(path.resolve(__dirname, "../build")));

app.get("/api/metadata", async (req, res) => {
  try {
    const targetUrl = req.query.url;
    const { body: html, url } = await got(targetUrl);
    const metadata = await metascraper({ html, url });
    console.log(metadata);
    res.json(metadata);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error,
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
