// Required: Use async/await OR .then() for API calls
// Required: Use try/catch OR .catch() for error handling
const spinner = document.getElementById('loading-spinner');
const errorMessage = document.getElementById('error-message');
spinner.classList.add('hidden');


async function searchCountry(countryName) {
    try {
        // Show loading spinner
        spinner.classList.remove('hidden');
        // Fetch country data
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        
        if(!response.ok){
            throw new Error('Could not find country');
        }

        const data = await response.json();
        const country = data[0];
        // Update DOM
        // Update bordering countries section
        document.getElementById('country-info').innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital[0]}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
        `;
        // Fetch bordering countries
        if (country.borders){
            const borderContainer = document.getElementById('bordering-countries');
            borderContainer.innerHTML = "";

            borderContainer.innerHTML = "<h2>Bordering Countries</h2>"
            for(const code of country.borders){
                const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
                const borderData = await borderResponse.json();
                const borderCountry = borderData[0];

                borderContainer.innerHTML += `
                <p>${borderCountry.name.common}</p>
                <img src="${borderCountry.flags.svg}" alt="${borderCountry.name.common} flag" width = "100">
                `
            }
        }
        else{
            document.getElementById('bordering-countries').innerHTML = "<p>No neighbouring countries</p>";
        }
        
    } catch (error) {
        // Show error message
        console.error(error);
        errorMessage.textContent = error.message;
    } finally {
        // Hide loading spinner
        spinner.classList.add('hidden');
    }
}spinner.classList.add("hidden");

// Event listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});