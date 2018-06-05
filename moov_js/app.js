(() => {
  const form = document.querySelector('#zip');
  const zipInput = document.querySelector('input');
  const placesList = document.querySelector('#places');
  const zipCodesCache = {};
  const errorsDiv = document.querySelector('.errors-container');
  let error = '';


  // ignore - this is just to hide the API key
  let API_KEY = localStorage.getItem("apiKey");

  if (!API_KEY) {
    API_KEY = prompt("Enter API Key:");
    localStorage.setItem("apiKey", API_KEY);
  }

  placesList.addEventListener('click', e => {
    clearErrors();
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

  zipInput.addEventListener('change', () => {
    if (error) {
      clearErrors();
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    const zipCode = zipInput.value;
    zipInput.value = '';
    const itemSelected = document.querySelector('.selected');


    if (!zipCodesCache[zipCode] && isValidZip(zipCode)) {
      fetchLocation(zipCode, itemSelected);
    } else if (zipCodesCache[zipCode]) {
      error += 'zipcode has already been submitted';
      logErrors();
    }
  });

  function isValidZip(zip) {
    if (/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip)) {
      return true;
    }
    error += 'Please enter a valid zip code (ex: 94110)';
    logErrors();
  }

  function isValidCountry(address) {
    if (address.includes('USA')) {
      return true;
    }
    error += 'Please enter a US zipcode';
    logErrors();
  }

  function logErrors() {
    const p = document.createElement('p');
    const errorText = document.createTextNode(error);
    p.appendChild(errorText);
    errorsDiv.appendChild(p);
  }

  function clearErrors() {
    error = '';
    errorsDiv.innerHTML = '';
  }

  function createPlace(place = null, zipCode) {
    if (place) {
      const li = document.createElement('li');
      li.dataset.zip = zipCode;
      const placeText = document.createTextNode(place);
      li.appendChild(placeText);
      placesList.appendChild(li);
      zipCodesCache[zipCode] = place;
    }
  }

  function updatePlace(selected, newPlace = null, newZip) {
    if (newPlace) {
      delete zipCodesCache[selected.dataset.zip];
      zipCodesCache[newZip] = newPlace;
      selected.dataset.zip = newZip;
      selected.innerHTML = newPlace;
    }
  }

  function parseLocation(locationData) {
    const longAddress = locationData.results[0].formatted_address;
    if (isValidCountry(longAddress)) {
      const cityAndState = longAddress.split(/[0-9]/)[0].trim();
      return cityAndState;
    }
  }

  async function fetchLocation(zip, selected) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${API_KEY}`;

    await fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'OK') {
          const location = parseLocation(data);
          selected ? updatePlace(selected, location, zip) : createPlace(location, zip);
        } else if (data.status === 'ZERO_RESULTS') {
          console.log(data);
          error += 'No result found'
          logErrors();
        }
      });
  }
})();
