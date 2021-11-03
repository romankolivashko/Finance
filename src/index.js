import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CountryService from './js/country-service.js';
import displayCountries from './js/country-display.js';

//Load Countries
$('#load-countries').click(function () {
  CountryService.loadCountries();
});


$('#region-form').submit(function (e) {
  e.preventDefault();
  const region = $('#region-selector').val();
  const sortParam = $('#sort-selector').val();
  getCountriesAsync(region, sortParam);
});

async function getCountriesAsync(region, sortParam) {
  const response = await CountryService.getCountries(region, sortParam);
  //equivalent to calling return View(response);
  displayCountries(response);
}


