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

app.use(cors());
app.use(express.json());



const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  }
};

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
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
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
