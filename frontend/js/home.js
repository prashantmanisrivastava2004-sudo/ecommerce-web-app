const searchInput = document.getElementById('searchInput');
const categorySections = document.querySelectorAll('.category-section');

function filterCategory(category) {
    categorySections.forEach(section => {
        if (section.id === category) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    categorySections.forEach(section => {
        if (section.id.toLowerCase().includes(query) || query === '') {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
});