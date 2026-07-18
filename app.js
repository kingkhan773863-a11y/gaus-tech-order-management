const employeeName = "Sahil";

const orders = JSON.parse(localStorage.getItem("orders")) || [];
const table = document.getElementById("employeeTable");

table.innerHTML = "";

orders.forEach(order => {
    table.innerHTML += `
    <tr>
        <td>${order.id}</td>
        <td>${order.customer}</td>
        <td>${order.product}</td>
        <td>${order.qty}</td>
        <td>${order.status}</td>
        <td>${order.assignTo || "-"}</td>
        <td>${
            order.assignTo === employeeName
            ? '<span style="color:green;font-weight:bold;">🟢 MY ORDER</span>'
            : ""
        }</td>
    </tr>
    `;
});