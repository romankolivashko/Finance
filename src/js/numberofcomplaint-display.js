import Chart from "chart.js/auto";

export default function displayNumberOfComplaints(numberofcomplaints) {
  const numberofcomplaintLabels = numberofcomplaints.map(data => data.numberOfComplaints);

  const numberofcomplaintRatings = numberofcomplaints.map((data) => data.company);



  const numberofcomplaintData = {
    labels: numberofcomplaintRatings,
    datasets: [
      {
        label: "numberofcomplaint by Company",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: numberofcomplaintLabels,
      },
    ],
  };

  const numberofcomplaintConfig = {
    type: "line",
    data: numberofcomplaintData,
    options: {}
};


  const numberofcomplaintChart = new Chart(
    document.getElementById("numberofcomplaintsChart"),
    numberofcomplaintConfig
  );
  console.log(numberofcomplaintChart);
}
