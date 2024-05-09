document.addEventListener("DOMContentLoaded", function () {
  const searchBox = document.getElementById("searchBox");
  searchBox.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      search();
    }
  });
});

function loadDatabase() {
  const loadingIndicator = document.getElementById("loadingIndicator");
  loadingIndicator.style.display = "block"; // Show loading indicator

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
      loadingIndicator.style.display = "none"; // Hide on error
      return null; // Return null to handle errors gracefully
    });
}

function search() {
  const searchTerm = document.getElementById("searchBox").value.toLowerCase();
  const loadingIndicator = document.getElementById("loadingIndicator");

  loadDatabase()
    .then((data) => {
      loadingIndicator.style.display = "none"; // Hide loading indicator

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
      loadingIndicator.style.display = "none"; // Hide loading indicator on error
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
