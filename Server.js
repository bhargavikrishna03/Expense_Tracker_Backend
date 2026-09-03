<<<<<<< HEAD
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
=======
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(express.json());

// const MONGO_URI = 'mongodb://localhost:27017/demoETracker';

// const connectDb = async () => {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log('connect to MongoDb');
//   } catch (err) {
//     console.error('Error connecting to MongoDB', err);
//     process.exit(1);
//   }
// }

// const expenseSchema = new mongoose.Schema({
//   title:{
//     type: String,
//     required: true
//   },
//   amount:{
//     type: Number,
//     required:true
//   }
// })

// const Expense = mongoose.model('Expense', expenseSchema);
// app.post('/expenses', async (req, res) => {
//   try {
//     const { title, amount } = req.body;
//     const expense = new Expense({ title, amount });
//     await expense.save();
//     res.status(201).json(expense);
//   } catch (error) {
//     console.error('Error saving expenses:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// })
// app.get('/expenses', async (req, res) => {
//   try {
//     const expense = await Expense.find();
//     res.json(expense);
//   } catch(error) {
//     console.log('Error fetching expenses', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// })

// app.delete('/expenses/:id', async(req, res) => {
//   try {
//     const deleteExpenses = await Expense.findByIdAndDelete(req.params.id);
//     if (!deleteExpenses) {
//       return res.status(404).json({ error: "Expenses not found" });
//     }
//     res.json({ message: "Deleted Successfully" });
//   } catch (error) {
//     console.log("Error deleting expenses:", error);
//     res.status(500).json({ error: "Failed to delete expense" });
//   }
// })

// app.put('/expenses/:id', async(req, res)=> {
//   try{
//     const updateExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if(!updateExpense) {
//       return res.status(404).json({ error: "Expense not found" });
//     }
//     res.json({ message: "Deleted Successfully" });
//   } catch (error) {
//     console.log("Error Update expenses:", error);
//     res.status(500).json({ error: "Failed to Update expense" });
//   }
// })


// connectDb().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running at http://localhost:${PORT}`);
//   })
// }) 


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
>>>>>>> 8cb84dda80c2e6ef2a9994296598af41a29cd58e

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
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
=======


const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
>>>>>>> 8cb84dda80c2e6ef2a9994296598af41a29cd58e
    process.exit(1);
  }
};

<<<<<<< HEAD
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
=======
const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

const Expense = mongoose.model('Expense', expenseSchema);

// POST: Create new expense
app.post('/expenses', async (req, res) => {
  try {
    const { title, amount } = req.body;

    if (!title || typeof amount !== 'number') {
      return res.status(400).json({ error: 'Title and numeric amount are required' });
    }

    const expense = new Expense({ title, amount });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    console.error('Error saving expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET: Fetch all expenses
app.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE: Delete an expense
app.delete('/expenses/:id', async (req, res) => {
>>>>>>> 8cb84dda80c2e6ef2a9994296598af41a29cd58e
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
<<<<<<< HEAD
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

=======
      return res.status(400).json({ error: 'Invalid expense ID' });
    }

    const deleted = await Expense.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

// PUT: Update an expense
app.put('/expenses/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid expense ID' });
    }

    const { title, amount } = req.body;

    if (!title || typeof amount !== 'number') {
      return res.status(400).json({ error: 'Title and numeric amount are required for update' });
    }

    const updated = await Expense.findByIdAndUpdate(id, { title, amount }, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json({ message: 'Expense updated successfully', expense: updated });
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Failed to update expense' });
  }
});

// Start the server
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});
>>>>>>> 8cb84dda80c2e6ef2a9994296598af41a29cd58e
