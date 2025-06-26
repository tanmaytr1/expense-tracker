import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import moment from 'moment';
import TransactionInfoCard from '../Cards/TransactionInfoCard';


const RecentTransactions = ({ transactions, onSeeMore }) => {
    const handleDeleteTransaction = (transactionId) => {
        console.log(`Attempting to delete transaction with ID: ${transactionId}`);

    };

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Recent Transactions</h5>
                <button className='card-btn' onClick={onSeeMore}>
                    See More <LuArrowRight className='text-base' />
                </button>
            </div>
            <div className='mt-6'>
                {transactions && Array.isArray(transactions) && transactions.length > 0 ? (
                    transactions.slice(0, 5).map((item) => (
                        <TransactionInfoCard
                            key={item._id}
                            title={item.type === "expense" ? item.category : item.source}
                            icon={item.icon}
                            // Corrected moment format
                            date={moment(item.date).format("MMM DD, YYYY")}
                            amount={item.amount}
                            type={item.type}

                            hideDeleteBtn={true}
                            onDelete={() => handleDeleteTransaction(item._id)}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 text-center py-4">No recent transactions found.</p>
                )}
            </div>
        </div>
    );
};

export default RecentTransactions;