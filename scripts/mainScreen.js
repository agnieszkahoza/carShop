let selectedCar = null;

const cars = [
    {
        id: 1,
        Make: "Chrysler",
        Model: "PT Cruiser",
        Year: 2000,
        Power: "140 KM",
        Mileage: "189 000 km",
        Price: 5000,
        Image:
            "https://cdn.pixabay.com/photo/2014/04/03/17/54/chrysler-312880_1280.jpg",
    },
    {
        id: 2,
        Make: "Nissan",
        Model: "Juke",
        Year: 2023,
        Power: "209 KM",
        Mileage: "53 000 km",
        Price: 13000,
        Image:
            "https://images.pexels.com/photos/19896348/pexels-photo-19896348/free-photo-of-parked-gray-nissan-juke-with-its-lights-on.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
        id: 3,
        Make: "Audi",
        Model: "TT",
        Year: 2023,
        Power: "190 KM",
        Mileage: "79 000 km",
        Price: 17000,
        Image:
            "https://images.unsplash.com/photo-1600549522690-7f575f21dbd7?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 4,
        Make: "Citroën",
        Model: "Ami",
        Year: 2019,
        Power: "290 KM",
        Mileage: "19 000 km",
        Price: 9000,
        Image:
            "https://images.pexels.com/photos/21694179/pexels-photo-21694179/free-photo-of-citroen-ami-parked-in-city.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
        id: 5,
        Make: "Toyota",
        Model: "Prius",
        Year: 2023,
        Power: "204 KM",
        Mileage: "189 000 km",
        Price: 18000,
        Image:
            "https://images.unsplash.com/photo-1707050050343-352947150d4e?q=80&w=2226&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 6,
        Make: "Fiat",
        Model: "Multipla Sportage",
        Year: 2008,
        Power: "168 KM",
        Mileage: "117 400 km",
        Price: 19000,
        Image:
            "https://images.pexels.com/photos/17121437/pexels-photo-17121437/free-photo-of-racing-fiat-multipla-on-grid.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
];

const accessories = [
    { id: 1, name: "Floor mats ", price: 80 },
    { id: 2, name: "Roof rack", price: 400 },
    { id: 3, name: "Seat covers", price: 300 },
    { id: 4, name: "Tow hitch", price: 100 },
    { id: 5, name: "Sunshades", price: 50 },
    { id: 6, name: "Parking sensors", price: 1200 },
    { id: 7, name: "Seat-back organizer", price: 1200 },
    { id: 8, name: "Rear-view camera", price: 1200 },
];

function renderCarList(searchTerm = "") {
    const carListDiv = document.getElementById("car-list");
    carListDiv.innerHTML = "";

    const filteredCars = cars.filter(car =>
        car.Make.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filteredCars.forEach((car) => {
        const carCard = document.createElement("div");
        carCard.classList.add("car-card");

        carCard.innerHTML = `
      <img src="${car.Image}" alt="${car.Make} ${car.Model}" width="300">
      <h2>${car.Make} ${car.Model}</h2>
      <p>Year: ${car.Year}</p>
      <p>Mileage: ${car.Mileage}</p>
      <p>Power: ${car.Power}</p>
      <p>Price: ${car.Price} €</p>
      <button onclick="selectCar(${car.id})">Select</button>
    `;

        carListDiv.appendChild(carCard);
    });

    if (filteredCars.length === 0) {
        carListDiv.innerHTML = "<p>No results for the specified Make.</p>";
    }
}

function selectCar(carId) {
    selectedCar = cars.find((car) => car.id === carId);

    console.log("Selected car:", selectedCar);
    document.getElementById("car-list").style.display = "none";
    document.getElementById("order-form").style.display = "block";
    document.getElementById("selected-car-info").innerHTML = `
    <img src="${selectedCar.Image}" 
    alt="${selectedCar.Make} ${selectedCar.Model}" width="300">
    <h3>${selectedCar.Make} ${selectedCar.Model}</h3>
    <p>Price: ${selectedCar.Price} €</p>
  `;
    renderAccessories();
    addAccessoriesListeners();
    loadFormFromLocalStorage();

    document.getElementById('owner-name').addEventListener('input', saveFormToLocalStorage);
    document.getElementById('delivery-date').addEventListener('change', saveFormToLocalStorage);

    document.querySelectorAll('input[name="payment"]').forEach(radio =>
        radio.addEventListener('change', saveFormToLocalStorage)
    );

    document.querySelectorAll('.accessory-checkbox').forEach(checkbox =>
        checkbox.addEventListener('change', saveFormToLocalStorage)
    );
}

renderCarList();

const deliverySelect = document.getElementById("delivery-date");
deliverySelect.innerHTML = "";

const today = new Date();

for (let i = 0; i <= 14; i++) {
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + i);

    const day = deliveryDate.getDate().toString().padStart(2, "0");
    const month = (deliveryDate.getMonth() + 1).toString().padStart(2, "0");
    const Year = deliveryDate.getFullYear();
    const formattedDate = `${day}.${month}.${Year}`;

    const option = document.createElement("option");
    option.value = formattedDate;
    option.textContent = formattedDate;

    deliverySelect.appendChild(option);
}

function renderAccessories() {
    const container = document.getElementById('accessories-list');
    container.innerHTML = '';

    accessories.forEach(acc => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = acc.id;
        checkbox.id = `acc-${acc.id}`;
        checkbox.classList.add('accessory-checkbox');

        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.innerText = `${acc.name} (${acc.price} €)`;
        const div = document.createElement('div');
        div.appendChild(checkbox);
        div.appendChild(label);

        container.appendChild(div);
    });
}

