document.addEventListener("DOMContentLoaded", function () {
  const searchBox = document.getElementById("searchBox");
  searchBox.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      search();
    }
  });
});

function loadDatabase() {
  // Replace 'YOUR_WEB_APP_URL_HERE' with the actual URL of your Google Apps Script Web App
  return fetch(
    "https://script.google.com/macros/s/AKfycby8MzdykN1pKBvJMmZPl10OtwlpCTcXoJEWaFNORXMegvzHChGbx1Yt6L4Rg34j2A61Ag/exec",
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Failed to load data:", error);
      return null; // Return null to handle errors gracefully
    });
}

function search() {
  const searchTerm = document.getElementById("searchBox").value.toLowerCase();
  loadDatabase()
    .then((data) => {
      if (!data) {
        // Check if data is null from error handling in loadDatabase
        console.error("No data received or error in fetching data.");
        return; // Exit the function if data is not available
      }
      const results = data.filter((item) =>
        item.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
      );
      displayResults(results);
    })
    .catch((error) => {
      console.error("Error processing data:", error);
    });
}

function displayResults(results) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = ""; // Clear previous results
  if (results.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
    return;
  }
  results.forEach((result) => {
    const element = document.createElement("div");
    const link = document.createElement("a");
    link.href = result.url;
    link.textContent = result.title;
    link.target = "_blank"; // Open links in a new tab
    element.appendChild(link);
    resultsContainer.appendChild(element);
  });
}
