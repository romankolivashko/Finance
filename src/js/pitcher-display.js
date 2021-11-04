import * as d3 from "d3";
import Chart from "chart.js/auto";


export default function displayPitchers(response)
{
//////////////
/// d3.js
/////////////

if (($(".pitchersChart:not(:empty)").length) === 0 ){

  var width=1000;
  var height=500;
  
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

  /////////////
  ///Chart.js
  ////////////
  
  // Collection
    const pitcherNames = response.map(pitcher => pitcher.name);
    
    const pitcherPitchPrice = response.map(pitcher => pitcher.salary / pitcher.pitches);

    const pitcherSalary = response.map(pitcher => pitcher.salary);

    const totalPitches = response.map(pitcher => pitcher.pitches);
    
  
  // Organizing
    const pitcherData = {
      labels: pitcherNames,
      datasets: [{
        label: 'Pitchers Price Per Pitch',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: pitcherPitchPrice,
      },{
        label: 'TotalPitches',
        backgroundColor: 'rgb(125, 0 ,130)',
        borderColor: 'rgb(125, 0 ,130)',
        data: totalPitches,
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
      labels: pitcherNames,
      datasets: [{
        label: 'TotalPitches',
        backgroundColor: 'rgb(125, 0 ,130)',
        borderColor: 'rgb(125, 0 ,130)',
        data: totalPitches,
      }]
    };
  
    //Animation
    const totalDuration = 4000;
    const delayBetweenPoints = totalDuration / response.length;
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

    //Configuring
    const pitcherConfig2 = {
      type: 'line',
      data: pitcherData,
      options: {
        animation,
      },
    };
    const pitcherConfig3 = {
      type: 'bar',
      data: pitcherSalaryData,
      options: {
        animation,
      },
    };
    const pitcherConfig4 = {
      type: 'line',
      data: pitcherSalaryPitch,
      options: {
        animation,
      },
    };
  
    //Charting
    const pitcherChart = new Chart(
      document.getElementById('pitchersChart2'),
      pitcherConfig2
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