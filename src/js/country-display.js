import Chart from 'chart.js/auto';
import $ from 'jquery';
// import * as d3 from "d3";

//Equivalent to a .cshtml view file - cshtml uses cs logic to generate html - this uses js logic to generate html
export default function displayCountries(countries) {
  console.log("hi");
  /*
    trim, 
    graph for each region
    sort each - call in api
    small to large, large to small, 
    pop, gdp, alpha
    color
    color by region
  */

  //chart.js stuff
  $('#countries-chart').remove();
  $('#countries-chart-container').append('<canvas id="countries-chart"><canvas>');

  const countryLabels = countries.map(country => country.name);
  
  const countryGDPs = countries.map(country => country.gdp);

  const countryColors = countries.map(country => {
    return getCountryColor(country.Region);
  })






  const min = Math.min( ...countryGDPs ),
    max = Math.max( ...countryGDPs );
  const gdpColors = countryGDPs.map(cg => `rgba(255, 0, 0, ${(cg)/(max - min)})`);
  const countryData = {
    labels: countryLabels,
    datasets: [{
      label: 'GDP Per Capita (USD)',
      backgroundColor: gdpColors, //'rgb(255, 99, 132)',
      borderColor:  'rgb(255, 99, 132)',
      data: countryGDPs,
    }]
  };

  const countryConfig = {
    type: 'bar',
    data: countryData,
    options: {}
  };

  const countryChart = new Chart(
    document.getElementById('countries-chart'),
    countryConfig
  );
  console.log(countryChart);

}

function getCountryColor(region) {

  switch(region) {
    case "NORTHERN AFRICA":
    break;
    case "SUB-SAHARAN AFRICA":
    break;
    case "WESTERN EUROPE":
    break;
    case "EASTERN EUROPE":
    break;
    case "NEAR EAST":
    break;
    case "C.W. OF IND. STATES":
    break;
    case "ASIA (EX. NEAR EAST)":
    break;
    case "LATIN AMERICA AND CARIBBEAN":
    break;
    case "NORTHERN AMERICA":
    break;
    default:
    break;
  }
}