// Sélectionnez l'élément avec la classe '.mode-sombre' pour ajouter l'écouteur d'événement
const modeSombreToggle = document.querySelector('.mode-sombre');

// Vérifiez si le mode sombre est déjà activé dans le localStorage
const isDarkMode = localStorage.getItem('darkMode') === 'true';
// Si le mode sombre est activé, appliquez les classes appropriées
if (isDarkMode) {
    document.body.classList.add("dark");
    document.querySelector('.navbar').classList.add("dark");
    document.querySelector('.navbar-brand').classList.add("dark");
    document.querySelector('.input').classList.add("dark");
    document.querySelector('#select-continent').classList.add("dark");
    // document.querySelector('.box-text').classList.add("dark");
}
// Ajoutez un écouteur d'événement au bouton "mode sombre" pour basculer le mode sombre
modeSombreToggle.addEventListener('click', () => {
    // Basculez le mode sombre en ajoutant ou en supprimant les classes appropriées
    document.body.classList.toggle("dark");
    document.querySelector('.navbar').classList.toggle("dark");
    document.querySelector('.navbar-brand').classList.toggle("dark");
    document.querySelector('.input').classList.toggle("dark");
    document.querySelector('#select-continent').classList.toggle("dark");
    // document.querySelector('.box-text').classList.toggle("dark");
    // Ajoutez ou supprimez la classe .light-text pour les éléments .box-text
    const boxTextElements = document.querySelectorAll('.box-text');
    for (const boxText of boxTextElements) {
        boxText.classList.toggle("dark-text");
        // console.log(boxText);
    }
    // Enregistrez l'état du mode sombre dans le localStorage
    const isDarkModeEnabled = document.body.classList.contains("dark");
    localStorage.setItem('darkMode', isDarkModeEnabled.toString());
});
let allCountriesData = []; // Variable globale pour stocker les données de tous les pays
function afficherTousLesPays() {
    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        allCountriesData = data; // Stockez les données de tous les pays dans la variable globale
        afficherPays(data); // Appelez la fonction d'affichage des pays avec les données
    });
}
function afficherPays(data) {
    const paysContainer = document.querySelector('.pays');
    paysContainer.innerHTML = ''; // Effacez le contenu précédent

    data.forEach(pays => {
        const boxCountry = document.createElement('a'); // Créez un lien pour la div entière
        boxCountry.href = `country-details.html?country=${encodeURIComponent(pays.name.common)}`;
        boxCountry.classList.add('box-country');

        const boxImg = document.createElement('div');
        const boxText = document.createElement('div');
        boxText.classList.add('box-text');
        const countryFlag = document.createElement('img');
        const countryName = pays.name.common;

        boxText.innerHTML = `
            <h6 class="fw-bold">${countryName}</h6>
            <span><b>Population</b> : ${pays.population}</span><br/>
            <span><b>Region</b> : ${pays.region}</span><br/>
            <span><b>Capital</b> : ${pays.capital}</span><br/>
        `;
        countryFlag.src = pays.flags.png;
        boxImg.classList.add('box-img');
        boxText.classList.add('box-text');

        boxImg.appendChild(countryFlag);
        boxCountry.appendChild(boxImg);
        boxCountry.appendChild(boxText);
        paysContainer.appendChild(boxCountry);
        // console.log(boxText);
    });
}

function paysParContinent() {
    const selectContinent = document.querySelector('#select-continent');
    const countrySearch = document.querySelector('#country-search');

    selectContinent.addEventListener('change', updateDisplayedCountries);
    countrySearch.addEventListener('input', updateDisplayedCountries);

    function updateDisplayedCountries() {
        const selectedContinent = selectContinent.value.toLowerCase();
        const searchTerm = countrySearch.value.trim().toLowerCase();
        // console.log(allCountriesData);

        const filteredCountries = allCountriesData.filter(pays => {
            return (selectedContinent === 'all' || pays.region.toLowerCase() === selectedContinent) && 
                pays.name.common.toLowerCase().includes(searchTerm);
        });
        console.log(filteredCountries);
        afficherPays(filteredCountries);
    }
}
afficherTousLesPays(); // Appelez la fonction pour afficher tous les pays
paysParContinent();