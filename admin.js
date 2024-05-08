document.getElementById('linkForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('titleField').value;
    const url = document.getElementById('urlField').value;
    const tags = document.getElementById('tagsField').value.split(',').map(tag => tag.trim().toLowerCase());
    addLink(title, url, tags);
});

function addLink(title, url, tags) {
    let links = JSON.parse(localStorage.getItem('links') || '[]');
    links.push({ title, url, tags });
    localStorage.setItem('links', JSON.stringify(links));
    document.getElementById('statusMessage').textContent = 'Link added successfully!';
    document.getElementById('linkForm').reset();
}
