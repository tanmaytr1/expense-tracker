// incomeController.js
const xlsx = require("xlsx");
const Income = require("../models/Income");


exports.addIncome = async(req,res)=>{
    
    const userId = req.user.id; // Assuming you have user ID in req.user
    try {
        // Check if user exists
        const { icon, source, amount, date } = req.body;
        if(!source || !amount || !date) {
            return res.status(400).json({ message: "all fields are required" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date) // Ensure date is a Date object
        });
        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error) {
        console.error("Error adding income:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getAllIncome = async(req,res)=>{
    try {
        const userId = req.user.id;
        const incomes = await Income.find({ userId }).sort({ date: -1 }); // Get all income for the user, sorted by date
        res.status(200).json(incomes);
    } catch (error) {
        console.error("Error getting all income:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.deleteIncome = async(req,res)=>{ 
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Income deleted successfully" });
    } catch (error){
        console.error("Error deleting income:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.downloadIncomeExcel = async(req,res)=>{
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        //prepare data for excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0], // 
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "Income.xlsx");
        res.download("Income.xlsx", (err) => {
            if (err) {
                console.error("Error downloading file:", err);
                res.status(500).json({ message: "Error downloading file" });
            }
        });
    } catch (error) {
        console.error("Error downloading income excel:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}