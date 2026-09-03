require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// -------------------------
// Middleware
// -------------------------

app.use(cors());
app.use(express.json());

// -------------------------
// MongoDB Connection
// -------------------------

const connectDB = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }

    await mongoose.connect(MONGODB_URI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

// -------------------------
// Expense Schema
// -------------------------

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    amount: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// -------------------------
// Expense Model
// -------------------------

const Expense = mongoose.model("Expense", expenseSchema);

// -------------------------
// Home Route
// -------------------------

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Expense Tracker Backend is running"
  });
});

// -------------------------
// CREATE EXPENSE
// POST /expenses
// -------------------------

app.post("/expenses", async (req, res) => {
  try {
    const { title, amount } = req.body;

    if (!title || typeof amount !== "number") {
      return res.status(400).json({
        success: false,
        message: "Title and numeric amount are required"
      });
    }

    const expense = new Expense({
      title,
      amount
    });

    const savedExpense = await expense.save();

    res.status(201).json({
      success: true,
      message: "Expense created successfully",
      expense: savedExpense
    });
  } catch (error) {
    console.error("Create expense error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create expense"
    });
  }
});

// -------------------------
// GET ALL EXPENSES
// GET /expenses
// -------------------------

app.get("/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      expenses
    });
  } catch (error) {
    console.error("Get expenses error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch expenses"
    });
  }
});

// -------------------------
// GET SINGLE EXPENSE
// GET /expenses/:id
// -------------------------

app.get("/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid expense ID"
      });
    }

    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found"
      });
    }

    res.status(200).json({
      success: true,
      expense
    });
  } catch (error) {
    console.error("Get single expense error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch expense"
    });
  }
});

// -------------------------
// UPDATE EXPENSE
// PUT /expenses/:id
// -------------------------

app.put("/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid expense ID"
      });
    }

    if (!title || typeof amount !== "number") {
      return res.status(400).json({
        success: false,
        message: "Title and numeric amount are required"
      });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      {
        title,
        amount
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      expense: updatedExpense
    });
  } catch (error) {
    console.error("Update expense error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update expense"
    });
  }
});

// -------------------------
// DELETE EXPENSE
// DELETE /expenses/:id
// -------------------------

app.delete("/expenses/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid expense ID"
      });
    }

    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully"
    });
  } catch (error) {
    console.error("Delete expense error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete expense"
    });
  }
});

// -------------------------
// Start Server
// -------------------------

const startServer = async () => {
  await connectDB();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();

