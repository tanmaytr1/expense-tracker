import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import { toast } from 'react-hot-toast';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';
import { useUserAuth } from '../../hooks/useUserAuth';

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // Function to fetch expense details
  const fetchExpenseDetails = async () => {
    if (loading) return; // Prevent multiple simultaneous fetches
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Error fetching expense details:", error);
      toast.error("Failed to fetch expenses"); // User feedback for fetch error
    } finally {
      setLoading(false);
    }
  };

  // Function to handle adding a new expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    // Validation checks for required fields
    if (!category || !amount || !date) {
      toast.error("Please fill all fields");
      return;
    }

    // Validation for amount (must be a positive number)
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
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount: parseFloat(amount),
        date,
        icon,
      });
      setOpenAddExpenseModal(false); // Close the modal after successful addition
      toast.success("Expense added successfully"); // User feedback
      fetchExpenseDetails(); // Refresh the expense list
    } catch (error) {
      console.error("Error adding Expense:", error);
      toast.error("Failed to add Expense");
    }
  };

  // Function to handle deleting an expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null }); // Close the delete confirmation modal
      toast.success("Expense deleted successfully"); // User feedback
      fetchExpenseDetails(); // Refresh the expense list
    } catch (error) {
      console.error("Error deleting Expense:", error);
      toast.error("Failed to delete Expense");
    }
  };

  // Function to handle downloading expense details (corrected path)
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE_EXCEL, { // <-- CORRECTED HERE
        responseType: 'blob', // Important for downloading files
      });

      // Create a link element to trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expense_details.csv'); // Set the file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up the link element
      window.URL.revokeObjectURL(url); // Release the object URL

      toast.success("Expense details downloaded successfully!"); // User feedback for success
    } catch (error) {
      console.error("Error downloading expense details:", error);
      toast.error("Failed to download expense details");
    }
  };

  // useEffect hook to fetch expense data on component mount
  useEffect(() => {
    fetchExpenseDetails();
    return () => { }; // Cleanup function (if needed, e.g., for subscriptions)
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <DashboardLayout activeMenu={"Expense"}>
      <div className="my-5 mx-auto">
        <div className='grid grid-cols-1 gap-6'>
          {/* Expense Overview Component */}
          <div className=''>
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>
          {/* Expense List Component */}
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({
                show: true,
                data: id,
              });
            }}
            onDownload={handleDownloadExpenseDetails} // Correctly passes the function
          />
        </div>
        {/* Modal for adding a new expense */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        {/* Modal for delete confirmation */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense?"
            onDelete={() => {
              deleteExpense(openDeleteAlert.data);
            }}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;