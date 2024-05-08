document
  .getElementById("searchBox")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      search();
    }
  });

function loadDatabase() {
  return fetch(
    "https://script.google.com/a/macros/sierrainteractive.com/s/AKfycby8MzdykN1pKBvJMmZPl10OtwlpCTcXoJEWaFNORXMegvzHChGbx1Yt6L4Rg34j2A61Ag/exec",
  )
    .then((response) => response.json())
    .catch((error) => console.error("Failed to load data:", error));
}

function search() {
  const searchTerm = document.getElementById("searchBox").value.toLowerCase();
  loadDatabase().then((data) => {
    const results = data.filter((item) =>
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
    );
    displayResults(results);
  });
}

function displayResults(results) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";
  results.forEach((result) => {
    const element = document.createElement("div");
    const link = document.createElement("a");
    link.href = result.url;
    link.textContent = result.title; // Display the title as the link text
    element.appendChild(link);
    resultsContainer.appendChild(element);
  });
}
