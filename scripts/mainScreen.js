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
document.getElementById("search-input").addEventListener("input", function (e) {
  const value = e.target.value;
  renderCarList(value);
});
