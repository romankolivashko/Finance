import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CountryService from './js/country-service.js';
import displayCountries from './js/country-display.js';
// import Country from './js/country.js';

//Load Countries
$('#load-countries').click(function () {
  CountryService.loadCountries();
});

//READ - equivalent to Index() route in MVC
$('#get-countries').click(function () {
  getCountriesAsync();
});

$('#gdp-countries').click(function () {
  getCountriesAsync("GDP");
});
$('#pop-countries').click(function () {
  getCountriesAsync("population");
});
$('#region-form').submit(function () {
  const region = $('#region-selector').val();
  getCountriesByRegionAsync(region);
});

async function getCountriesAsync(sortParam) {
  const response = await CountryService.getCountries(sortParam);
  //equivalent to calling return View(response);
  displayCountries(response);
}
async function getCountriesByRegionAsync(region) {
  const response = await CountryService.getCountriesByRegion(region);
  //equivalent to calling return View(response);
  displayCountries(response);
}

