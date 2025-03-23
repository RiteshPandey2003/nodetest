require("dotenv").config(); // Load environment variables

const express = require("express");
const app = express();
const port = process.env.PORT || 3000; // Use env variable or default to 3000

app.use(express.json()); // Middleware to parse JSON body

// Initial in-memory data
let items = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Smartphone" },
    { id: 3, name: "Tablet" }
];

// Create - Add a new item
app.post("/items", (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }
    const newItem = { id: items.length + 1, name };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Read - Get all items
app.get("/items", (req, res) => {
    res.json(items);
});

// Read - Get a single item by ID
app.get("/items/:id", (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
});

// Update - Modify an item by ID
app.put("/items/:id", (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }
    const { name } = req.body;
    if (name) item.name = name;
    res.json(item);
});

// Delete - Remove an item by ID
app.delete("/items/:id", (req, res) => {
    items = items.filter(i => i.id !== parseInt(req.params.id));
    res.json({ message: "Item deleted successfully" });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
