import React from 'react'
import Input from '../inputs/Input'
import EmojiPickerPopup from '../layouts/EmojiPickerPopup'

const AddExpenseForm = ({ onAddExpense }) => {
    const [expense, setExpense] = React.useState({
        category: '',
        amount: '',
        date: '',
        icon: ''
    })

    const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

    return <div>
        <EmojiPickerPopup
            icon={expense.icon}
            onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />
        <Input
            value={expense.category}
            onChange={(e) => handleChange('category', e.target.value)}
            label="Expense Category"
            placeholder="Enter expense category"
            type="text"
            required
        />
        <Input
            value={expense.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
            label="Expense Amount"
            placeholder="Enter expense amount"
            type="number"
            required
        />
        <Input
            value={expense.date}
            onChange={(e) => handleChange('date', e.target.value)}
            label="Expense Date"
            placeholder=""
            type="date"
            required
        />
        <div className='flex justify-end mt-6'>
            <button
                type='button'
                className='add-btn add-btn-fill'
                onClick={() => onAddExpense(expense)}
            >
                Add Expense
            </button>
        </div>
    </div>
}

export default AddExpenseForm