import "reflect-metadata";
import express from "express";
import "@shared/container";
const app = express();

app.use(express.json());

app.get("/host/:id", (req, res) => {
    console.log(req.originalUrl);

    return res.json({
        message: "Hello world",
    });
});

app.listen(3000, () => console.log("im running"));
