// Dashboard JavaScript
console.log('Dashboard loaded');

// Tambahkan interaktivitas untuk cards
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('h3').textContent;
        console.log('Clicked on:', title);
        // Bisa ditambahkan navigasi ke halaman lain jika diperlukan
    });
});

// Contoh fetch user profile dari API
async function getUserProfile() {
    try {
        const response = await fetch('/api/user');
        if (response.ok) {
            const user = await response.json();
            console.log('User profile:', user);
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
}

// Panggil saat halaman dimuat
window.addEventListener('DOMContentLoaded', () => {
    getUserProfile();
});
