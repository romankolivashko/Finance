import Chart from "chart.js/auto";

//Equivalent to a .cshtml view file - cshtml uses cs logic to generate html - this uses js logic to generate html
export default function displayResultEconomy(economy) {
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