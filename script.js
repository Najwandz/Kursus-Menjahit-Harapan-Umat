// Tunggu sampai seluruh konten HTML dimuat (DOM Content Loaded)
document.addEventListener('DOMContentLoaded', function() {

    // 1. STICKY HEADER (Memberikan bayangan pada navbar saat di-scroll)
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            header.style.transition = 'all 0.3s ease';
        } else {
            header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.05)';
        }
    });

    // 2. SMOOTH SCROLLING (Untuk link navigasi yang mengarah ke ID section tertentu)
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Abaikan jika href hanya "#"
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Scroll ke elemen dengan efek halus
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update kelas 'active' pada menu navigasi
                document.querySelectorAll('.main-nav ul li a').forEach(nav => nav.classList.remove('active'));
                if (this.classList.contains('active') === false && this.closest('.main-nav')) {
                    this.classList.add('active');
                }
            }
        });
    });

    // 3. ANIMASI FADE-IN SAAT SCROLL (Menggunakan Intersection Observer)
    // Mencari elemen-elemen yang akan dianimasikan
    const animatedElements = document.querySelectorAll('.benefit-card, .program-card, .about-image, .about-content');
    
    // Set style awal elemen menjadi tersembunyi
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    // Observer untuk mendeteksi kapan elemen masuk ke dalam layar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Unobserve agar animasi hanya berjalan sekali
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15 // Animasi mulai saat 15% elemen terlihat di layar
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // 4. INTERAKSI TOMBOL DAFTAR (Contoh Alert/Notifikasi sementara)
    const btnDaftar = document.querySelectorAll('a[href="#daftar"]');
    btnDaftar.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Terima kasih! Fitur pendaftaran akan segera dialihkan ke Formulir atau WhatsApp Admin.');
            // Anda bisa mengganti ini dengan: window.location.href = "https://wa.me/6281224074427";
        });
    });

});
