
import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import EconomyService from "./js/economy-service.js";
import ComplaintService from "./js/complaint-service.js";
import CountryService from "./js/country-service";
import PitcherService from './js/pitcher-service.js';
import PatientService from "./js/patient-service";
import displayCountries from './js/country-display.js';

import displayResultPatients from "./js/patient-display";
import displayComplaints from "./js/complaint-display.js";
import displayResultEconomy from "./js/economy-display.js";
import displayPitchers from"./js/pitcher-display.js";


////////////
//Countries
///////////

//Load Countries
$("#load-countries").click(function () {
  CountryService.loadCountries();
});

$('#region-form').submit(function (e) {
  e.preventDefault();
  const region = $('#region-selector').val();
  const sortParam = $('#sort-selector').val();
  getCountriesAsync(region, sortParam);
});

$("#get-countries").click(function () {
  getCountriesAsync();
  $("#countries-display").show();
  $("#economy-display").hide();
  $(".scroller").hide();
});
async function getCountriesAsync(region, sortParam) {
  const response = await CountryService.getCountries(region, sortParam);
  displayCountries(response);
}

//Load Complaints
$("#load-complaints").click(function () {
  ComplaintService.loadComplaints();
});

$("#get-complaints").click(function () {
  console.log("button clicked");
  getComplaintsAsync();
});

async function getComplaintsAsync() {
  const response = await ComplaintService.getComplaints();
  displayComplaints(response);
  console.log(response);
}

/// pitchers functions
$('#get-pitchers').click(function () {
  getPitchersAsync();
});
$('#load-pitchers').click(function () {
  PitcherService.loadPitchers();
});
async function getPitchersAsync() {
  const response = await PitcherService.getPitchers();
  displayPitchers(response);
}


//Patient Functions
$('#load-patients').click(function () {
  PatientService.loadPatients();
});

$('#get-patients').click(function () {
  getPatientsAsync();
});

async function getPatientsAsync() {
  const response = await PatientService.getPatients();
  displayResultPatients(response);
}

//Load Econoomy
$("#load-economy").click(function () {
  EconomyService.loadEconomy();
});

$("#get-economy").click(function () {
  getEconomyAsync();
  $("#economy-display").show();
  $("#countries-display").hide();
  $(".scroller").hide();
});

async function getEconomyAsync() {
  const response = await EconomyService.getEconomy();
  //equivalent to calling return View(response);
  displayResultEconomy(response);
  console.log(response);
}