// Set current date and time in receipt section
document.getElementById("receiptDate").textContent = curDate();
document.getElementById("receiptTime").textContent = curTime();
let products = [];
let productWithPrice = [];

// [Add Product] 
function addProduct() {
    const productName = document.getElementById("productName");
    const pValue = productName.value;
    products.push({ name: pValue });

    const selectElement = document.getElementById("productList");
    selectElement.innerHTML = "";
    for (var i = 0; i < products.length; i++) {
        const option = document.createElement("option");
        option.textContent = products[i].name;
        selectElement.appendChild(option);
    }
    productName.value = "";
    productName.focus();
}

// 'product name' disappears.
document.getElementById("productName").addEventListener('input', function(e){
    let inputV = document.getElementById("productName").value;
    if(inputV.length > 0) {
        document.getElementById("pnPlaceHolder").style.display = 'none';
    } else {
        document.getElementById("pnPlaceHolder").style.display = 'flex';
    }
})

// [Add Price] ->  adds to the dropdown list(Checkout Section)
function addPrice() {
    const selectedProduct = document.getElementById("productList").value;
    const productPrice = parseFloat(document.getElementById("productPrice").value);
    // If not $0, then execute
    if (parseFloat(productPrice) > 0){
        const selectElement = document.getElementById("selectProduct");

        // If the searched 'product name' matches, add it to the checkout list.
        for (var i = 0; i < products.length; i++) {
            if (products[i].name === selectedProduct){
                products[i].unitPrice = productPrice;

                const option = document.createElement("option");
                option.textContent = products[i].name + ' $' + products[i].unitPrice + '/unit';
                selectElement.appendChild(option);

                break;
            }
        }
        document.getElementById("productPrice").value = "";
    }
}

// 'price' disappears.
document.getElementById("productPrice").addEventListener('input', function(e){
    this.value = this.value.replace(/[^\d.]/g, ''); // number only
    let inputV = document.getElementById("productPrice").value;
    if(inputV.length > 0) {
        document.getElementById("prPlaceHolder").style.display = 'none';
    } else {
        document.getElementById("prPlaceHolder").style.display = 'flex';
    }
})

// [New Transaction] -> Reset the Receipt table
function newTransaction() {
    document.getElementById("tbody").innerHTML = "";
    document.getElementById("totalPrice").textContent = "";
    document.getElementById("taxes").textContent = "";
    document.getElementById("amountDue").textContent = "";
    document.getElementById("receiptDate").textContent = curDate();
    document.getElementById("receiptTime").textContent = curTime();
    document.getElementById("paidBadge").classList.add("hidden");
}

// [Add to Cart] 
function addToCart() {
    const selectedItem = document.getElementById("selectProduct").value;
    const selectedProduct = selectedItem.split(' $');

    const unitAmount = parseInt(document.getElementById("unitAmount").value);
    const product = products.find(product => product.name === selectedProduct[0]);
    if (product) {
        const totalPrice = unitAmount * product.unitPrice;
        const row = `<tr>
                        <td>${product.name}</td>
                        <td>$${product.unitPrice.toFixed(2)}</td>
                        <td>${unitAmount}</td>
                        <td>$${totalPrice.toFixed(2)}</td>
                    </tr>`;
        document.getElementById("tbody").innerHTML += row;
    }
    updateTotal();
}

function addUnit(unit) {
    document.getElementById("unitAmount").value = unit;
}

function updateTotal() {
    let totalPrice = 0;
    document.querySelectorAll("#tbody tr").forEach(row => {
        const price = parseFloat(row.cells[3].textContent.replace("$", ""));
        totalPrice += price;
    });
    const taxes = totalPrice * 0.05;
    const amountDue = totalPrice + taxes;
    document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);
    document.getElementById("taxes").textContent = taxes.toFixed(2);
    document.getElementById("amountDue").textContent = amountDue.toFixed(2);

    // Set current date and time in 'Receipt' section
    document.getElementById("receiptDate").textContent = curDate();
    document.getElementById("receiptTime").textContent = curTime();
}

// [Pay] 
function pay() {
    document.getElementById("payModal").classList.remove("hidden");
    document.getElementById("paidBadge").classList.remove("hidden"); 
}

// [Modal close]
function closePayModal() {
    document.getElementById("payModal").classList.add("hidden");
}

function curTime() {
    var options = { hour12: true, hour: 'numeric', minute: 'numeric' };
    return timeString = new Date().toLocaleTimeString([], options);
}

function curDate() {
    var options = { year: 'numeric', month: 'long', day: '2-digit' };
    return dateString = new Date().toLocaleDateString([], options);
}