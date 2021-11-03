import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Chart from "chart.js/auto";
import "./css/styles.css";
import CountryService from "./js/country-service.js";
import EconomyService from "./js/economy-service.js";
import ComplaintService from "./js/complaint-service.js";

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
  console.log("button clicked");
});

async function getCountriesAsync() {
  const response = await CountryService.getCountries();
  //equivalent to calling return View(response);
  displayResult(response);
  console.log(response);
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

//Equivalent to a .cshtml view file - cshtml uses cs logic to generate html - this uses js logic to generate html
function displayResultEconomy(economy) {
  const economyLabels = economy.map((economy) => economy.year);
  economyLabels.sort();

  const economyInterest = economy.map((economy) => economy.interestRate);

  const economyGDP = economy.map((economy) => economy.gdp);

  const economyUnemployment = economy.map((economy) => economy.unemplRate);

  const economyInflation = economy.map((economy) => economy.inflationRate);

  //Animation
  const totalDuration = 10000;
  const delayBetweenPoints = totalDuration / economy.length;
  const previousY = (ctx) =>
    ctx.index === 0
      ? ctx.chart.scales.y.getPixelForValue(100)
      : ctx.chart
        .getDatasetMeta(ctx.datasetIndex)
        .data[ctx.index - 1].getProps(["y"], true).y;
  const animation = {
    x: {
      type: "number",
      easing: "linear",
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== "data" || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
    y: {
      type: "number",
      easing: "linear",
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== "data" || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
  };

  //All charts together
  const economoyData = {
    labels: economyLabels,
    datasets: [
      {
        label: "Interest Rate",
        backgroundColor: "blue",
        borderColor: "blue",
        borderWidth: 1,
        radius: 0,
        data: economyInterest,
      },
      {
        label: "GDP",
        backgroundColor: "green",
        borderColor: "green",
        borderWidth: 1,
        radius: 0,
        data: economyGDP,
      },
      {
        label: "Unemployment",
        backgroundColor: "red",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1.5,
        radius: 0.5,
        data: economyUnemployment,
      },
      {
        label: "Inflation",
        backgroundColor: "grey",
        borderColor: "grey",
        borderWidth: 1,
        radius: 0,
        data: economyInflation,
      },
    ],
  };

  const economyConfig = {
    type: "line",
    data: economoyData,
    options: {
      animation,
    },
  };

  //Interest Rate Chart
  const economoyDataInterest = {
    labels: economyLabels,
    datasets: [
      {
        label: "Interest Rate",
        backgroundColor: "blue",
        borderColor: "blue",
        borderWidth: 1,
        radius: 0,
        data: economyInterest,
      },
    ],
  };

  const economyConfigInterest = {
    type: "bar",
    data: economoyDataInterest,
    options: {
      animation,
    },
  };

  //GDP Rate Chart
  const economoyDataGDP = {
    labels: economyLabels,
    datasets: [
      {
        label: "GDP Rate",
        backgroundColor: "green",
        borderColor: "green",
        borderWidth: 1,
        radius: 0,
        data: economyGDP,
      },
    ],
  };

  const economyConfigGDP = {
    type: "bar",
    data: economoyDataGDP,
    options: {
      animation,
    },
  };

  //Unemployment Rate Chart
  const economoyDataUnemploy = {
    labels: economyLabels,
    datasets: [
      {
        label: "Unemployment",
        backgroundColor: "red",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1.5,
        radius: 0.5,
        data: economyUnemployment,
      },
    ],
  };

  const economyConfigUnemploy = {
    type: "bar",
    data: economoyDataUnemploy,
    options: {
      animation,
    },
  };

  //Inflation Rate Chart
  const economoyDataInflation = {
    labels: economyLabels,
    datasets: [
      {
        label: "Inflation",
        backgroundColor: "grey",
        borderColor: "grey",
        borderWidth: 1.5,
        radius: 0.5,
        data: economyInflation,
      },
    ],
  };

  const economyConfigInflation = {
    type: "bar",
    data: economoyDataInflation,
    options: {
      animation,
    },
  };

  const economyAll = new Chart(
    document.getElementById("economyAll"),
    economyConfig
  );
  console.log(economyAll);

  const economyChartInterest = new Chart(
    document.getElementById("economyChartInterest"),
    economyConfigInterest
  );
  console.log(economyChartInterest);

  const economyChartGDP = new Chart(
    document.getElementById("economyChartGDP"),
    economyConfigGDP
  );
  console.log(economyChartGDP);

  const economyChartUnempl = new Chart(
    document.getElementById("economyChartUnempl"),
    economyConfigUnemploy
  );
  console.log(economyChartUnempl);

  const economyChartInflation = new Chart(
    document.getElementById("economyChartInflation"),
    economyConfigInflation
  );
  console.log(economyChartInflation);
}

// const economyHtml = economy
//   .map(economy => {
//     return `<div class="col my-3">
//       <div class="card mx-auto h-100" style="width: 18rem;">
//         <div class="card-body d-flex flex-column">
//           <h5 class="card-title">Year:${economy.year}</h5>
//           <p class="card-text">Interest Rate: ${economy.interestRate}</p>
//           <p class="card-text">GDP: ${economy.gdp}</p>
//           <p class="card-text">Unemployment: ${economy.unemplRate}</p>
//           <p class="card-text">Inflation: ${economy.inflationRate}</p>
//         </div>
//       </div>
//     </div>`;
//   })
//   .join("");

// $("#economy-display").append(economyHtml);
//}
////////////
//Complaints
///////////

// import Complaint from './js/complaint.js';

//Load Complaints
$("#load-complaints").click(function () {
  ComplaintService.loadComplaints();
});

//READ - equivalent to Index() route in MVC
$("#get-complaints").click(function () {
  console.log("button clicked");
  getComplaintsAsync();
});

async function getComplaintsAsync() {
  const response = await ComplaintService.getComplaints();
  //equivalent to calling return View(response);
  displayComplaints(response);
  console.log(response);
}

//Equivalent to a .cshtml view file - cshtml uses cs logic to generate html - this uses js logic to generate html
function displayComplaints(complaints) {
  const complaintLabels = complaints.map((complaint) => complaint.consumerComplaint);

  const complaintRatings = complaints.map((complaint) => complaint.company);



  const complaintData = {
    labels: complaintLabels,
    datasets: [
      {
        label: "Complaint by Company",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: complaintRatings,
      },
    ],
  };

  const complaintConfig = {
    type: "line",
    data: complaintData,
    options: {},
  };

  const complaintChart = new Chart(
    document.getElementById("complaintsChart"),
    complaintConfig
  );
  console.log(complaintChart);

  const complaintsHtml = complaints
    .map((complaint) => {
      return `<div class="col my-3">
      <div class="card mx-auto h-100" style="width: 18rem;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${complaint.consumerComplaint}</h5>
          <p class="card-text">Company: ${complaint.company}</p>
          <p class="card-text">State: ${complaint.state}</p>
        </div>
      </div>
    </div>`;
    })
    .join("");

  $("#complaints-display").append(complaintsHtml);
}
