// --- Elemen DOM ---
const searchToggle = document.getElementById('search-toggle');
const searchBar = document.getElementById('search-bar');
const showAuthorsBtn = document.getElementById('show-authors-btn');

// --- Fungsi Toggle Search Bar ---
searchToggle.addEventListener('click', function(e) {
    e.preventDefault();
    // Jika bilah pencarian sedang disembunyikan, tampilkan, dan sebaliknya
    if (searchBar.style.display === 'none' || searchBar.style.display === '') {
        searchBar.style.display = 'block';
    } else {
        searchBar.style.display = 'none';
    }
});

// --- Fungsi Simulasi Aksi Lain ---
showAuthorsBtn.addEventListener('click', function() {
    // Di aplikasi nyata, ini akan memuat daftar penulis dari database atau mengarahkan ke halaman penulis.
    alert("Mengalihkan ke halaman Daftar Penulis. Anda akan menemukan biografi singkat para kontributor kami!");
});

// --- Inisialisasi Smooth Scroll (Opsional: agar navigasi lebih halus) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Hanya berlaku untuk link internal, bukan link navigasi yang memiliki aksi JS (seperti search-toggle)
        if (this.id !== 'search-toggle') {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});
