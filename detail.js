const modeSombreToggle = document.querySelector('.mode-sombre');

const isDarkMode = localStorage.getItem('darkMode') === 'true';

if (isDarkMode) {
    document.body.classList.add("dark");
    document.querySelector('.navbar').classList.add("dark");
    document.querySelector('.navbar-brand').classList.add("dark");
}

modeSombreToggle.addEventListener('click', () => {
    document.body.classList.toggle("dark");
    document.querySelector('.navbar').classList.toggle("dark");
    document.querySelector('.navbar-brand').classList.toggle("dark");
    const boxTextElements = document.querySelectorAll('.box-text');
    for (const boxText of boxTextElements) {
        boxText.classList.toggle("dark-text");
    }

    // Enregistrez l'état du mode sombre dans le localStorage
    const isDarkModeEnabled = document.body.classList.contains("dark");
    localStorage.setItem('darkMode', isDarkModeEnabled.toString());
});


let allCountriesData = []; // Variable globale pour stocker les données de tous les pays

// Fonction pour charger les données des pays
function loadAllCountriesData() {
    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        allCountriesData = data; // Stockez les données de tous les pays dans la variable globale
        loadCountryDetails();
    });
}

// Fonction pour extraire les paramètres de requête de l'URL
function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (pair[0] === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return null;
}

// Fonction pour afficher les détails du pays
function loadCountryDetails() {
    // Récupérez le nom du pays à partir du paramètre de requête
    const countryName = getQueryVariable('country');

    if (countryName) {
        // Recherchez les détails du pays par son nom
        const countryDetails = allCountriesData.find(pays => pays.name.common === countryName);

        if (countryDetails) {
            // Affichez les détails du pays sur la page
            // console.log(countryDetails);
            document.getElementById('country-name').textContent = countryDetails.name.common;
            document.getElementById('country-population').innerHTML = `<b>Population</b> : ${countryDetails.population}`;
            document.getElementById('country-region').innerHTML = `<b>Region</b> : ${countryDetails.region}`;
            document.getElementById('country-capital').innerHTML = `<b>Capital</b> : ${countryDetails.capital}`;
            const currencies = countryDetails.currencies;
            const currencyList = Object.values(currencies).map(currency => currency.name).join(',');
            document.getElementById('country-currencies').innerHTML = `<b>Devise</b> : ${currencyList}`;
            // document.getElementById('country-languages').innerHTML = `<b>languages</b> : ${countryDetails.languages}`;
            const languages = countryDetails.languages;
            const languageList = Object.values(languages).map(language => language).join(', ');
            document.getElementById('country-languages').innerHTML = `<b>Langues</b> : ${languageList}`;
            document.getElementById('country-subregion').innerHTML = `<b>Subregion</b> : ${countryDetails.subregion}`;
            const countryFlag = document.getElementById('country-flag');
            countryFlag.src = countryDetails.flags.png;
        } else {
            // Si le pays n'est pas trouvé, affichez un message d'erreur
            document.getElementById('country-details').textContent = 'Pays non trouvé';
        }
    } else {
        // Si aucun nom de pays n'est spécifié, affichez un message d'erreur
        document.getElementById('country-details').textContent = 'Aucun pays spécifié';
    }
}

// Appelez la fonction pour charger les données des pays
loadAllCountriesData();
