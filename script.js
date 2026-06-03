document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Fitur Filter Galeri Prestasi (Bug-Free) ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Hapus class 'active' dari semua tombol, tambahkan ke yang diklik
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            cards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Mencegah error/bentrok jika tombol diklik dengan sangat cepat
                if (card.hideTimeout) {
                    clearTimeout(card.hideTimeout);
                }

                if (filterValue === 'semua' || filterValue === category) {
                    card.classList.remove('hide');
                    
                    // Menggunakan requestAnimationFrame untuk memastikan browser 
                    // merender penghapusan 'hide' sebelum menjalankan animasi
                    requestAnimationFrame(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    
                    // Sembunyikan elemen secara menyeluruh setelah animasi selesai (400ms)
                    card.hideTimeout = setTimeout(() => {
                        card.classList.add('hide');
                    }, 400); 
                }
            });
        });
    });

    // --- 2. Fitur Smooth Scrolling untuk Navigasi ---
    const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const mainHeader = document.getElementById('main-header');
            
            if (targetSection && mainHeader) {
                // Menghitung tinggi header secara dinamis untuk offset
                const headerOffset = mainHeader.offsetHeight;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});
