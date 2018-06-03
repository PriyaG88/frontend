(() => {
  const form = document.querySelector('#zip');
  const zipInput = document.querySelector('input');
  const placesList = document.querySelector('#places');
  const zipCodesCache = {};


  // ignore - this is just to hide the API key
  let API_KEY = localStorage.getItem("apiKey");

  if (!API_KEY) {
    API_KEY = prompt("Enter API Key:");
    localStorage.setItem("apiKey", API_KEY);
  }

  placesList.addEventListener('click', e => {
    const prevSelected = document.querySelector('.selected');

    if (e.target.nodeName === 'LI') {

      if (prevSelected && prevSelected !== e.target) {
        prevSelected.classList.remove('selected');
        e.target.classList.add('selected');
        zipInput.value = e.target.dataset.zip;

      } else if (e.target.classList.contains('selected')) {
        e.target.classList.remove('selected');
        zipInput.value = '';
        return;

      } else {
        e.target.classList.add('selected');
        zipInput.value = e.target.dataset.zip;
      }
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    
    const zipCode = zipInput.value;
    zipInput.value = '';
    const itemSelected = document.querySelector('.selected');


    if (!zipCodesCache[zipCode] && isValidZip(zipCode)) {
      fetchLocation(zipCode, itemSelected);
    }
  });

  function isValidZip(zip) {
    return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
  }

  function createPlace(place, zipCode) {
    const li = document.createElement('li');
    li.dataset.zip = zipCode;
    const text = document.createTextNode(place);
    li.appendChild(text);
    placesList.appendChild(li);
    zipCodesCache[zipCode] = place;
  }

  function updatePlace(selected, newPlace, newZip) {
    delete zipCodesCache[selected.dataset.zip];
    zipCodesCache[newZip] = newPlace;
    selected.dataset.zip = newZip;
    selected.innerHTML = newPlace;
  }

  function parseLocation(locationData) {
    const longAddress = locationData.results[0].formatted_address; //still has zipcode and country, split on first number to separate out zip
    const cityAndState = longAddress.split(/[0-9]/)[0].trim(); // and remove trailing whitespace
    return cityAndState;
  }

  async function fetchLocation(zip, selected) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${API_KEY}`;

    await fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'OK') {
          const location = parseLocation(data);
          selected ? updatePlace(selected, location, zip) : createPlace(location, zip);
        }
      });
  }
})();
