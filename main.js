const { Client } = require('pg');
const express = require('express');
const app = express();

app.use(express.json()); // Fix: Added parentheses to call express.json()

const con = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'pass',
    database: 'lwie1',
});

con.connect()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch(err => {
        console.error('Connection error', err.stack);
    });

app.post('/postData', (req, res) => {
    const { name, id, password } = req.body;

    // Fix: Corrected the SQL query to use the right placeholders
    const insert_query = `INSERT INTO usr (name, id, password) VALUES ($1, $2, $3)`;
    
    con.query(insert_query, [name, id, password], (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            return res.status(500).send('Database error');
        }

        console.log('Insert result:', result);
        res.status(201).send('Data inserted successfully');
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});