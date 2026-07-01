const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
const FILE = "./keys.json";

function loadKeys() {
    if (!fs.existsSync(FILE)) {
        fs.writeFileSync(FILE, "[]");
    }
    return JSON.parse(fs.readFileSync(FILE));
}

function saveKeys(data) {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

app.get("/", (req, res) => {
    res.send("Key API Running");
});

// tạo key
app.get("/create/:key", (req, res) => {
    let keys = loadKeys();

    keys.push({
        key: req.params.key,
        created: Date.now()
    });

    saveKeys(keys);

    res.json({
        success: true,
        key: req.params.key
    });
});

// check key
app.get("/check/:key", (req, res) => {
    let keys = loadKeys();

    let found = keys.find(k => k.key === req.params.key);

    if (!found) {
        return res.json({
            success: false,
            message: "Key không hợp lệ"
        });
    }

    res.json({
        success: true,
        message: "Key hợp lệ"
    });
});

// list key
app.get("/keys", (req, res) => {
    res.json(loadKeys());
});

// delete key
app.get("/delete/:key", (req, res) => {
    let keys = loadKeys();

    keys = keys.filter(k => k.key !== req.params.key);

    saveKeys(keys);

    res.json({
        success: true
    });
});

app.listen(PORT, () => {
    console.log("Server running");
});