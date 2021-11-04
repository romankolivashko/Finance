import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import EconomyService from "./js/economy-service.js";
import ComplaintService from "./js/complaint-service.js";
import CountryService from "./js/country-service";
import PitcherService from "./js/pitcher-service.js";
import PatientService from "./js/patient-service";
import NumberOfComplaintService from "./js/numberofcomplaint-service.js";
import displayCountries from "./js/country-display.js";
import displayResultPatients from "./js/patient-display";
import displayResultEconomy from "./js/economy-display.js";
import displayPitchers from "./js/pitcher-display.js";
import displayNumberOfComplaints from "./js/numberofcomplaint-display.js";

////////////
//Countries
///////////

$("#load-countries").click(function () {
  CountryService.loadCountries();
});

$("#region-form").submit(function (e) {
  e.preventDefault();
  const region = $("#region-selector").val();
  const sortParam = $("#sort-selector").val();
  const minGdp = Number.parseInt($("#min-gdp").val());
  const maxGdp = Number.parseInt($("#max-gdp").val());
  getCountriesAsync(region, sortParam, minGdp, maxGdp);
});

$("#get-countries").click(function () {
  getCountriesAsync();
  $("#countries-display").show();
  $("#economy-display").hide();
  $("#complaints-display").hide();
  $("#pitcher-display").hide();
  $("#patients-display").hide();
  $(".scroller").hide();
});

async function getCountriesAsync(region, sortParam, minGdp, maxGdp) {
  const response = await CountryService.getCountries(region, sortParam, minGdp, maxGdp);
  displayCountries(response);
}

////////////
//Complaints
///////////

$("#load-complaints").click(function () {
  ComplaintService.loadComplaints();
});

$("#get-complaints").click(function () {
  //console.log("button clicked");
  getComplaintsAsync();
  $("#complaints-display").show();
  $("#economy-display").hide();
  $("#patients-display").hide();
  $("#countries-display").hide();
  $("#pitcher-display").hide();
  $(".scroller").hide();

});

////////////
//NumberOfComplaints
///////////

$("#load-numberofcomplaints").click(function () {
  NumberOfComplaintService.loadComplaints();
});

$("#get-numberofcomplaints").click(function () {
  //console.log("button clicked");
  getComplaintsAsync();
  $("#numberOfComplaints-display").show();
  $("#economy-display").hide();
  $("#patients-display").hide();
  $("#countries-display").hide();
  $("#pitcher-display").hide();
  $(".scroller").hide();

});

async function getComplaintsAsync() {
  const response = await NumberOfComplaintService.getComplaints();
  displayNumberOfComplaints(response);
  console.log(response);
}

////////////
//Pitchers
///////////
$("#load-pitchers").click(function () {
  PitcherService.loadPitchers();
});

$("#get-pitchers").click(function () {
  getPitchersAsync();
  $("#pitcher-display").show();
  $("#complaints-display").hide();
  $("#economy-display").hide();
  $("#patients-display").hide();
  $("#countries-display").hide();
  $(".scroller").hide();
});

async function getPitchersAsync() {
  const response = await PitcherService.getPitchers();
  displayPitchers(response);
}

////////////
//Patients
///////////

$("#load-patients").click(function () {
  PatientService.loadPatients();
});

$("#get-patients").click(function () {
  getPatientsAsync();
  $("#patients-display").show();
  $("#pitcher-display").hide();
  $("#complaints-display").hide();
  $("#economy-display").hide();
  $("#countries-display").hide();
  $(".scroller").hide();
});

async function getPatientsAsync() {
  const response = await PatientService.getPatients();
  displayResultPatients(response);
}

////////////
//Economy
///////////

$("#load-economy").click(function () {
  EconomyService.loadEconomy();
});

$("#get-economy").click(function () {
  getEconomyAsync();
  $(".scroller").hide();
  $("#countries-display").hide();
  $("#economy-display").show();
  $("#patients-display").hide();
  $("#pitcher-display").hide();
  $("#complaints-display").hide();
});

async function getEconomyAsync() {
  const response = await EconomyService.getEconomy();
  //equivalent to calling return View(response);
  displayResultEconomy(response);
  console.log(response);
}
