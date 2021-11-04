import Chart from "chart.js/auto";

export default function displayNumberOfComplaints(numberofcomplaints) {
  const numberofcomplaintLabels = numberofcomplaints.map((numberofcomplaint) => numberofcomplaint.numberofcomplaint);

  const numberofcomplaintRatings = numberofcomplaints.map((numberofcomplaint) => numberofcomplaint.company);



  const numberofcomplaintData = {
    labels: numberofcomplaintLabels,
    datasets: [
      {
        label: "numberofcomplaint by Company",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: numberofcomplaintRatings,
      },
    ],
  };

  const numberofcomplaintConfig = {
    type: "line",
    data: numberofcomplaintData,
    options: {},
  };

  const numberofcomplaintChart = new Chart(
    document.getElementById("numberofcomplaintsChart"),
    numberofcomplaintConfig
  );
  console.log(numberofcomplaintChart);

  const numberofcomplaintsHtml = numberofcomplaints
    .map((numberofcomplaint) => {
      return `<div class="col my-3">
      <div class="card h-100"">
        <div class="card-body d-flex flex-column">
          <h5 class="card-text">${numberofcomplaint.consumernumberofcomplaint}</h5>
          <p class="card-text">Company: ${numberofcomplaint.company}</p>
          <p class="card-text">State: ${numberofcomplaint.numberofcomplaint}</p>
        </div>
      </div>
    </div>`;
    })
    .join("");

  $("#numberofcomplaints-display").append(numberofcomplaintsHtml);
}
