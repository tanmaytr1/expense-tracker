// import React, { use, useEffect, useState } from 'react'
// import DashboardLayout from '../../components/layouts/DashboardLayout'
// import IncomeOverview from '../../components/Income/IncomeOverview'
// import { API_PATHS } from '../../utils/apiPaths';
// import axiosInstance from '../../utils/axiosInstance';
// import Modal from '../../components/Modal';
// import AddIncomeForm from '../../components/Income/AddIncomeForm';
// import { toast } from 'react-hot-toast';
// import IncomeList from '../../components/Income/IncomeList';
// import DeleteAlert from '../../components/DeleteAlert';
// import { useUserAuth } from '../../hooks/useUserAuth';

// const Income = () => {
//   useUserAuth();
//   const [incomeData, setIncomeData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [openDeleteAlert, setOpenDeleteAlert] = useState({
//     show: false,
//     data: null,
//   });

//   //get all income details
//   const fetchIncomeDetails = async () => {
//     if (loading) return;
//     setLoading(true);

//     try {
//       const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);
//       if (response.data) {
//         setIncomeData(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching income details:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   //handle add income
//   const handleAddIncome = async (income) => {
//     const { source, amount, date, icon } = income;

//     // Validate income data
//     if (!source || !amount || !date) {
//       toast.error("Please fill all fields");
//       return;
//     }

//     if (!amount || isNaN(amount) || amount <= 0) {
//       toast.error("Please enter a valid amount");
//       return;
//     }

//     if (!date) {
//       toast.error("Please select a date");
//       return;
//     }

//     try {
//       await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
//         source,
//         amount: parseFloat(amount),
//         date,
//         icon,
//       });
//       setOpenAddIncomeModal(false);
//       toast.success("Income added successfully");
//       fetchIncomeDetails();
//     } catch (error) {
//       console.error("Error adding income:", error);
//       toast.error("Failed to add income");
//     }

//   };

//   //delete income
//   const deleteIncome = async (id) => {
//     try {
//       await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
//       setOpenDeleteAlert({ show: false, data: null });
//       toast.success("Income deleted successfully");
//       fetchIncomeDetails();
//     } catch (error) {
//       console.error("Error deleting income:", error);
//       toast.error("Failed to delete income");
//     }
//   };

//   //handle download income details
//   const handleDownloadIncomeDetails = async () => { };

//   useEffect(() => {
//     fetchIncomeDetails();
//     return () => { };
//   }, []);

//   const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

//   return (
//     <DashboardLayout activeMenu={"Income"}>
//       <div className="my-5 mx-auto">
//         <div className='grid grid-cols-1 gap-6'>
//           <div className=''>
//             <IncomeOverview
//               transactions={incomeData}
//               onAddIncome={() => setOpenAddIncomeModal(true)}
//             />
//           </div>
//           <IncomeList
//             transactions={incomeData}
//             onDelete={(id) => {
//               setOpenDeleteAlert({
//                 show: true,
//                 data: id,
//               });
//             }}
//             onDownload={handleDownloadIncomeDetails}
//           />
//         </div>
//         <Modal
//           isOpen={openAddIncomeModal}
//           onClose={() => setOpenAddIncomeModal(false)}
//           title="Add Income"
//         >
//           <AddIncomeForm onAddIncome={handleAddIncome} />
//         </Modal>

//         <Modal
//           isOpen={openDeleteAlert.show}
//           onClose={() => setOpenDeleteAlert({ show: false, data: null })}
//           title="Delete Income"
//         >
//           <DeleteAlert
//             content="Are you sure you want to delete this income?"
//             onDelete={() => { // <-- 
//               deleteIncome(openDeleteAlert.data);
//               setOpenDeleteAlert({ show: false, data: null });
//             }}
//           />

//         </Modal>
//       </div>
//     </DashboardLayout>
//   )
// }

// export default Income

// src/pages/Dashboard/Income.jsx
import React, { useEffect, useState } from 'react'; // Corrected 'use' typo
import DashboardLayout from '../../components/layouts/DashboardLayout';
import IncomeOverview from '../../components/Income/IncomeOverview';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import { toast } from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';

const Income = () => {
  useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false); // Declared here

  // Function to fetch all income details
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Error fetching income details:", error);
      toast.error("Failed to fetch income"); // Added toast message like in Expense.jsx
    } finally {
      setLoading(false);
    }
  };

  // Function to handle adding a new income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    // Validation checks for required fields
    if (!source || !amount || !date) {
      toast.error("Please fill all fields");
      return;
    }

    // Validation for amount (must be a positive number, more robust check)
    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    // Validation for date
    if (!date) {
      toast.error("Please select a date");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount: parseFloat(amount),
        date,
        icon,
      });
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error adding income:", error);
      toast.error("Failed to add income");
    }
  };

  // Function to handle deleting an income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null }); // Close the delete confirmation modal
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error deleting income:", error);
      toast.error("Failed to delete income");
    }
  };

  // Function to handle downloading income details (Full implementation from Expense.jsx style)
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME_EXCEL, {
        responseType: 'blob', // Important for downloading files
      });

      // Create a link element to trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'income_details.csv'); // Set the file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up the link element
      window.URL.revokeObjectURL(url); // Release the object URL

      toast.success("Income details downloaded successfully!"); // User feedback for success
    } catch (error) {
      console.error("Error downloading income details:", error);
      toast.error("Failed to download income details");
    }
  };

  // useEffect hook to fetch income data on component mount
  useEffect(() => {
    fetchIncomeDetails();
    return () => { }; // Cleanup function
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <DashboardLayout activeMenu={"Income"}>
      <div className="my-5 mx-auto">
        <div className='grid grid-cols-1 gap-6'>
          {/* Income Overview Component */}
          <div>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
          {/* Income List Component */}
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({
                show: true,
                data: id,
              });
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>
        {/* Modal for adding new income */}
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        {/* Modal for delete confirmation */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income?"
            onDelete={() => {
              deleteIncome(openDeleteAlert.data);
              // The setOpenDeleteAlert({ show: false, data: null }) is already in deleteIncome,
              // so commenting it out here aligns with the Expense.jsx style.
              // setOpenDeleteAlert({ show: false, data: null });
            }}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;