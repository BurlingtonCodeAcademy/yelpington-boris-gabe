fetch("all.json")
.then(response => response.json())
.then(jso => {
  let restaurantList = jso;
  createList();
  let restaurantNamePromises = restaurantList.map(findRestaurantInfo);
  Promise.all(restaurantNamePromises)
    .then(function (nameProperties) {
      nameProperties.forEach(createElement)
      nameProperties.forEach(createMarker)
  });
});
    

function createList () {
  let element = document.getElementById("all-restaurants");
  let list = document.createElement('ul');
  element.appendChild(list);
}
  
function createElement (restaurantInfo) {
  let list = document.querySelector('ul');
  let listItem = document.createElement('li');
  let website = document.createElement('a');
  
      website.textContent = restaurantInfo.name;
      website.href = `/restaurant.html#${restaurantInfo.id}`;
      
      list.appendChild(listItem);
      listItem.appendChild(website);
    }

function findRestaurantInfo (restaurant) {
  return fetch(`./${restaurant}.json`)
  .then(response => response.json())
}

function createMarker(restaurantInfo) {
  fetch(`https://nominatim.openstreetmap.org/search/?q=${restaurantInfo.address}&format=json`)
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
  }
}