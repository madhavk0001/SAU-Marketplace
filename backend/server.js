const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");

// MODELS
const Product = require(path.join(__dirname, "models", "Product.js"));
const User = require(path.join(__dirname, "models", "User.js"));

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT||5000;
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "OK" : "MISSING");

// ===============================
// EMAIL TRANSPORTER
// ===============================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,        
    pass: process.env.EMAIL_PASS            
  }
});

// ===============================
// CONNECT TO MONGODB
// ===============================
mongoose.connect("mongodb+srv://hazur2708_db_user:Hazur786@sau-marketplace.rnpihvj.mongodb.net/?appName=sau-marketplace")
  .then(() => {
    console.log("MongoDB Connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch(err => {
    console.error("Mongo Error ❌:", err);
  });


// ===============================
// PRODUCTS API
// ===============================

// GET products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST product
app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    console.error("Error saving product:", err);
    res.status(500).json({ error: err.message });
  }
});


// ===============================
// USER AUTH APIs
// ===============================

// REGISTER
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await User.findOne({
      $or: [{ email }, { mobile }]
    });

    if (existing) {
      return res.status(400).json({ message: "Email or mobile already exists" });
    }

    const user = new User({ name, email, mobile, password });
    await user.save();

    res.json({ message: "Registered successfully" });

  } catch (err) {
    console.error("Register error:", err);

    if (err.code === 11000) {
      return res.status(400).json({
        message: "Email or mobile already exists"
      });
    }

    res.status(500).json({ message: "Registration failed" });
  }
});


// ===============================
// LOGIN API
// ===============================
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN BODY:", req.body);

    if (!email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: "Wrong password" });
    }

    res.json({ message: "Login successful", user });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ===============================
// OTP + RESET PASSWORD
// ===============================

// Generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// SEND OTP (EMAIL)
app.post("/api/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email not registered" });
    }

    const otp = generateOTP();

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min

    await user.save();

    // SEND EMAIL
    await transporter.sendMail({
      from: "SAU Marketplace",
      to: email,
      subject: "Your OTP Code",
      html: `
        <h2>Your OTP is: ${otp}</h2>
        <p>This OTP is valid for 5 minutes.</p>
      `
    });

    console.log("OTP sent to:", email);

    res.json({ message: "OTP sent to email 📩" });

  } catch (err) {
    console.error("OTP error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});


// RESET PASSWORD
app.post("/api/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });

    if (
      !user ||
      user.otp !== otp ||
      user.otpExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = newPassword;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    console.error("Reset error:", err);
    res.status(500).json({ message: "Reset failed" });
  }
});
