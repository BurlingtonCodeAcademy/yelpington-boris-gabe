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


  function makeMap(lat, long) {
    var mymap = L.map("mapid").setView([lat, long], 14.5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);
    return mymap;
  }
 
 let theMap = makeMap(44.476785, -73.210738)

  function createMarker(restaurantInfo) {
    fetch(`https://nominatim.openstreetmap.org/search/?q=${restaurantInfo.address}&format=json`)
    .then(response => response.json())
    .then(jso => {
      let lat = jso[0]["lat"];
      let long = jso[0]["lon"];
      console.log(lat)
      console.log(long)
      var marker = L.marker([lat, long]).addTo(theMap);
      //marker.bindPopup();
      marker.addEventListener("click", () => {
        window.location.replace(`/restaurant.html#${restaurantInfo.id}`) //cannot go back
      }) 
    });
}