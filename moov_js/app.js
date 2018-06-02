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
    if (e.target.nodeName === 'LI') {
      const previouslySelected = document.querySelector('.selected');
      if (previouslySelected) previouslySelected.classList.remove('selected');

      const zipInput = document.querySelector('input');
      zipInput.value = e.target.dataset.zip;
      e.target.classList.add('selected');
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    const zipInput = document.querySelector('input');
    const zipCode = zipInput.value;
    zipInput.value = '';
    const itemSelected = document.querySelector('.selected');

    if (!zipCodesCache[zipCode] && isValidZip(zipCode)) {
      fetchLocation(zipCode);


    } else {

    }

  });



  function isValidZip(zip) {
    return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
  }

  function createPlace(place, zipCode) {
    //place still contains zip code at this point, so split on number
    //and remove trailing white space

    const cityAndState = place.split(/[0-9]/)[0].trim();
    const li = document.createElement('li');
    li.dataset.zip = zipCode;
    const location = document.createTextNode(cityAndState);
    li.appendChild(location);
    placesList.appendChild(li);
  }

  async function fetchLocation(zip) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${API_KEY}`;

    await fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'OK') {
          createPlace(data.results[0].formatted_address, zip);
        }
      });
  }
})();
