
function getDate(){
    const day = parseInt(document.getElementById("day").value, 10);
    const month = parseInt(document.getElementById("month").value, 10);
    const year = parseInt(document.getElementById("year").value, 10);
    return {day, month, year};
}
function clearErrors() {
    document.getElementById("error-day").innerHTML = "";
    document.getElementById("error-month").innerHTML = "";
    document.getElementById("error-year").innerHTML = "";
}

//validate inputs function to check if the inputs are valid
function validateInputs(day, month, year) {
   
    if (isNaN(day) ||  1 > day || 31 < day) {
        document.getElementById("error-day").innerHTML = "Please enter a valid day (1-31).";
        return false;
    }
    if (isNaN(month) || 1 > month|| 12 < month) {
        document.getElementById("error-month").innerHTML = "Please enter a valid month (1-12).";
        return false;
    }
    if (isNaN(year) || 1900 > year || 2100 < year) {
        document.getElementById("error-year").innerHTML = "Please enter a valid year (1900-2100).";
        return false;
    }
    return true;
}

function validateDate(day, month, year) {
    const date = new Date(year, month - 1, day);
    console.log(date);
    // Check if the date is created correctly 
    if (date.getDate() !== day || month - 1 !== date.getMonth() || date.getFullYear() !== year) {
        document.getElementById("error-day").innerHTML = "Please enter a valid date.";
        document.getElementById("error-month").innerHTML = "Please enter a valid date.";
        document.getElementById("error-year").innerHTML = "Please enter a valid date.";
        return false;
    }

    // Check if the date is in the future
    const today = new Date();
     if (date > today) {
         document.getElementById("error-year").innerHTML = "The date cannot be in the future.";
         return false;
     }
    return true;
}

// Function to calculate the age
function calculateAge(day, month, year) {
    const today = new Date();
    let years = today.getFullYear() - year;
    let months = today.getMonth() - (month - 1); 
    let days = today.getDate() - day;

    if (0 > days) {
        months--;
        days += new Date(year, month - 1, 0).getDate(); // Get the last day of the previous month
    }
    if (0 > months) {
        years--;
        months += 12;
    }
    return {
        years: years,
        months: months,
        days: days
    };
}

// Function to set the result in the HTML elements
function setResult(result) {
    document.getElementById("years").innerHTML = result.years;
    document.getElementById("months").innerHTML = result.months; 
    document.getElementById("days").innerHTML = result.days;
}

document.getElementById("calculateBtn").addEventListener("click", function() {
    calulateValidAge(this);
});

function calulateValidAge(button) {
    button.style.backgroundColor = 'black';
    
    const {day, month, year} = getDate();
    //Clear previous errors
    clearErrors();
    //Check if the inputs are valid
    if(!validateInputs(day, month, year)) {
        return;
    } 
    //Check if the date is valid and not in the future
    if(!validateDate(day, month, year)) {
        return;
    }
    //If the inputs are valid, calculate the age
    let result  = calculateAge(day, month, year);

     //Set the result 
    setResult(result);
}

