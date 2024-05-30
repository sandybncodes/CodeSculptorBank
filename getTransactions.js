// Fetch the JSON data and populate the table
fetch('transactions.json')
.then(response => response.json())
.then(data => populateTable(data))
.catch(error => console.error('Error fetching JSON data:', error));

function populateTable(transactions) {
const tableBody = document.getElementById('transactions-table').getElementsByTagName('tbody')[0];

transactions.forEach(transaction => {
    const row = tableBody.insertRow();
    const transactionNumber = row.insertCell(0);
    const dateCell = row.insertCell(1);
    const descriptionCell = row.insertCell(2);
    const amountCell = row.insertCell(3);
    const cardNumber = row.insertCell(4);

    transactionNumber.textContent = transaction.id;
    dateCell.textContent = transaction.date;
    amountCell.textContent = transaction.amount;
    descriptionCell.textContent = transaction.description;
    cardNumber.textContent = transaction.card_number;

    // Add event listener to the row
    row.addEventListener('click', function() {
        const transactionDetails = JSON.stringify(transaction);
        const newWindow = window.open('transaction-details.html');
        newWindow.onload = function() {
            newWindow.document.body.innerHTML = `
                <h1>Transaction Details</h1>
                <p><strong>ID:</strong> ${transaction.id}</p>
                <p><strong>Date:</strong> ${transaction.date}</p>
                <p><strong>Amount:</strong> ${transaction.amount}</p>
                <p><strong>Description:</strong> ${transaction.description}</p>
                <p><strong>Card number:</strong> ${transaction.card_number}</p>
            `;
        };
    });
});
}