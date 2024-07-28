const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const session = require('express-session'); 
const nodemailer = require('nodemailer');






const app = express();
app.use(bodyParser.json()); // Parse incoming JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'Front End', 'src', 'HTML')));
app.use(express.static(path.join(__dirname, '..', 'Front End', 'src', 'CSS')));
app.use(express.static(path.join(__dirname, '..', 'Front End', 'src', 'img')));
app.use(express.static(path.join(__dirname, '..', 'Front End', 'src', 'js')));

app.use(session({
    secret: 'secret', // Change this to a secure random string in production
    resave: true,
    saveUninitialized: true
}));

// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Yash@2004',
    database: 'tata'
});



connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});


// Function to send files with correct paths
const sendFile = (res, filename, message) => {
    const filePath = path.join(__dirname, '..', 'Front End', 'src', 'HTML', filename);
        console.log('Sending file:', filePath); // Debugging log
    if (message) {
        res.redirect(`/${filename}?message=${encodeURIComponent(message)}`);
    } else {
        res.sendFile(filePath);
    }
};

app.get("/", function (req, res) {
    sendFile(res, "main.html");
});

app.get("/login", function (req, res) {
    sendFile(res, "/login.html");
});

app.get("/signup", function (req, res) {
    sendFile(res, "/signup.html");
});





app.post('/signup', function (req, res) {
    const { name, email, password, confirmPassword, phone, gender } = req.body;

    // Validate passwords match
    if (password !== confirmPassword) {
        return res.status(400).send("Passwords do not match.");
    }

    // Insert the new user
    connection.query("INSERT INTO loginuser (user_name, user_mail, user_password, phone_number, gender) VALUES (?, ?, ?, ?, ?)", [name, email, password, phone, gender], function (error, results) {
        if (error) {
            console.error(error);
            return res.status(500).send("Error occurred while signing up.");
        }
        console.log('User inserted successfully');

        req.session.email = email; // Store email in session
        res.redirect("main2.html");
    });
});






app.post("/login", function (req, res) {
    const { email, password } = req.body;
    connection.query("SELECT * FROM loginuser WHERE user_mail = ? AND user_password = ?", [email, password], function (error, results, fields) {
        if (error) {
            console.error(error);
            return res.status(500).send("Error occurred while logging in.");
        }
        if (results.length === 0) {
            return res.status(404).send("User not found or incorrect password.");
        }
        const user = results[0];
        req.session.email = email; // Store email in session
        res.redirect("main2.html");
    });
});









// Send OTP route
app.get("/forgot-password", function (req, res) {
    sendFile(res, "/forgot-password.html");
});

app.post('/send-otp', (req, res) => {
    const { email } = req.body;
    const otp = crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP

    // Retrieve email and app password from database
    connection.query('SELECT * FROM email_credentials WHERE id = 1', (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error occurred while fetching email credentials.');
        }
        if (results.length === 0) {
            return res.status(500).send('Email credentials not found.');
        }

        const { email: senderEmail, app_password } = results[0];

        // Store OTP in database
        connection.query('UPDATE loginuser SET otp = ? WHERE user_mail = ?', [otp, email], (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Error occurred while updating OTP.');
            }
            if (results.affectedRows === 0) {
                return res.status(404).send('Email not found.');
            }

            // Set up nodemailer transporter
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: senderEmail,
                    pass: app_password // Use the app password from the database
                }
            });

            // Email options
            const mailOptions = {
                from: senderEmail,
                to: email,
                subject: 'Password Reset OTP',
                text: `Your OTP is ${otp}`
            };

            // Send email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send('Error occurred while sending OTP.');
                }
                console.log('Email sent: ' + info.response);
                res.send('OTP sent to your email.');
            });
        });
    });
});

// Verify OTP and reset password
app.post('/reset-password', (req, res) => {
    const { email, otp, newPassword } = req.body;
    connection.query('SELECT otp FROM loginuser WHERE user_mail = ?', [email], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error occurred while verifying OTP.');
        }
        if (results.length === 0 || results[0].otp !== otp) {
            return res.status(400).send('Invalid OTP.');
        }

        // Update password
        connection.query('UPDATE loginuser SET user_password = ?, otp = NULL WHERE user_mail = ?', [newPassword, email], (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Error occurred while resetting password.');
            }
            res.send('Password reset successfully.');
        });
    });
});








app.get("/welcome", function (req, res) {
    sendFile(res, "/welcome.html");
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});










