import Chart from "chart.js/auto";
import $ from "jquery";
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
  $("#countries-chart").remove();
  $("#countries-chart-container").append(
    '<canvas id="countries-chart"><canvas>'
  );

  const countryLabels = countries.map((country) => country.name);

  const countryGDPs = countries.map((country) => country.gdp);

  const countryColors = countries.map((country) => {
    return getCountryColor(country.region);
  });
  // console.log(countryColors);

  const min = Math.min( ...countryGDPs ),
    max = Math.max( ...countryGDPs );
  const gdpColors = countryColors.map((color, i) => {
    console.log(color);
    console.log(color.toString().slice(0, color.length - 4));
    const newColor = color.toString().slice(0, color.length - 4)+(countryGDPs[i]*66/(max - min) + 33)+"%)";
    // console.log(newColor);
    return newColor;
  });
  const countryData = {
    labels: countryLabels,
    datasets: [
      {
        label: "GDP Per Capita (USD)",
        backgroundColor: gdpColors, //'rgb(255, 99, 132)',
        borderColor: "rgb(255, 99, 132)",
        data: countryGDPs,
      },
    ],
  };

  const countryConfig = {
    type: "bar",
    data: countryData,
    options: {},
  };

  const countryChart = new Chart(
    document.getElementById("countries-chart"),
    countryConfig
  );
  console.log(countryChart);
}

function getCountryColor(region) {
  let color = `hsla(40,50%,50%,99%)`;
  const colorArray = [];
  for (let i = 0; i < 10; i++) {
    colorArray.push(`hsla(${(i * (360 / 10)) % 360},50%,50%,99%)`);
  }
  switch (region) {
    case "NORTHERN AFRICA":
      color = colorArray[1];
      break;
    case "SUB-SAHARAN AFRICA":
      color = colorArray[2];
      break;
    case "WESTERN EUROPE":
      color = colorArray[3];
      break;
    case "EASTERN EUROPE":
      color = colorArray[4];
      break;
    case "NEAR EAST":
      color = colorArray[5];
      break;
    case "C.W. OF IND. STATES":
      color = colorArray[6];
      break;
    case "ASIA (EX. NEAR EAST)":
      color = colorArray[7];
      break;
    case "LATIN AMERICA AND CARIBBEAN":
      color = colorArray[8];
      break;
    case "NORTHERN AMERICA":
      color = colorArray[9];
      break;
    case "OCEANIA":
      color = colorArray[0];
      break;
    default:
      break;
  }
  return color;
}
