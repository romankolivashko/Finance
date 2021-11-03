import * as d3 from "d3";
import Chart from "chart.js/auto";

export default function displayPitchers(response)
{
//////////////
/// d3.js
/////////////
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

  /////////////
  ///Chart.js
  ////////////
  
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