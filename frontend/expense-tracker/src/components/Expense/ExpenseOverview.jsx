import React, { useState, useEffect } from 'react';
import { prepareExpenseLineChartData } from '../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomLineChart from '../Charts/CustomLineChart';

// Renamed prop from 'transaction' to 'transactions'
const ExpenseOverview = ({ transactions, onAddExpense }) => { // Renamed onExpenseIncome to onAddExpense for clarity
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        // Ensure transactions is an array before processing
        if (transactions && Array.isArray(transactions)) {
            const result = prepareExpenseLineChartData(transactions); // Use transactions
            setChartData(result);
        }
        return () => { };
    }, [transactions]); // Dependency array: re-run when 'transactions' changes

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <div className=''>
                    <h5 className='text-lg'>
                        Expense Overview
                    </h5>
                    {/* Corrected typo: text-xs- to text-xs */}
                    <p className='text-xs text-gray-400 mt-0.5'>
                        Track your expenses and manage your finances effectively.
                    </p>
                </div>
                {/* Changed onClick prop to onAddExpense for consistency */}
                <button className='add-btn' onClick={onAddExpense}>
                    <LuPlus className='text-lg' />
                    Add Expense
                </button>
            </div>

            <div className='mt-10'>
                <CustomLineChart data={chartData} />
            </div>
        </div>
    );
}

export default ExpenseOverview;