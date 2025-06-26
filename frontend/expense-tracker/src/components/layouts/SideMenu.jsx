import React from 'react'
import { SIDE_MENU_DATA } from '../../utils/data'
import { UserContext } from '../../context/UserContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import CharAvatar from '../Cards/CharAvatar';

const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();
    const handleClick = (route) => {
        if (route === "/logout") {
            handleLogout();
            return;
        }
        navigate(route);
    }
    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate('/login');
    };
    return (
        <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-grey-200/50 p-5 sticky top-[61px] z-20'>
            <div className='flex flex-col items-center justify-center gap-4 mt-3 mb-7'>
                {user?.profileImageUrl ? (
                    <img
                        src={user?.profileImageUrl || ""}
                        alt="Profile"
                        className='w-20 h-20 bg-slate-400 rounded-full'
                    />
                ) : (
                    <CharAvatar
                        fullName={user?.fullName}
                        width="w-20"
                        height="h-20"
                        style="text-xl"
                    />
                )}
                <h5 className='text-gray-950 font-medium leading-6'>
                    {user?.fullName || ""}
                </h5>
            </div>
            {SIDE_MENU_DATA.map((item, index) => (
                <button
                    key={`menu_${index}`}
                    className={`w-full flex items-center gap-4 py-3 px-4 rounded-lg text-[15px] my-1 transition-colors duration-200 
                        ${activeMenu === item.label
                            ? 'text-white bg-purple-500 md:text-white md:bg-purple-500'
                            : 'text-gray-700 hover:bg-gray-100 md:text-gray-700 md:hover:bg-gray-100'
                        }`}
                    onClick={() => handleClick(item.path)}
                >
                    <item.icon className='text-xl' />
                    {item.label}
                </button>
            ))}
        </div >
    )
}
export default SideMenu;