import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Create a MySQL connection pool
const db = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "azerty",
    database: "student",
    // Support for newer authentication methods
    authPlugins: {
        mysql_clear_password: () => () => Buffer.from('azerty') // Example for mysql_clear_password
    }
});


// Test the MySQL connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.stack);
        return;
    }
    console.log('Connected to MySQL as id', connection.threadId);
    connection.release(); // Release the connection
});

// Define a route to fetch data from the database
app.get('/', (req, res) => {
    const sql = "SELECT * FROM student_infos";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: "Error inside server" });
        }
        return res.json(result);
    });
});

app.post('/student', (req, res) => {
    const sql = "INSERT INTO student_infos (`Name`, `Email`) VALUES (?)";
    console.log(req.body)
    const values = [
        req.body.name,
        req.body.email
    ];

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error("Error inserting student:", err);
            return res.status(500).json({ error: "Error inserting student" });
        }
        return res.status(200).json({ message: "Student added successfully", data: result });
    });
});

app.get('/read/:id', (req, res) => {
    const sql = "SELECT * FROM student_infos WHERE id = ?";
    const id = req.params.id;
    db.query(sql,[id] ,(err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: "Error inside server" });
        }
        return res.json(result);
    });
});

app.put('/edit/:id', (req,res) => {
    const sql = 'UPDATE student_infos SET `Name`=?, `Email`=? WHERE id =?';
    const id = req.params.id;
    db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: "Error inside server" });
        }
        return res.json(result);       
    })
})

app.delete('/delete/:id', (req,res) => {
    const sql = "DELETE FROM student_infos WHERE ID =?";
    const id =req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ message: "Error inside server" });
        }
        return res.json(result);     
    })
})

// Start the Express server
app.listen(8081, () => {
    console.log(`Server is listening on port 8081`);
});
