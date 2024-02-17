function goToBody() {
    var selectedOption = document.getElementById("category").value;
    localStorage.setItem("selectedOption", selectedOption); // Store selected option in local storage
    window.location.href = "body.html"; // Redirect to body.html
  }
  var selectedOption = localStorage.getItem("selectedOption");
    document.getElementById("selectedExpense").innerText = selectedOption;

    let expenses = [];
    let totalAmount = 0;
    
    const incomeInput = document.getElementById('income-input');
    const categoryInput = document.getElementById('category-input');
    const amountInput = document.getElementById('amount-input');
    const dateInput = document.getElementById('date-input');
    const addBtn = document.getElementById('add-btn');
    const expenseTable = document.getElementById('expense-table-body');
    const totalAmountCell = document.getElementById('total-amount'); 
    
    addBtn.addEventListener('click', function(){
        const category = categoryInput.value;
        const amount = parseFloat(amountInput.value);
        const date = dateInput.value;
    
        if(category === ''){
            alert("Please provide expense");
            return;
        }
        if(isNaN(amount) || amount <= 0){
            alert('Please enter a valid amount');
            return;
        }
        if(date === ''){
            alert('Please select a date');
            return;
        }
    
        expenses.push({category, amount, date});
        totalAmount += amount;
        totalAmountCell.textContent = totalAmount.toFixed(2);
    
        const newRow = expenseTable.insertRow();
        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const actionCell = newRow.insertCell();
    
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', function(){
            const index = Array.from(newRow.parentNode.children).indexOf(newRow);
            if(index !== -1){
                const { category, amount, date } = expenses[index];
                categoryInput.value = category;
                amountInput.value = amount;
                dateInput.value = date;
                deleteExpense(newRow);
            }
        });
    
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function(){
            deleteExpense(newRow);
        });
    
        categoryCell.textContent = category;
        amountCell.textContent = amount.toFixed(2);
        dateCell.textContent = date;
        actionCell.appendChild(editBtn);
        actionCell.appendChild(deleteBtn);
        
        categoryInput.value = '';
        amountInput.value = '';
        dateInput.value = '';
    });
    
    function deleteExpense(row){
        const index = Array.from(row.parentNode.children).indexOf(row);
        if(index !== -1){
            totalAmount -= expenses[index].amount;
            totalAmountCell.textContent = totalAmount.toFixed(2);
            expenses.splice(index, 1);
            row.parentNode.removeChild(row);
        }
    }
    const submitBtn = document.getElementById('submit');

    submitBtn.addEventListener('click', function() {
        const income = parseFloat(incomeInput.value);
    
        if(isNaN(income) || income <= 0){
            alert('Please enter a valid income');
            return;
        }
    
        const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        const remainingAmount = income - totalExpenses;
    
        alert(`Total Income: ₹${income.toFixed(2)}\nTotal Expenses: ₹${totalExpenses.toFixed(2)}\nRemaining Amount: ₹${remainingAmount.toFixed(2)}`);
    });
    