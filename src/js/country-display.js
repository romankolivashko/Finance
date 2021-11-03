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
  });
  console.log(countryColors);

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
  let color = "blue";
  switch(region) {
    case "NORTHERN AFRICA":
      color = "blue";
      break;
    case "SUB-SAHARAN AFRICA":
      color = "blue";
      break;
    case "WESTERN EUROPE":
      color = "blue";
      break;
    case "EASTERN EUROPE":
      color = "blue";
      break;
    case "NEAR EAST":
      color = "blue";
      break;
    case "C.W. OF IND. STATES":
      color = "blue";
      break;
    case "ASIA (EX. NEAR EAST)":
      color = "blue";
      break;
    case "LATIN AMERICA AND CARIBBEAN":
      color = "blue";
      break;
    case "NORTHERN AMERICA":
      color = "blue";
      break;
    default:
      color = "blue";
      break;
  }
  return color;
}