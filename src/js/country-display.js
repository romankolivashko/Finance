import Chart from 'chart.js/auto';
// import * as d3 from "d3";


//Equivalent to a .cshtml view file - cshtml uses cs logic to generate html - this uses js logic to generate html
export default function displayCountries(countries) {
  console.log("hi");

  /*
  install d3
  import
  simple bar
  */
  // chart = BarChart(alphabet, {
  //   x: d => d.letter,
  //   y: d => d.frequency,
  //   xDomain: d3.groupSort(alphabet, ([d]) => -d.frequency, d => d.letter), // sort by descending frequency
  //   yFormat: "%",
  //   yLabel: "GDP per capita",
  //   width,
  //   height: 500,
  //   color: "steelblue"
  // })

  // function BarChart(data, {
  //   x = (d, i) => i, // given d in data, returns the (ordinal) x-value
  //   y = d => d, // given d in data, returns the (quantitative) y-value
  //   title, // given d in data, returns the title text
  //   marginTop = 20, // the top margin, in pixels
  //   marginRight = 0, // the right margin, in pixels
  //   marginBottom = 30, // the bottom margin, in pixels
  //   marginLeft = 40, // the left margin, in pixels
  //   width = 640, // the outer width of the chart, in pixels
  //   height = 400, // the outer height of the chart, in pixels
  //   xDomain, // an array of (ordinal) x-values
  //   xRange = [marginLeft, width - marginRight], // [left, right]
  //   yType = d3.scaleLinear, // y-scale type
  //   yDomain, // [ymin, ymax]
  //   yRange = [height - marginBottom, marginTop], // [bottom, top]
  //   xPadding = 0.1, // amount of x-range to reserve to separate bars
  //   yFormat, // a format specifier string for the y-axis
  //   yLabel, // a label for the y-axis
  //   color = "currentColor" // bar fill color
  // } = {}) {
  //   // Compute values.
  //   const X = d3.map(data, x);
  //   const Y = d3.map(data, y);
  
  //   // Compute default domains, and unique the x-domain.
  //   if (xDomain === undefined) xDomain = X;
  //   if (yDomain === undefined) yDomain = [0, d3.max(Y)];
  //   xDomain = new d3.InternSet(xDomain);
  
  //   // Omit any data not present in the x-domain.
  //   const I = d3.range(X.length).filter(i => xDomain.has(X[i]));
  
  //   // Construct scales, axes, and formats.
  //   const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
  //   const yScale = yType(yDomain, yRange);
  //   const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
  //   const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);
  
  //   // Compute titles.
  //   if (title === undefined) {
  //     const formatValue = yScale.tickFormat(100, yFormat);
  //     title = i => `${X[i]}\n${formatValue(Y[i])}`;
  //   } else {
  //     const O = d3.map(data, d => d);
  //     const T = title;
  //     title = i => T(O[i], i, data);
  //   }
  
  //   const svg = d3.create("svg")
  //       .attr("width", width)
  //       .attr("height", height)
  //       .attr("viewBox", [0, 0, width, height])
  //       .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  
  //   svg.append("g")
  //       .attr("transform", `translate(${marginLeft},0)`)
  //       .call(yAxis)
  //       .call(g => g.select(".domain").remove())
  //       .call(g => g.selectAll(".tick line").clone()
  //           .attr("x2", width - marginLeft - marginRight)
  //           .attr("stroke-opacity", 0.1))
  //       .call(g => g.append("text")
  //           .attr("x", -marginLeft)
  //           .attr("y", 10)
  //           .attr("fill", "currentColor")
  //           .attr("text-anchor", "start")
  //           .text(yLabel));
  
  //   const bar = svg.append("g")
  //       .attr("fill", color)
  //     .selectAll("rect")
  //     .data(I)
  //     .join("rect")
  //       .attr("x", i => xScale(X[i]))
  //       .attr("y", i => yScale(Y[i]))
  //       .attr("height", i => yScale(0) - yScale(Y[i]))
  //       .attr("width", xScale.bandwidth());
  
  //   if (title) bar.append("title")
  //       .text(title);
  
  //   svg.append("g")
  //       .attr("transform", `translate(0,${height - marginBottom})`)
  //       .call(xAxis);
  
  //   return svg.node();
  // }



  /*
    trim, 
    graph for each region
    sort each - call in api
    small to large, large to small, 
    pop, gdp, alpha
  */

  //chart.js stuff
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

  //"normal" JS way to create an html list
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

  // $("#countries-display").append(countriesHtml);
}