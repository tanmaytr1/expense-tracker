
import React, { useState } from 'react'; // Keep useState here
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from './SideMenu'; // Keep this import

const Navbar = () => {

    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard'); // Default or set as needed

    return (
        <div className='flex gap-5 bg-white border-b border-grey-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30'>
            <button
                className='block lg:hidden text-black'
                onClick={() => {
                    setOpenSideMenu(!openSideMenu);
                }}
            >
                {openSideMenu ? (
                    <HiOutlineX className='text-2xl' />
                ) : (
                    <HiOutlineMenu className='text-2xl' />
                )}
            </button>

            <h2 className='text-lg font-medium text-black'>Expense Tracker</h2>

            {/* SideMenu is rendered here, controlled by Navbar's state */}
            {openSideMenu && (
                <div className='fixed top-[61px] -ml-4 bg-purple-500 z-50'>
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}
        </div>
    );
};

export default Navbar;