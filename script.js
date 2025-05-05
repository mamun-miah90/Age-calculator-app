
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
    if(date.getDate() !== day) {
        document.getElementById("error-day").innerHTML = "Please enter a valid day.";
        return false;
    }else if (month - 1 !== date.getMonth()) {
        document.getElementById("error-month").innerHTML = "Please enter a valid month.";
        return false;
    } else if (date.getFullYear() !== year) {
        document.getElementById("error-year").innerHTML = "Please enter a valid year.";
        return false;
    }

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
    const yearsResult = document.getElementById("yearsResult");
    const monthsResult = document.getElementById("monthsResult");
    const daysResult = document.getElementById("daysResult");
    
    yearsResult.innerHTML = `${result.years}`;
    monthsResult.innerHTML = `${result.months} `;
    daysResult.innerHTML = `${result.days}`;

    const yearsLabel = document.getElementById("yearsLabel");
    const monthsLabel = document.getElementById("monthsLabel");
    const daysLabel = document.getElementById("daysLabel");

    yearsLabel.innerHTML = result.years < 2 ? 'year' : 'years';   
    monthsLabel.innerHTML = result.months < 2 ? 'month' : 'months';
    daysLabel.innerHTML = result.days < 2 ? 'day' : 'days';
}


document.getElementById("datePicker").addEventListener("change", function () {
    const selectedDate = new Date(this.value);
    if (!isNaN(selectedDate)) {
        document.getElementById("day").value = selectedDate.getDate();
        document.getElementById("month").value = selectedDate.getMonth() + 1; // Months are 0-indexed
        document.getElementById("year").value = selectedDate.getFullYear();
        
        this.style.color = 'black'; // Change color to black when a date is selected
        // Trigger real-time calculation
        calculateValidAge();
    }
});



document.getElementById("calculateBtn").addEventListener("click", function() {
    calculateValidAge();
});


// Add event listeners to the input fields for real-time calculation
document.getElementById("day").addEventListener("input", calculateValidAge);
document.getElementById("month").addEventListener("input", calculateValidAge);
document.getElementById("year").addEventListener("input", calculateValidAge);


function calculateValidAge() {
    const button = document.getElementById("calculateBtn");
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



