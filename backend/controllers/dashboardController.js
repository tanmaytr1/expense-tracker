const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose"); // Only need Types for ObjectId conversion

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        // Ensure userId is a valid ObjectId, useful if coming from a token's payload
        const userObjectId = new Types.ObjectId(String(userId));

        // Fetch total income and total expense using aggregation
        const totalIncomeResult = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const totalIncome = totalIncomeResult[0]?.total || 0;

        const totalExpenseResult = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const totalExpense = totalExpenseResult[0]?.total || 0;

        // Calculate date thresholds
        const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        // Get income transactions in last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId: userObjectId,
            date: { $gte: sixtyDaysAgo },
        }).sort({ date: -1 });

        // Get total income in last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce((acc, curr) => acc + curr.amount, 0);

        // Get expense transactions in last 30 days
        const last30DaysExpenseTransactions = await Expense.find({
            userId: userObjectId,
            date: { $gte: thirtyDaysAgo },
        }).sort({ date: -1 });

        // Get total expense in last 30 days
        const expenseLast30Days = last30DaysExpenseTransactions.reduce((acc, curr) => acc + curr.amount, 0);

        // Fetch last 5 transactions (income and expense)
        const incomeTransactions = await Income.find({ userId: userObjectId })
            .sort({ date: -1 })
            .limit(5)
            .lean(); // Use .lean() for plain JavaScript objects, slightly faster for reads

        const expenseTransactions = await Expense.find({ userId: userObjectId })
            .sort({ date: -1 })
            .limit(5)
            .lean(); // Use .lean()

        const lastTransactions = [
            ...incomeTransactions.map(txn => ({ ...txn, type: "income" })),
            ...expenseTransactions.map(txn => ({ ...txn, type: "expense" })) // Corrected typo here (txn instead of txm)
        ].sort((a, b) => b.date - a.date); // Sort by date descending

        // Final response
        res.json({
            totalBalance: totalIncome - totalExpense,
            totalIncome: totalIncome,
            totalExpense: totalExpense,
            incomeLast60Days: {
                transactions: last60DaysIncomeTransactions,
                total: incomeLast60Days
            },
            expenseLast30Days: {
                transactions: last30DaysExpenseTransactions,
                total: expenseLast30Days
            },
            recentTransactions: lastTransactions,
        });

    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // More specific error handling could be added here based on error types
        return res.status(500).json({ message: "Internal server error" });
    }
};