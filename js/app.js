//Classes

class Budget {
    constructor(budget) {
        this.budget = Number(budget);
        this.budgetLeft = this.budget;
    }

    // Subtract expense amount from Budget
    subractFromBudget(amount) {
        return this.budgetLeft -= amount;
    }
}

class HTML {

    //method to add user budget to page when user submits it on prompt.
    insertBudget(amount) {
        //console.log(amount);
        //Insert into HTML
        budgetTotal.innerHTML = `${amount}`;
        budgetLeft.innerHTML = `${amount}`;
    }

    //Print message on if user submits form without either value
    printMessage(message, className) {
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('text-center', 'alert', className);
        //messageWrapper.textContent = `${message}`; OR
        messageWrapper.appendChild(document.createTextNode(message));

        //Insert message into HTML
        document.querySelector('.primary').insertBefore(messageWrapper, addExpenseForm);

        //Remove message after 3 seconds
        setTimeout(function() {
            document.querySelector('.primary .alert').remove();
            addExpenseForm.reset();
        }, 3000);
    }

    // Display the expenses from the form into the list
    addExpenseToList(name, amount) {
        const expenseList = document.querySelector('#expenses ul');

        //Create li to hold each expense
        const li = document.createElement('li');
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        // create template
        li.innerHTML = `
            ${name}
            <span class="badge badge-primary badge-pill">₦ ${amount}</span>
        `;

        // Insert into HTML
        expenseList.appendChild(li);
        // addExpenseForm.reset();
    }

    // Track what percentage of the budget is used and apply class
    trackBudget(amount) {
        const budgetAfterExpense = budget.subractFromBudget(amount);
        budgetLeft.innerHTML = `${budgetAfterExpense}`;

        // Check when 50% of budget is reached
        if (budgetAfterExpense < (budget.budget / 2)) {
            // Add some classes and remove others
            budgetLeft.parentElement.parentElement.classList.remove('alert-success');
            budgetLeft.parentElement.parentElement.classList.add('alert-warning');
        }
        // Check when 25% of budget is reached
        if (budgetAfterExpense < (budget.budget / 4)) {
            // Add some classes and remove others
            budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
            budgetLeft.parentElement.parentElement.classList.add('alert-danger');
        }
    }
}




//Variables
const addExpenseForm = document.querySelector('#add-expense'),
    budgetTotal = document.querySelector('span#total'),
    budgetLeft = document.querySelector('span#left');

let userBudget, budget;

//Instantiate the HTML class
const html = new HTML();


//Events Listeners

//Initialize form
eventListeners();

function eventListeners() {

    //Initialize page with prompt onload
    document.addEventListener('DOMContentLoaded', function() {

        //As the user for weekly budget
        userBudget = prompt('What\'s your budget for this week?');

        //validate user input
        if (userBudget === null || userBudget === '' || userBudget === 0) {
            window.location.reload();
        } else {
            budget = new Budget(userBudget);

            //Call method to display budget from HTML class
            html.insertBudget(budget.budget);
        }
    })


    addExpenseForm.addEventListener('submit', function(e) {
        //Prevent form from submitting
        e.preventDefault();

        const expenseName = document.querySelector('#expense').value;
        const amount = document.querySelector('#amount').value;

        // If form user omits any value fire the printMessage method else add expense to list
        if (expenseName === '' || amount === '') {
            html.printMessage('There was an error. All fields are mandatory', 'alert-danger');
        } else {
            html.addExpenseToList(expenseName, amount);

            // Track what % of budget is left
            html.trackBudget(amount);
            html.printMessage('Added...', 'alert-success');

        }
    })
}