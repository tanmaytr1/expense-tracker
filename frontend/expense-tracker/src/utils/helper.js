import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};


export const getInitials = (name) => {
  if(!name) return "";

  const words = name.split(" ");
  let initials = "";

  for(let i=0; i<Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if (num==null || isNaN(num)) return "";

  const [intergerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = intergerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger; 
}

export const prepareExpenseBarChartData = (data = [])=>{
  const ChartData = data.map((item)=>({
    category: item?.category,
    amount: item?.amount
  }));
  return ChartData;
}

export const prepareIncomeBarChartData = (data = [])=>{
  const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
  const ChartData = sortedData.map((item) => ({
    month : moment(item.date).format("Do MMM"),
    amount: item.amount,
    source: item.source,
  }));
  return ChartData;
}

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  const ChartData = sortedData.map((item)=>({
    month : moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    category: item?.category,
  }));
  return ChartData;
}