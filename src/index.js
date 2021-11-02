import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from 'chart.js/auto';
import './css/styles.css';
// import CountryService from './js/country-service.js';
import PatientService from './js/patient-service.js';
// import Country from './js/country.js';

//Load Countries
// $('#load-countries').click(function () {
//   CountryService.loadCountries();
// });

$('#load-patients').click(function () {
  PatientService.loadPatients();
});

//READ - equivalent to Index() route in MVC
// $('#get-countries').click(function () {
//   getCountriesAsync();
// });

$('#get-Patients').click(function () {
  getPatientsAsync();
});

// async function getCountriesAsync() {
//   const response = await CountryService.getCountries();
//   //equivalent to calling return View(response);
//   displayResult(response);
//   console.log(response);
// }

async function getPatientsAsync() {
  const response = await PatientService.getPatients();
  //equivalent to calling return View(response);
  console.log(response);
  displayResult(response);
}

function displayResult(patients) {
  const patientLabels = patients.map(patient => patient.bmi);
  
  const patientRatings = patients.map(patient => patient.charges);

  const patientData = {
    labels: patientLabels,
    datasets: [{
      label: 'Bmi',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: patientRatings,
    }]
  };

  const patientConfig = {
    type: 'scatter',
    data: patientData,
    options: {
      scales: {
        y: {
          position: "bottom"
        }
      }
    },
  };

  const patientChart = new Chart(
    document.getElementById('patientsChart'),
    patientConfig
  );
  console.log(patientChart);

  // const countriesHtml = countries
  //   .map(country => {
  //     return `<div class="col my-3">
  //       <div class="card mx-auto h-100" style="width: 18rem;">
  //         <div class="card-body d-flex flex-column">
  //           <h5 class="card-title">${country.name}</h5>
  //           <p class="card-text">Region: ${country.region}</p>
  //           <p class="card-text">Population: ${country.population}</p>
  //           <p class="card-text">GDP: ${country.gdp}</p>
  //         </div>
  //       </div>
  //     </div>`;
  //   })
  //   .join("");

  $("#patients-display");
}
//Equivalent to a .cshtml view file - cshtml uses cs logic to generate html - this uses js logic to generate html
// function displayResult(countries) {
//   const countryLabels = countries.map(country => country.name);
  
//   const countryRatings = countries.map(country => country.gdp);

//   const countryData = {
//     labels: countryLabels,
//     datasets: [{
//       label: 'GDP by Country',
//       backgroundColor: 'rgb(255, 99, 132)',
//       borderColor: 'rgb(255, 99, 132)',
//       data: countryRatings,
//     }]
//   };

//   const countryConfig = {
//     type: 'line',
//     data: countryData,
//     options: {}
//   };

//   const countryChart = new Chart(
//     document.getElementById('countriesChart'),
//     countryConfig
//   );
//   console.log(countryChart);

//   const countriesHtml = countries
//     .map(country => {
//       return `<div class="col my-3">
//         <div class="card mx-auto h-100" style="width: 18rem;">
//           <div class="card-body d-flex flex-column">
//             <h5 class="card-title">${country.name}</h5>
//             <p class="card-text">Region: ${country.region}</p>
//             <p class="card-text">Population: ${country.population}</p>
//             <p class="card-text">GDP: ${country.gdp}</p>
//           </div>
//         </div>
//       </div>`;
//     })
//     .join("");

//   $("#countries-display").append(countriesHtml);
// }