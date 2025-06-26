// src/components/Expense/ExpenseList.jsx
import React from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard'; // Assuming this path is correct for your TransactionInfoCard
import moment from 'moment'; // Ensure moment is installed if you use it

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between mb-4'>
                <h5 className='text-lg'>Expenses</h5> {/* Changed title */}
                <button className='card-btn' onClick={onDownload}>
                    <LuDownload className='text-base' />
                    Download
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'> {/* Added gap for better spacing on grid */}
                {/* Conditional rendering for no transactions */}
                {transactions && transactions.length > 0 ? (
                    transactions.map((expense) => ( // Changed 'income' to 'expense' for clarity
                        <TransactionInfoCard
                            key={expense._id}
                            title={expense.category} // Changed 'source' to 'category' for expenses
                            icon={expense.icon}
                            date={moment(expense.date).format('MMM DD,YYYY')} // Keeping date format
                            amount={expense.amount}
                            type="expense" // Changed type to "expense"
                            onDelete={() => onDelete(expense._id)}
                            hideDeleteBtn={false} // Ensure delete button is visible by default
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full py-4">No expenses recorded yet.</p>
                )}
            </div>
        </div>
    );
};

export default ExpenseList;