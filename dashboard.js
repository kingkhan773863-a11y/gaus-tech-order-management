// ===== GAUS TECH DASHBOARD V2 =====
import { db } from "./firebase.js";
// Live Clock
function updateDateTime() {
    const now = new Date();
    document.getElementById("dateTime").innerHTML =
        now.toLocaleDateString() + " | " + now.toLocaleTimeString();
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Local Storage
let orders = JSON.parse(localStorage.getItem("orders")) || [];

let editIndex = -1;

// Elements
const table = document.getElementById("orderTable");
const popup = document.getElementById("orderPopup");

// Load Orders
function loadOrders() {

    table.innerHTML = "";

    let pending = 0;
    let processing = 0;
    let ready = 0;

    const search = document
        .getElementById("searchOrder")
        .value
        .toLowerCase();

    orders.forEach((order, index) => {

        if (
            !order.id.toLowerCase().includes(search) &&
            !order.customer.toLowerCase().includes(search) &&
            !order.product.toLowerCase().includes(search)
        ) return;

        if (order.status === "Pending") pending++;
        if (order.status === "Processing") processing++;
        if (order.status === "Ready") ready++;

        table.innerHTML += `
<tr>
<td>${order.id}</td>
<td>${order.customer}</td>
<td>${order.product}</td>
<td>${order.qty}</td>
<td>${order.status}</td>
<td>${order.assignTo || "-"}</td>
<td>${order.date}</td>
<td>
<button onclick="editOrder(${index})">✏️</button>
<button onclick="deleteOrder(${index})">🗑</button>
</td>
</tr>`;
    });

    document.getElementById("totalOrders").innerText = orders.length;
    document.getElementById("pendingOrders").innerText = pending;
    document.getElementById("processingOrders").innerText = processing;
    document.getElementById("readyOrders").innerText = ready;
}

loadOrders();
// ===== POPUP =====
document.querySelector(".add-btn").onclick = () => {
    editIndex = -1;
    document.getElementById("saveOrder").innerText = "Save";
    popup.style.display = "flex";
};

document.getElementById("closePopup").onclick = () => {
    popup.style.display = "none";
};

// ===== SAVE / UPDATE =====
document.getElementById("saveOrder").onclick = function () {

    const order = {
        id: document.getElementById("orderId").value.trim(),
        customer: document.getElementById("customerName").value.trim(),
        product: document.getElementById("productName").value.trim(),
        qty: document.getElementById("qty").value,
        status: document.getElementById("status").value,
        assignTo: document.getElementById("assignTo").value,
        date: new Date().toLocaleDateString()
    };

    if (
        !order.id ||
        !order.customer ||
        !order.product ||
        !order.qty
    ) {
        alert("Please fill all fields");
        return;
    }

    if (editIndex === -1) {
        orders.push(order);
    } else {
        orders[editIndex] = order;
        editIndex = -1;
    }

    localStorage.setItem("orders", JSON.stringify(orders));

    popup.style.display = "none";

    document.getElementById("orderId").value = "";
    document.getElementById("customerName").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("qty").value = "";
    document.getElementById("status").value = "Pending";
    document.getElementById("assignTo").value = "";

    loadOrders();
};
// ===== DELETE =====
function deleteOrder(index) {
    if (confirm("Delete this order?")) {
        orders.splice(index, 1);
        localStorage.setItem("orders", JSON.stringify(orders));
        loadOrders();
    }
}

// ===== EDIT =====
function editOrder(index) {

    editIndex = index;

    document.getElementById("orderId").value = orders[index].id;
    document.getElementById("customerName").value = orders[index].customer;
    document.getElementById("productName").value = orders[index].product;
    document.getElementById("qty").value = orders[index].qty;
    document.getElementById("status").value = orders[index].status;
    document.getElementById("assignTo").value = orders[index].assignTo || "";

    document.getElementById("saveOrder").innerText = "Update";
    popup.style.display = "flex";
}

// ===== SEARCH =====
document.getElementById("searchOrder").addEventListener("keyup", loadOrders);
