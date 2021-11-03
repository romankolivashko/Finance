
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from 'chart.js/auto';
import './css/styles.css';
import CountryService from './js/country-service.js';
import PitcherService from './js/pitcher-service.js';

import displayPitchers from"./js/pitcher-display.js"

import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Chart from "chart.js/auto";
import "./css/styles.css";
import CountryService from "./js/country-service.js";
import EconomyService from "./js/economy-service.js";
import displayResultEconomy from "./js/economy-display.js";

////////////
//Countries
///////////


// import Country from './js/country.js';

//Load Countries
$("#load-countries").click(function () {
  CountryService.loadCountries();
});

//READ - equivalent to Index() route in MVC
$("#get-countries").click(function () {
  getCountriesAsync();
});

$('#get-pitchers').click(function () {
  getPitchersAsync();
});

async function getCountriesAsync() {
  const response = await CountryService.getCountries();
  //equivalent to calling return View(response);
  displayResult(response);
  console.log(response);
}
async function getPitchersAsync() {
  const response = await PitcherService.getPitchers();
  //equivalent to calling return View(response);
  displayPitchers(response);
  // console.log(response);
}

//Equivalent to a .cshtml view file - cshtml uses cs logic to generate html - this uses js logic to generate html
function displayResult(countries) {
  const countryLabels = countries.map((country) => country.name);

  const countryRatings = countries.map((country) => country.gdp);

  const countryData = {
    labels: countryLabels,
    datasets: [
      {
        label: "GDP by Country",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: countryRatings,
      },
    ],
  };

  const countryConfig = {
    type: "line",
    data: countryData,
    options: {},
  };

  const countryChart = new Chart(
    document.getElementById("countriesChart"),
    countryConfig
  );
  console.log(countryChart);

  const countriesHtml = countries
    .map((country) => {
      return `<div class="col my-3">
        <div class="card mx-auto h-100" style="width: 18rem;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${country.name}</h5>
            <p class="card-text">Region: ${country.region}</p>
            <p class="card-text">Population: ${country.population}</p>
            <p class="card-text">GDP: ${country.gdp}</p>
          </div>
        </div>
      </div>`;
    })
    .join("");

  $("#countries-display").append(countriesHtml);
}

=======
////////////////
//Economy Chart
///////////////

//Load Econoomy
$("#load-economy").click(function () {
  EconomyService.loadEconomy();
});

//READ - equivalent to Index() route in MVC
$("#get-economy").click(function () {
  getEconomyAsync();
});

async function getEconomyAsync() {
  const response = await EconomyService.getEconomy();
  //equivalent to calling return View(response);
  displayResultEconomy(response);
  console.log(response);
}

