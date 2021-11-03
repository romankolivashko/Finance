import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from 'chart.js/auto';
import './css/styles.css';
// import CountryService from './js/country-service.js';
import PatientService from './js/patient-service.js';

//import displayResultPatients from"./js/patient-display.js"



$('#load-patients').click(function () {
  PatientService.loadPatients();
});

$('#get-Patients').click(function () {
  getPatientsAsync();
});

async function getPatientsAsync() {
  const response = await PatientService.getPatients();
  //equivalent to calling return View(response);
  console.log(response);
  displayResultPatients(response);
  displayResultAge(response);
}

function displayResultPatients(patients) {
  const patientLabels = patients.map(patient => patient.bmi);

  const patientRatings = patients.map(patient => patient.charges);

  const totalDuration = 100000;
  const delayBetweenPoints = totalDuration / patientLabels.length;
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
      animation,
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

  $("#patients-display");
}

function displayResultAge(patients) {

  const ageLabels = patients.map(patient => patient.age);
  const ageRatings = patients.map(patient => patient.charges);
  const totalDuration = 50000;
  const delayBetweenPoints = totalDuration / ageLabels.length;
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
      from: NaN,
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

  const ageData = {
    labels: ageLabels,
    datasets: [{
      label: 'Age',
      backgroundColor: 'rgb(153, 51, 255)',
      borderColor: 'rgbrgb(153, 51, 255)',
      data: ageRatings,
    }]
  };

  const ageConfig = {
    type: 'scatter',
    data: ageData,
    options: {
      animation,
      scales: {
        y: {
          position: "bottom"
        }
      }
    },
  };

  const ageChart = new Chart(
    document.getElementById('ageChart'),
    ageConfig
  );
  console.log(ageChart);

  $("#age-display");
}
