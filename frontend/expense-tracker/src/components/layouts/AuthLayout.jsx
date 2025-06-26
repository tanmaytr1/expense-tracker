import React from 'react';
import CARD_2 from '../../assets/images/card2.png';
import { LuTrendingUpDown } from 'react-icons/lu';

const StatusInfoCard = ({ icon, label, value, colors }) => {
    return (
        <div className='flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-grey-200/50 z-10 '>
            <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${colors} rounded-full drop-shadow-xl`}>
                {icon}
            </div>
            <div>
                <h6 className='text-xs text-grey-500 mb-1'>{label}</h6>
                <span className='text-[20px]'>{value}</span>
            </div>
        </div>
    );
};

const AuthLayout = ({ children }) => {
    return (
        // Outermost container: occupies full viewport height, prevents main browser scrollbar.
        // flex-col on mobile to stack, md:flex-row on desktop for side-by-side.
        <div className='flex flex-col md:flex-row h-dvh overflow-hidden'>

            {/* Left Panel: Contains the 'Expense Tracker' title and your SignUp form */}
            {/* flex-grow allows it to take available height on mobile.
                overflow-y-auto enables scrolling ONLY within this panel if content overflows.
                Adjusted padding (pt-8 pb-8) for better mobile spacing.
                justify-start ensures content starts from top for scrollability on mobile.
                md:justify-center will center the whole block (title + children) on desktop. */}
            <div className='w-screen md:w-[60vw] px-6 pt-8 pb-8 md:px-12 md:pt-8 md:pb-12 flex flex-col justify-start md:justify-center flex-grow overflow-y-auto'>
                <h2 className='text-lg font-medium text-black mb-4'>Expense Tracker</h2>
                {children} {/* Your SignUp component is rendered here */}
            </div>

            {/* Right Panel: Decorative/Info Area - Hidden on mobile */}
            <div className='hidden md:block w-[40vw] h-dvh bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'>
                <div className='w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5' />
                <div className='w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-50 -right-10' />
                <div className='w-48 h-56 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5' />

                <div className='grid grid-cols-1 z-20'>
                    <StatusInfoCard
                        icon={<LuTrendingUpDown />}
                        label="Track your income and expenses"
                        value="430,000"
                        colors="bg-primary"
                    />
                </div>
                <img src={CARD_2} className='w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15' />
            </div>

        </div>
    );
};

export default AuthLayout;