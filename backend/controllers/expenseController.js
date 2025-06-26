const xlsx = require("xlsx");
const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {
    const userId = req.user.id; // Assuming you have user ID in req.user
    try {
        // Check if user exists
        const { icon, category, amount, date } = req.body;
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date) // Ensure date is a Date object
        });
        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getAllExpenses = async (req, res) => {
    try {
        const userId = req.user.id;
        const expenses = await Expense.find({ userId }).sort({ date: -1 }); // Get all expenses for the user, sorted by date
        res.status(200).json(expenses);
    } catch (error) {
        console.error("Error getting all expenses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error("Error deleting expense:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });

        // Prepare data for excel
        const data = expenses.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0],
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expenses");
        xlsx.writeFile(wb, "Expenses.xlsx");
        res.download("Expenses.xlsx", (err) => {
            if (err) {
                console.error("Error downloading file:", err);
                res.status(500).json({ message: "Error downloading file" });
            }
        });
    } catch (error) {
        console.error("Error downloading expense excel:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}