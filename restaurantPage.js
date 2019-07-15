fetch("all.json")
  .then(response => response.json())
  .then(jso => {
    restaurantList = jso;
    if (restaurantList.includes(window.location.hash.slice(1))) {
      let restaurantName = window.location.hash.slice(1);
      fetch(`${restaurantName}.json`)
        .then(response => response.json())
        .then(jso => {
          createRestaurantPage(jso);
        });
    } else {
      console.log("404");
    }
  });


function createRestaurantPage(restaurantInfo) {
  let element = document.getElementById("allInfo");
  let name = document.createElement("h1");
  let address = document.createElement("p");
  let phoneLabel = document.createElement("h4");
  let phone = document.createElement("a");
  let hoursLabel = document.createElement("h4");
  let hours = document.createElement("a");
  let websiteLabel = document.createElement("h4");
  let website = document.createElement("a");
  let noteLabel = document.createElement("h3");
  let notes = document.createElement("ul");
  
  document.querySelector('title').textContent = restaurantInfo.name;
  name.textContent = restaurantInfo.name;
  address.textContent = restaurantInfo.address;
  phoneLabel.textContent = "Phone number : ";
  phone.textContent = restaurantInfo.phone;
  phone.href = `tel:${restaurantInfo.phone}`;
  hoursLabel.textContent = "Hours : ";
  if (restaurantInfo.hours !== undefined) {
    hours.textContent = restaurantInfo.hours;
  } else {
    hours.textContent = "We show up whenever we feel like it!";
  }
  websiteLabel.textContent = "Website : ";
  if (restaurantInfo.website !== undefined) {
    website.textContent = restaurantInfo.website;
    website.href = restaurantInfo.website;
  } else {
    website.textContent = "Website coming soon!";
  }
  noteLabel.textContent = "Notes : ";

  restaurantInfo.notes.forEach(note => {
    let listItem = document.createElement("li");
    notes.appendChild(listItem);
    note = marked(note);
    listItem.innerHTML = note;
    console.log(element);
  });

  element.appendChild(name);
  element.appendChild(address);
  element.appendChild(phoneLabel);
  element.appendChild(phone);
  element.appendChild(document.createElement("br"));
  element.appendChild(hoursLabel);
  element.appendChild(hours);
  element.appendChild(document.createElement("br"));
  element.appendChild(websiteLabel);
  element.appendChild(website);
  element.appendChild(noteLabel);
  element.appendChild(notes);

  fetch(
    `https://nominatim.openstreetmap.org/search/?q=${
      restaurantInfo.address
    }&format=json`
  )
    .then(response => response.json())
    .then(jso => {
      makeMap(jso[0]["lat"], jso[0]["lon"]);
    });

  function makeMap(lat, long) {
    var mymap = L.map("mapid").setView([lat, long], 17);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    var marker = L.marker([lat, long]).addTo(mymap);

    marker.bindPopup("Surprise!");
  }
}
