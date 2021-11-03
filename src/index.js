import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from 'chart.js/auto';
import './css/styles.css';
import CountryService from './js/country-service.js';
import PitcherService from './js/pitcher-service.js';
import * as d3 from "d3";
// import Country from './js/country.js';

//Load Countries
$('#load-countries').click(function () {
  CountryService.loadCountries();
});

//READ - equivalent to Index() route in MVC
$('#get-countries').click(function () {
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
  displayPitchPrice(response);
  // console.log(response);
}

//Equivalent to a .cshtml view file - cshtml uses cs logic to generate html - this uses js logic to generate html
function displayResult(countries) {
  const countryLabels = countries.map(country => country.name);
  
  const countryRatings = countries.map(country => country.gdp);

  const countryData = {
    labels: countryLabels,
    datasets: [{
      label: 'GDP by Country',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: countryRatings,
    }]
  };

  const countryConfig = {
    type: 'line',
    data: countryData,
    options: {}
  };

  const countryChart = new Chart(
    document.getElementById('countriesChart'),
    countryConfig
  );
  console.log(countryChart);

  const countriesHtml = countries
    .map(country => {
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

function displayPitchers(response)
{
  var width=1000;
  var height=800;

  var spacing = 50;
  
  var data = response;
  // var tooltip = d3.select(".tooltip");
  
  
  var svg = d3.select(".pitchersChart").append("svg")
  .attr("width",width).attr("height",height)
  .attr("transform", "translate(" + spacing/2 + "," + spacing/2 + ")");
  
  var xScale = d3.scaleLinear()
  .domain([d3.min(data,function(d){return d.pitches;})-100, d3.max(data,function(d) { return d.pitches; })+100])
  .range([0, width - spacing]);
  var yScale = d3.scaleLinear()
  .domain([d3.min(data, function(d){return d.salary;})-500000, d3.max(data, function(d){return d.salary;})+1000000])
  .range([height - spacing, 0]);
  
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);
  
  svg.append("g").attr("transform", "translate(100," + (height - spacing) + ")").call(xAxis);
  svg.append("g").attr("transform", "translate(100,0)").call(yAxis);
  
  
  var dots = svg.append("g")
  .selectAll("g")
  .data(data);

  dots.selectAll('g').data(data).join('g');

  dots.enter().append("circle")
  .attr("cx", function(d){return xScale(d.pitches);})
  .attr("cy", function(d){return yScale(d.salary);})
  .attr("r", 5)
  .attr("id", function(d) {return d.Id})
  .attr("transform", "translate(100,0)")
  .style("fill", "green")

  
  }
  function displayPitchPrice(pitchers) {
    const pitcherNames = pitchers.map(pitcher => pitcher.name);
    
    const pitcherPitchPrice = pitchers.map(pitcher => pitcher.salary / pitcher.pitches);

    const pitcherSalary = pitchers.map(pitcher => pitcher.salary);

    const totalPitches = pitchers.map(pitcher => pitcher.pitches);
    
    const ascendingTotalPitches = totalPitches.sort();
  
    const pitcherData = {
      labels: pitcherNames,
      datasets: [{
        label: 'Pitchers Price Per Pitch',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: pitcherPitchPrice,
      }]
    };
    const pitcherSalaryData = {
      labels: pitcherNames,
      datasets: [{
        label: 'Pitcher Salary',
        backgroundColor: 'rgb(0, 0 ,255)',
        borderColor: 'rgb(0, 0 ,255)',
        data: pitcherSalary,
      }]
    };
    const pitcherSalaryPitch = {
      labels: ascendingTotalPitches,
      datasets: [{
        label: 'Pitcher Salary',
        backgroundColor: 'rgb(125, 0 ,130)',
        borderColor: 'rgb(125, 0 ,130)',
        data: pitcherSalary,
      }]
    };
  
    const pitcherConfig2 = {
      type: 'line',
      data: pitcherData,
      options: {}
    };
    const pitcherConfig3 = {
      type: 'polarArea',
      data: pitcherSalaryData,
      options: {}
    };
    const pitcherConfig4 = {
      type: 'bar',
      data: pitcherSalaryPitch,
      options: {}
    };
  
    const pitcherChart = new Chart(
      document.getElementById('pitchersChart2'),
      pitcherConfig2,
      pitcherConfig3
    );

    const pitcherSalaryChart = new Chart(
      document.getElementById('pitchersChart3'),
      pitcherConfig3
    );
    const pitcherSalaryPitchChart = new Chart(
      document.getElementById('pitchersChart4'),
      pitcherConfig4
    );
    console.log(pitcherChart);
    console.log(pitcherSalaryChart);
    console.log(pitcherSalaryPitchChart);
    
  }