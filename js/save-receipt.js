tripElement.id = "travel-box";
tripElement.dataset.tripId = trip.id; // Add this line
tripElement.addEventListener("click", function () {
  document
    .querySelectorAll("#travel-box")
    .forEach((box) => box.classList.remove("selected"));
  tripElement.classList.add("selected");
  saveReceipt(trip.id);
});
