import express from "express"
import { streamSB } from './utils/streamSB.js'
const app = express();
app.get("/config", async (req, res) => {
    res.send(await streamSB());
})
app.listen(8081, () => console.log(`Listening on PORT 8081`))