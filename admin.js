document
  .getElementById("linkForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("titleField").value;
    const url = document.getElementById("urlField").value;
    const tags = document
      .getElementById("tagsField")
      .value.split(",")
      .map((tag) => tag.trim().toLowerCase());
    addLink(title, url, tags);
    displayLinks(); // Refresh list after adding
  });

function loadLinks() {
  return JSON.parse(localStorage.getItem("links") || "[]");
}

function saveLinks(links) {
  localStorage.setItem("links", JSON.stringify(links));
  displayLinks(); // Refresh list after save
}

function addLink(title, url, tags) {
  let links = loadLinks();
  links.push({ title, url, tags });
  saveLinks(links);
  document.getElementById("linkForm").reset();
}

function editLink(index) {
  let links = loadLinks();
  let link = links[index];
  let newTitle = prompt("Update the title", link.title);
  let newUrl = prompt("Update the URL", link.url);
  let newTags = prompt(
    "Update the tags (comma-separated)",
    link.tags.join(", "),
  );

  if (newTitle != null) link.title = newTitle;
  if (newUrl != null) link.url = newUrl;
  if (newTags != null)
    link.tags = newTags.split(",").map((tag) => tag.trim().toLowerCase());

  links[index] = link;
  saveLinks(links);
}

function displayLinks() {
  const links = loadLinks();
  const list = document.getElementById("linksList");
  list.innerHTML = "";

  links.forEach((link, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `${link.title} - <button onclick="editLink(${index})">Edit</button>`;
    list.appendChild(listItem);
  });
}

// Initially display all links
document.addEventListener("DOMContentLoaded", displayLinks);
