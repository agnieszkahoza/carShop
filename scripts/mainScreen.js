import cars from "../data/carsData.js";
import accessories from "../data/accessoriesData.js";

let selectedCar = null;

function renderCarList(searchTerm = "") {
  const carListDiv = document.getElementById("car-list");
  carListDiv.innerHTML = "";

  const filteredCars = cars.filter((car) =>
    car.make.toLowerCase().includes(searchTerm.toLowerCase())
  );

  filteredCars.forEach((car) => {
    const carCard = document.createElement("div");
    carCard.classList.add("car-card");

    carCard.innerHTML = `
      <img src="${car.image}" alt="${car.make} ${car.model}" width="300">
  <h2>${car.make} ${car.model}</h2>
  <p><img src="icons/calendar.svg" alt="year" class="icon" /> ${car.year}</p>
  <p><img src="icons/road.svg" alt="mileage" class="icon" /> ${car.mileage}</p>
  <p><img src="icons/speed.svg" alt="power" class="icon" /> ${car.power}</p>
  <div class="car-card-footer">
      <strong class="price">${car.price} €</strong>
      <button onclick="selectCar(${car.id})">Select</button>
  </div>
    `;

    carListDiv.appendChild(carCard);
  });

  if (filteredCars.length === 0) {
    carListDiv.innerHTML = "<p>No results for the specified make.</p>";
  }
}

function selectCar(carId) {
  selectedCar = cars.find((car) => car.id === carId);

  console.log("Selected car:", selectedCar);
  document.getElementById("car-list").style.display = "none";
  document.getElementById("order-form").style.display = "block";
  document.getElementById("selected-car-info").innerHTML = `
    <img src="${selectedCar.image}" 
    alt="${selectedCar.make} ${selectedCar.model}" width="300">
    <h3>${selectedCar.make} ${selectedCar.model}</h3>
    <p>price: ${selectedCar.price} €</p>
  `;
  renderAccessories();
  addAccessoriesListeners();
  loadFormFromLocalStorage();

  document
    .getElementById("owner-name")
    .addEventListener("input", saveFormToLocalStorage);
  document
    .getElementById("delivery-date")
    .addEventListener("change", saveFormToLocalStorage);

  document
    .querySelectorAll('input[name="payment"]')
    .forEach((radio) =>
      radio.addEventListener("change", saveFormToLocalStorage)
    );

  document
    .querySelectorAll(".accessory-checkbox")
    .forEach((checkbox) =>
      checkbox.addEventListener("change", saveFormToLocalStorage)
    );
}

const deliverySelect = document.getElementById("delivery-date");
deliverySelect.innerHTML = "";

const today = new Date();

for (let i = 0; i <= 14; i++) {
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + i);

  const day = deliveryDate.getDate().toString().padStart(2, "0");
  const month = (deliveryDate.getMonth() + 1).toString().padStart(2, "0");
  const year = deliveryDate.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  const option = document.createElement("option");
  option.value = formattedDate;
  option.textContent = formattedDate;

  deliverySelect.appendChild(option);
}

function renderAccessories() {
  const container = document.getElementById("accessories-list");
  container.innerHTML = "";

  accessories.forEach((acc) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = acc.id;
    checkbox.id = `acc-${acc.id}`;
    checkbox.classList.add("accessory-checkbox");

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.innerText = `${acc.name} (${acc.price} €)`;
    const div = document.createElement("div");
    div.appendChild(checkbox);
    div.appendChild(label);

    container.appendChild(div);
  });
}

function addAccessoriesListeners() {
  const checkboxes = document.querySelectorAll(".accessory-checkbox");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateTotalprice);
  });
}

function updateTotalprice() {
  const baseprice = selectedCar.price;
  let accessoriesprice = 0;

  const checkboxes = document.querySelectorAll(".accessory-checkbox");

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const accId = parseInt(checkbox.value);
      const acc = accessories.find((a) => a.id === accId);
      accessoriesprice += acc.price;
    }
  });

  const total = baseprice + accessoriesprice;

  document.getElementById("total-price").innerText = `Total price: ${total} €`;
}

function handlePurchase(event) {
  event.preventDefault();

  const fullName = document.getElementById("owner-name").value.trim();
  const deliveryDate = document.getElementById("delivery-date").value;
  const paymentMethod = document.querySelector('input[name="payment"]:checked');

  if (!fullName || !deliveryDate || !paymentMethod) {
    showError("Please fill in all fields to proceed.");
    return;
  }

  const nameParts = fullName.split(" ");
  if (nameParts.length !== 2) {
    showError("The name and surname should contain exactly two words.");
    return;
  }

  showError("");

  let accessoriesprice = 0;
  document.querySelectorAll(".accessory-checkbox").forEach((cb) => {
    if (cb.checked) {
      const accId = parseInt(cb.value);
      const acc = accessories.find((a) => a.id === accId);
      accessoriesprice += acc.price;
    }
  });
  const total = selectedCar.price + accessoriesprice;

  const summaryHTML = `
    <img src="${selectedCar.image}" alt="${selectedCar.make} ${selectedCar.model}" width="300">
    <h3>${selectedCar.make} ${selectedCar.model}</h3>
    <p>Payment method: ${paymentMethod.value}</p>
    <p>Total price: ${total}€</p>
  `;

  document.getElementById("order-form").style.display = "none";
  document.getElementById("summary").style.display = "block";
  document.getElementById("summary-content").innerHTML = summaryHTML;

  localStorage.removeItem("orderData");
}

function showError(msg) {
  document.getElementById("form-error").innerText = msg;
}

function backToCarList() {
  document.getElementById("order-form").style.display = "none";
  document.getElementById("summary").style.display = "none";
  const carList = document.getElementById("car-list");
  carList.style.display = "flex";
  renderCarList();
}

function restartApp() {
  document.getElementById("summary").style.display = "none";
  document.getElementById("car-list").style.display = "flex";
  renderCarList();
}

function saveFormToLocalStorage() {
  const fullName = document.getElementById("owner-name").value;
  const deliveryDate = document.getElementById("delivery-date").value;
  const paymentMethod = document.querySelector(
    'input[name="payment"]:checked'
  )?.value;

  const selectedAccessories = [];
  const checkboxes = document.querySelectorAll(".accessory-checkbox");
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) selectedAccessories.push(parseInt(checkbox.value));
  });

  const data = {
    fullName,
    deliveryDate,
    paymentMethod,
    accessories: selectedAccessories,
  };

  localStorage.setItem("orderData", JSON.stringify(data));
}

function loadFormFromLocalStorage() {
  const saved = localStorage.getItem("orderData");
  if (!saved) return;

  const data = JSON.parse(saved);

  document.getElementById("owner-name").value = data.fullName || "";
  document.getElementById("delivery-date").value = data.deliveryDate || "";

  if (data.paymentMethod) {
    const radio = document.querySelector(
      `input[name="payment"][value="${data.paymentMethod}"]`
    );
    if (radio) radio.checked = true;
  }

  if (Array.isArray(data.accessories)) {
    data.accessories.forEach((id) => {
      const checkbox = document.getElementById(`acc-${id}`);
      if (checkbox) checkbox.checked = true;
    });
  }

  updateTotalprice();
}

renderCarList();

document.getElementById("search-input").addEventListener("input", function (e) {
  const value = e.target.value;
  renderCarList(value);
});

window.selectCar = selectCar;
window.handlePurchase = handlePurchase;
window.backToCarList = backToCarList;
window.restartApp = restartApp;