function addAccessoriesListeners() {
    const checkboxes = document.querySelectorAll('.accessory-checkbox');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateTotalPrice);
    });
}

function updateTotalPrice() {
    const basePrice = selectedCar.Price;
    let accessoriesPrice = 0;

    const checkboxes = document.querySelectorAll('.accessory-checkbox');

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const accId = parseInt(checkbox.value);
            const acc = accessories.find(a => a.id === accId);
            accessoriesPrice += acc.price;
        }
    });

    const total = basePrice + accessoriesPrice;

    document.getElementById('total-price').innerText = `Total price: ${total} €`;
}

function handlePurchase(event) {
    event.preventDefault();

    const fullName = document.getElementById('owner-name').value.trim();
    const deliveryDate = document.getElementById('delivery-date').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked');

    if (!fullName || !deliveryDate || !paymentMethod) {
        showError("Please fill in all fields to proceed.");
        return;
    }

    const nameParts = fullName.split(' ');
    if (nameParts.length !== 2) {
        showError("The name and surname should contain exactly two words.");
        return;
    }

    showError("");

    let accessoriesPrice = 0;
    document.querySelectorAll('.accessory-checkbox').forEach(cb => {
        if (cb.checked) {
            const accId = parseInt(cb.value);
            const acc = accessories.find(a => a.id === accId);
            accessoriesPrice += acc.price;
        }
    });
    const total = selectedCar.price + accessoriesPrice;

    const summaryHTML = `
    <img src="${selectedCar.image}" alt="${selectedCar.make} ${selectedCar.model}" width="300">
    <h3>${selectedCar.make} ${selectedCar.model}</h3>
    <p>Payment method: ${paymentMethod.value}</p>
    <p>Total price: ${total}€</p>
  `;

    document.getElementById("order-form").style.display = "none";
    document.getElementById("summary").style.display = "block";
    document.getElementById("summary-content").innerHTML = summaryHTML;

    localStorage.removeItem('orderData');

}

function showError(msg) {
    document.getElementById('form-error').innerText = msg;
}

function saveFormToLocalStorage() {
    const fullName = document.getElementById('owner-name').value;
    const deliveryDate = document.getElementById('delivery-date').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;

    const selectedAccessories = [];
    const checkboxes = document.querySelectorAll('.accessory-checkbox');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) selectedAccessories.push(parseInt(checkbox.value));
    });

    const data = {
        fullName,
        deliveryDate,
        paymentMethod,
        accessories: selectedAccessories
    };

    localStorage.setItem('orderData', JSON.stringify(data));
}

function loadFormFromLocalStorage() {
    const saved = localStorage.getItem('orderData');
    if (!saved) return;

    const data = JSON.parse(saved);

    document.getElementById('owner-name').value = data.fullName || "";
    document.getElementById('delivery-date').value = data.deliveryDate || "";

    if (data.paymentMethod) {
        const radio = document.querySelector(`input[name="payment"][value="${data.paymentMethod}"]`);
        if (radio) radio.checked = true;
    }

    if (Array.isArray(data.accessories)) {
        data.accessories.forEach(id => {
            const checkbox = document.getElementById(`acc-${id}`);
            if (checkbox) checkbox.checked = true;
        });
    }

    updateTotalPrice();
}

document.getElementById("search-input").addEventListener("input", function (e) {
    const value = e.target.value;
    renderCarList(value);
});
