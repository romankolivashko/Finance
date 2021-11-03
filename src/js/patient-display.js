import Chart from "chart.js/auto";

export default function displayResultPatients(patients) {
  const patientLabels = patients.map(patient => patient.bmi);
  const patientRatings = patients.map(patient => patient.charges);
  const ageLabels = patients.map(patient => patient.age);
  const ageRatings = patients.map(patient => patient.charges);

  const totalDuration = 50000;
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

  const patientData = {
    labels: patientLabels,
    datasets: [{
      label: 'Bmi',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: patientRatings,
    }]
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
  const patientChart = new Chart(
    document.getElementById('patientsChart'),
    patientConfig
  );
  console.log(patientChart);
  const ageChart = new Chart(
    document.getElementById('ageChart'),
    ageConfig
  );
  console.log(ageChart);
}