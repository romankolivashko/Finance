import Chart from "chart.js/auto";

export default function displayComplaints(complaints) {
  const complaintLabels = complaints.map((complaint) => complaint.consumerComplaint);

  const complaintRatings = complaints.map((complaint) => complaint.company);



  const complaintData = {
    labels: complaintLabels,
    datasets: [
      {
        label: "Complaint by Company",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: complaintRatings,
      },
    ],
  };

  const complaintConfig = {
    type: "line",
    data: complaintData,
    options: {},
  };

  const complaintChart = new Chart(
    document.getElementById("complaintsChart"),
    complaintConfig
  );
  console.log(complaintChart);

  const complaintsHtml = complaints
    .map((complaint) => {
      return `<div class="col my-3">
      <div class="card h-100"">
        <div class="card-body d-flex flex-column">
          <h5 class="card-text">${complaint.consumerComplaint}</h5>
          <p class="card-text">Company: ${complaint.company}</p>
          <p class="card-text">State: ${complaint.state}</p>
        </div>
      </div>
    </div>`;
    })
    .join("");

  $("#complaints-display").append(complaintsHtml);
}
