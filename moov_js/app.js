(() => {
  const form = document.querySelector('#zip');
  const placesList = document.querySelector('#places');
  const zipCodesCache = {};
  let API_KEY = localStorage.getItem("apiKey");


   if (!API_KEY) {
    API_KEY = prompt("Enter API Key:");
    localStorage.setItem("apiKey", API_KEY);
  }

  placesList.addEventListener('click', e => {
    const zipInput = document.querySelector('input');
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

    const zipInput = document.querySelector('input');
    const zipCode = zipInput.value;
    zipInput.value = '';
    const itemSelected = document.querySelector('.selected');


    if (!zipCodesCache[zipCode] && isValidZip(zipCode) && itemSelected) {
      fetchLocation(zipCode, itemSelected);


    } else if (!zipCodesCache[zipCode] && isValidZip(zipCode)) {
      fetchLocation(zipCode);
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
    // remove old entry from cache
    delete zipCodesCache[selected.dataset.zip];
    zipCodesCache[newZip] = newPlace;
    selected.dataset.zip = newZip;
    selected.innerHTML = newPlace;
  }

  function parseLocation(locationData) {
    const longAddress = locationData.results[0].formatted_address;

    //location still has zipcode and country at this point so split on first number
    // and remove trailing whitespace

    const cityAndState = longAddress.split(/[0-9]/)[0].trim();
    return cityAndState;
  }

  async function fetchLocation(zip, selected = null) {
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
