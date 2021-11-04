import Chart from "chart.js/auto";
import $ from "jquery";
import * as ChartGeo from 'chartjs-chart-geo'
// import * as d3 from "d3";

//Equivalent to a .cshtml view file - cshtml uses cs logic to generate html - this uses js logic to generate html
export default function displayCountries(countries) {

  $("#countries-chart").remove();
  $("#countries-chart-container").append(
    '<canvas id="countries-chart"><canvas>'
  );

  const countryLabels = countries.map((country) => country.name.trim());

  const countryGDPs = countries.map((country) => country.gdp);
  
  const countryNameGdpLookup = {};
  countryLabels.forEach((name, i) => countryNameGdpLookup[name] = countryGDPs[i]);
  console.table(countryNameGdpLookup);

  const countryColors = countries.map((country) => {
    return getCountryColor(country.region);
  });

  const min = Math.min( ...countryGDPs ),
    max = Math.max( ...countryGDPs );
  const gdpColors = countryColors.map((color, i) => color.toString().slice(0, color.length - 4)+(countryGDPs[i]*66/(max - min) + 33)+"%)");
  const countryData = {
    labels: countryLabels,
    datasets: [
      {
        label: "GDP Per Capita (USD)",
        backgroundColor: gdpColors,
        borderColor: gdpColors,
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


  fetch("https://unpkg.com/world-atlas/countries-50m.json")
    .then((r) => r.json())
    .then((data) => {
      const countriesTopo = ChartGeo.topojson.feature(
        data,
        data.objects.countries
      ).features;
      console.log(countries);
      console.log(countriesTopo);
      /*
        iterate through countriesTopo, check if country name matches, if so 
        assign a properties.gdp property
        have name, need
        
        , else set to 0

     */
      for(let i = 0; i < countriesTopo.length; i++) {
        if (countryLabels.includes(countriesTopo[i].properties.name)) {
          countriesTopo[i].properties.gdp = countryNameGdpLookup[countriesTopo[i].properties.name];
        }
        else {
          countriesTopo[i].properties.gdp = 0;
        }
      }
      $("#countries-map").remove();
      $("#countries-map-container").append(
        '<canvas id="countries-map"><canvas>'
      );
      const chart = new Chart(
        document.getElementById("countries-map").getContext("2d"),
        {
          type: "choropleth",
          data: {
            labels: countriesTopo.map((d) => d.properties.name),
            datasets: [
              {
                label: "Countries",
                data: countriesTopo.map((d) => ({
                  feature: d,
                  value: d.properties.gdp,
                })),
              },
            ],
          },
          options: {
            showOutline: true,
            showGraticule: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              xy: {
                projection: "equalEarth",
              },
            },
          },
        }
      );
      console.log(chart);
    });
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
