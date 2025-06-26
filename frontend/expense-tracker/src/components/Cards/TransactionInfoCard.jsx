// import React from 'react';
// import {
//     LuUtensils,
//     LuTrendingUp,
//     LuTrendingDown,
//     LuTrash2
// } from 'react-icons/lu';

// const TransactionInfoCard = ({ title, icon, date, amount, type, hideDeleteBtn, onDelete }) => {
//     // Corrected to explicitly return the class string
//     const getAmountStyles = () => {
//         return type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";
//     };

//     return (
//         <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60'>
//             <div className='w-12 h-12 flex items-center justify-center text-gray-800 bg-gray-100 rounded-full'>
//                 {icon ? (
//                     <img src={icon} alt={title} className='w-6 h-6' />
//                 ) : (
//                     // Default icon if 'icon' prop is not provided
//                     <LuUtensils />
//                 )}
//             </div>
//             <div className='flex-1 flex items-center justify-between'>
//                 <div>
//                     <p className='text-sm text-gray-700 font-medium'>{title}</p>
//                     <p className='text-xs text-gray-400 mt-1'>{date}</p>
//                 </div>
//                 <div className='flex items-center gap-2'>
//                     {!hideDeleteBtn && onDelete && ( // Ensure onDelete prop exists before rendering the button
//                         <button
//                             className='text-gray hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
//                             onClick={onDelete}
//                         // Added for accessibility
//                         >
//                             <LuTrash2 size={18} />
//                         </button>
//                     )}
//                 </div>
//                 <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
//                     <h6 className='text-xs font-medium'>
//                         {type === 'income' ? '+' : '-'} ${amount}
//                     </h6>
//                     {type === 'income' ? <LuTrendingUp /> : <LuTrendingDown />}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TransactionInfoCard;


import React from 'react';
import {
    LuUtensils,
    LuTrendingUp,
    LuTrendingDown,
    LuTrash2
} from 'react-icons/lu';

const TransactionInfoCard = ({ title, icon, date, amount, type, hideDeleteBtn, onDelete }) => {
    const getAmountStyles = () => {
        return type === "income" ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500";
    };

    return (
        <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60'>
            <div className='w-12 h-12 flex items-center justify-center text-gray-800 bg-gray-100 rounded-full'>
                {icon ? (
                    <img src={icon} alt={title} className='w-6 h-6' />
                ) : (
                    <LuUtensils />
                )}
            </div>
            <div className='flex-1 flex items-center justify-between'>
                {/* Left side: Title and Date */}
                <div>
                    <p className='text-sm text-gray-700 font-medium'>{title}</p>
                    <p className='text-xs text-gray-400 mt-1'>{date}</p>
                </div>

                {/* Right side: Contains both Delete Button and Amount/Trending */}
                {/* Use 'flex' and 'items-center' to align them horizontally, and 'gap-2' for spacing */}
                <div className='flex items-center gap-2'> {/* This new wrapper div */}
                    {!hideDeleteBtn && onDelete && (
                        <button
                            className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
                            // Added for accessibility
                            onClick={onDelete}
                        >
                            <LuTrash2 size={18} />
                        </button>
                    )}
                    {/* Your existing Amount and Trending Icon div */}
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
                        <h6 className='text-xs font-medium'>
                            {type === 'income' ? '+' : '-'} ${amount}
                        </h6>
                        {type === 'income' ? <LuTrendingUp /> : <LuTrendingDown />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionInfoCard;