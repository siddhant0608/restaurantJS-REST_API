async function saveToCrud(event) {
    event.preventDefault();
    const price = event.target.price.value;
    const dish = event.target.dish.value;
    const table = event.target.table.value;

    const obj = {
        price,
        dish,
        table
    };

    try {
        const response = await fetch("https://crudcrud.com/api/46bff9c590d6479eadd3e69d51e75875/customerOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });
        if (response.ok) {
            const data = await response.json();
            displayOrders(data);
            clearFormFields(event.target);
            console.log(data);
        } else {
            document.body.innerHTML = "<h4>Something went wrong</h4>";
            console.error("HTTP error: " + response.status);
        }
    } catch (err) {
        document.body.innerHTML = "<h4>Something went wrong</h4>";
        console.error(err);
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("https://crudcrud.com/api/46bff9c590d6479eadd3e69d51e75875/customerOrder");
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            data.forEach((item) => displayOrders(item));
        } else {
            console.error("HTTP error: " + response.status);
        }
    } catch (error) {
        console.error(error);
    }
});

async function clearFormFields(form) {
    form.price.value = "";
    form.dish.value = "";
    form.table.value = "";
}

function displayOrders(obj) {
    const childEle = document.createElement("li");
    childEle.textContent = obj.price + "-" + obj.dish + "-" + obj.table;
    const parentTable1 = document.getElementById("table1");
    const parentTable2 = document.getElementById("table2");
    const parentTable3 = document.getElementById("table3");
    if (obj.table === "Table1") {
        parentTable1.appendChild(childEle);
    } else if (obj.table === "Table2") {
        parentTable2.appendChild(childEle);
    } else if (obj.table === "Table3") {
        parentTable3.appendChild(childEle);
    }

    const deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.value = "Delete Product";

    deleteButton.onclick = async () => {
        try {
            const response = await fetch(`https://crudcrud.com/api/46bff9c590d6479eadd3e69d51e75875/customerOrder/${obj._id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                console.log(response);
            } else {
                console.error("HTTP error: " + response.status);
            }
        } catch (error) {
            console.error(error);
        }
        if (obj.table === "Table1") {
            parentTable1.removeChild(childEle);
        } else if (obj.table === "Table2") {
            parentTable2.removeChild(childEle);
        } else if (obj.table === "Table3") {
            parentTable3.removeChild(childEle);
        }
    };

    childEle.appendChild(deleteButton);
}