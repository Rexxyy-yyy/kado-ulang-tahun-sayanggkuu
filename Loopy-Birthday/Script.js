// ==========================================
// 0. INISIALISASI ANIMASI SCROLL (AOS)
// ==========================================
AOS.init({
    once: true, // Animasi hanya berjalan satu kali saat pertama kali di-scroll ke bawah
    offset: 100 // Animasi mulai saat elemen berjarak 100px dari bawah layar
});

// Memastikan HTML selesai dimuat sebelum menjalankan JavaScript
document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // 1. LOGIKA GERBANG RAHASIA (LOGIN)
    // ==========================================
    const loginBtn = document.getElementById('loginBtn');
    const passwordInput = document.getElementById('passwordInput');
    
    if(loginBtn) {
        loginBtn.addEventListener('click', function() {
            const inputPass = passwordInput.value.toLowerCase().trim();
            const errorMessage = document.getElementById('errorMessage');
            
            if (inputPass === 'miftah' || inputPass === "miftah ma'arif") {
                document.getElementById('loginScreen').style.display = 'none';
                document.getElementById('mainContent').style.display = 'block';
                
                // --- KODE BARU UNTUK MEMUNCULKAN POP-UP NOTIFIKASI ---
                setTimeout(function() {
                    const toast = document.getElementById('cuteToast');
                    if (toast) {
                        toast.classList.add('show'); // Munculkan pop-up
                        
                        // Hilangkan pop-up secara otomatis setelah 5 detik (5000 ms)
                        setTimeout(function() {
                            toast.classList.remove('show');
                        }, 5000);
                    }
                }, 3000); // Delay 3 detik setelah login sebelum pop-up muncul
                // -----------------------------------------------------
                
            } else if (inputPass === '') {
                errorMessage.innerText = "Isi dulu dong jawabannya! 😡";
            } else {
                errorMessage.innerText = "Tetot! Salah. Coba lagi! 😋";
                passwordInput.value = ''; 
            }
        });
    }

    if(passwordInput) {
        passwordInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                loginBtn.click();
            }
        });
    }

    // ==========================================
    // 2. LOGIKA MINI GAME TOMBOL KABUR
    // ==========================================
    const btnNggak = document.getElementById('btnNggak');
    const btnSayang = document.getElementById('btnSayang');
    const gameResult = document.getElementById('gameResult');
    const surpriseContainer = document.getElementById('surpriseContainer');

    if(btnNggak && btnSayang) {
        // Membuat tombol menghindar saat disentuh atau diklik
        btnNggak.addEventListener('mouseover', kabur);
        btnNggak.addEventListener('click', kabur); 

        function kabur() {
            const maxX = window.innerWidth - btnNggak.clientWidth - 20;
            const maxY = window.innerHeight - btnNggak.clientHeight - 20;
            
            const randomX = Math.floor(Math.random() * maxX);
            const randomY = Math.floor(Math.random() * maxY);

            btnNggak.style.position = 'fixed';
            btnNggak.style.left = randomX + 'px';
            btnNggak.style.top = randomY + 'px';
            btnNggak.style.zIndex = '9999';
        }

        // Jika tombol "Sayang Banget" berhasil diklik
        btnSayang.addEventListener('click', function() {
            if(gameResult) gameResult.style.display = 'block';
            
            // Memunculkan tombol kejutan yang tadinya disembunyikan
            if(surpriseContainer) surpriseContainer.style.display = 'block'; 
            
            btnNggak.style.display = 'none';
            btnSayang.style.pointerEvents = 'none';
            btnSayang.textContent = 'Aww, aku juga! 🥰';
        });
    }

    // ==========================================
    // 3. LOGIKA TOMBOL KEJUTAN (HUJAN HATI)
    // ==========================================
    const surpriseBtn = document.getElementById('surpriseBtn');
    
    if(surpriseBtn) {
        surpriseBtn.addEventListener('click', function() {
            const hiddenMsg = document.getElementById('hiddenMessage');
            if(hiddenMsg) hiddenMsg.style.display = 'block';
            
            this.textContent = 'Yeayyy! 🎉';
            this.style.backgroundColor = '#FF69B4';
            this.style.pointerEvents = 'none'; 
            
            createHearts();
        });
    }

    // ==========================================
    // 8. FITUR PESAN SUARA (VOICE NOTE)
    // ==========================================
    const playAudioBtn = document.getElementById('playAudioBtn');
    const myAudio = document.getElementById('myAudio');

    if (playAudioBtn && myAudio) {
        playAudioBtn.addEventListener('click', function() {
            // Jika audio sedang jeda/berhenti, maka putar
            if (myAudio.paused) {
                myAudio.play();
                playAudioBtn.innerHTML = '⏸️ Jeda Suara';
                playAudioBtn.classList.add('playing'); // Mengaktifkan efek kedip
            } else {
                // Jika audio sedang berputar, maka jeda
                myAudio.pause();
                playAudioBtn.innerHTML = '▶️ Lanjut Putar';
                playAudioBtn.classList.remove('playing'); // Mematikan efek kedip
            }
        });

        // Mengembalikan tombol ke wujud semula saat rekaman suara sudah selesai berputar
        myAudio.addEventListener('ended', function() {
            playAudioBtn.innerHTML = '▶️ Putar Ulang Suara';
            playAudioBtn.classList.remove('playing');
        });
    }

    // ==========================================
    // 10. PEMINDAI SIDIK JARI JODOH
    // ==========================================
    const scanBtn = document.getElementById('scanBtn');
    const scanProgress = document.getElementById('scanProgress');
    const scanStatus = document.getElementById('scanStatus');
    const scanResult = document.getElementById('scanResult');

    let scanInterval;
    let progressValue = 0;

    function startScan(e) {
        // Mencegah klik kanan atau layar ter-scroll saat tombol ditahan di HP
        e.preventDefault(); 
        
        // Jika sudah selesai 100%, jangan lakukan apa-apa lagi
        if (progressValue >= 100) return; 
        
        scanStatus.innerText = "Memindai sidik jari... Tahan terus! 🔍";
        scanBtn.style.backgroundColor = "#FF69B4";
        
        // Menjalankan loading bar setiap 50 milidetik
        scanInterval = setInterval(() => {
            progressValue += 2; // Naik 2% terus menerus
            scanProgress.style.width = progressValue + '%';
            
            // Jika loading sudah penuh (100%)
            if (progressValue >= 100) {
                clearInterval(scanInterval);
                scanStatus.innerText = "Pemindaian Selesai! ✅";
                scanBtn.innerText = "Sidik Jari Diterima";
                scanBtn.style.pointerEvents = "none"; // Matikan tombol
                scanResult.classList.remove('hidden'); // Tampilkan hasil kecocokan
                
                // Panggil hujan hati untuk merayakan kecocokan!
                if (typeof createHearts === "function") createHearts();
            }
        }, 50); // Total waktu = (100 / 2) * 50ms = 2.5 detik
    }

    function stopScan() {
        // Jika sudah selesai 100%, abaikan fungsi stop ini
        if (progressValue >= 100) return; 
        
        // Jika dilepas sebelum 100%, reset semuanya ke 0
        clearInterval(scanInterval);
        progressValue = 0;
        scanProgress.style.width = '0%';
        scanStatus.innerText = "Yah, dilepas! Tahan sampai penuh ya. 🥺";
        scanBtn.style.backgroundColor = "#FF9AA2";
    }

    if (scanBtn) {
        // Event pendeteksi untuk Laptop / Mouse
        scanBtn.addEventListener('mousedown', startScan);
        scanBtn.addEventListener('mouseup', stopScan);
        scanBtn.addEventListener('mouseleave', stopScan); // Jika kursor keluar dari tombol

        // Event pendeteksi untuk HP / Layar Sentuh (Touchscreen)
        scanBtn.addEventListener('touchstart', startScan, {passive: false});
        scanBtn.addEventListener('touchend', stopScan);
    }

    // ==========================================
    // 11. TOPLES PESAN RAHASIA (RANDOM LOVE MESSAGE)
    // ==========================================
    const drawMessageBtn = document.getElementById('drawMessageBtn');
    const paperMessage = document.getElementById('paperMessage');
    const randomText = document.getElementById('randomText');

    // Daftar pesan acak (Bebas ditambah/diubah sesukamu!)
    const loveMessages = [
        "Kamu itu prioritas utamaku, bahkan lebih penting dari push rank ML atau main eFootball! 🎮",
        "Cintaku ke kamu itu ibarat infinite loop di kodingan, muter terus nggak ada berhentinya! 💻",
        "Aku suka cara kamu ketawa, bikin beban tugas dan laporan praktikum langsung hilang. ✨",
        "Makasih ya udah selalu sabar ngadepin aku. Kamu perempuan paling hebat yang aku kenal! 💖",
        "Setiap liat notif dari kamu, senyumku otomatis ngembang walau lagi capek nugas. 📱",
        "Nggak sabar pengen cepet-cepet lulus sarjana, sukses, dan bikin kamu bahagia terus! 🎓",
        "Kamu itu ibarat charger fast-charging buat semangat aku kalau lagi low-batt. ⚡",
        "Semoga di umur 21 ini, semua doa dan impian kamu dikabulkan ya sayang. Love you cintakuu! 🥰"
    ];

    if (drawMessageBtn && paperMessage && randomText) {
        drawMessageBtn.addEventListener('click', function() {
            // Pilih indeks angka secara acak
            const randomIndex = Math.floor(Math.random() * loveMessages.length);
            
            // Sembunyikan dulu kertasnya sebentar
            paperMessage.classList.remove('paper-show');
            
            // Ubah teks dan munculkan kertasnya lagi setelah jeda
            setTimeout(() => {
                randomText.innerText = `"${loveMessages[randomIndex]}"`;
                paperMessage.classList.add('paper-show');
                
                // Munculkan taburan bintang saat kertas ditarik!
                if (typeof createHearts === "function") createHearts();
            }, 50); 
        });
    }

    // ==========================================
    // 12. KARTU GOSOK DIGITAL (SCRATCH CARD)
    // ==========================================
    const canvas = document.getElementById('scratchCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let isDrawing = false;

        // Menyamakan resolusi canvas dengan ukuran aslinya di CSS
        canvas.width = 320;
        canvas.height = 180;

        // Mengisi canvas dengan warna abu-abu keperakan
        ctx.fillStyle = '#C0C0C0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Menambahkan pola polkadot transparan agar mirip kupon sungguhan
        ctx.fillStyle = '#A9A9A9';
        for (let i = 0; i < 40; i++) {
            ctx.beginPath();
            ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 5 + 2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Menambahkan instruksi teks di atas lapisan perak
        ctx.font = 'bold 22px "Quicksand", sans-serif';
        ctx.fillStyle = '#666';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🪙 Gosok Hadiahnya! 🪙', canvas.width / 2, canvas.height / 2);

        // Fungsi untuk "menghapus" area yang dilewati jari/kursor
        function scratch(x, y) {
            ctx.globalCompositeOperation = 'destination-out'; // Mode hapus
            ctx.beginPath();
            ctx.arc(x, y, 22, 0, Math.PI * 2); // Ukuran "koin" penggosok (22px)
            ctx.fill();
            
            // Memunculkan efek bintang kecil saat sedang menggosok
            if (Math.random() > 0.8 && typeof createTrail === "function") {
                const rect = canvas.getBoundingClientRect();
                createTrail(rect.left + x, rect.top + y);
            }
        }

        function getMousePos(evt) {
            const rect = canvas.getBoundingClientRect();
            return {
                x: (evt.clientX - rect.left) * (canvas.width / rect.width),
                y: (evt.clientY - rect.top) * (canvas.height / rect.height)
            };
        }

        function getTouchPos(evt) {
            const rect = canvas.getBoundingClientRect();
            return {
                x: (evt.touches[0].clientX - rect.left) * (canvas.width / rect.width),
                y: (evt.touches[0].clientY - rect.top) * (canvas.height / rect.height)
            };
        }

        // Event Mouse (Untuk Laptop/PC)
        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            const pos = getMousePos(e);
            scratch(pos.x, pos.y);
        });
        canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing) return;
            const pos = getMousePos(e);
            scratch(pos.x, pos.y);
        });
        canvas.addEventListener('mouseup', () => { isDrawing = false; });
        canvas.addEventListener('mouseleave', () => { isDrawing = false; });

        // Event Touch (Untuk HP)
        canvas.addEventListener('touchstart', (e) => {
            isDrawing = true;
            e.preventDefault(); // Mencegah layar ter-scroll ke bawah saat menggosok!
            const pos = getTouchPos(e);
            scratch(pos.x, pos.y);
        }, { passive: false });
        
        canvas.addEventListener('touchmove', (e) => {
            if (!isDrawing) return;
            e.preventDefault();
            const pos = getTouchPos(e);
            scratch(pos.x, pos.y);
        }, { passive: false });
        
        canvas.addEventListener('touchend', () => { isDrawing = false; });
    }

    // ==========================================
    // 14. SURAT CINTA MESIN KETIK (TYPEWRITER)
    // ==========================================
    const openLetterBtn = document.getElementById('openLetterBtn');
    const letterPaper = document.getElementById('letterPaper');
    const typewriterText = document.getElementById('typewriterText');

    // ⚠️ GANTI TEKS INI DENGAN SURAT ASLIMU!
    const secretLetter = "Halo sayang... Selamat ulang tahun yang ke-21! 🎉 Terima kasih ya udah jadi alasan aku buat terus semangat kuliah dan nugas. Maaf kalau aku kadang bikin kamu sedih, tapi percayalah kamu selalu ada di pikiranku dan selalu mencari solusi agar kita tetap bersama. Semoga di umur yang baru ini, kamu makin dewasa, makin cantik, makin soleha, dan kita bisa terus sama-sama sampai sukses nanti. I love you sayanggkuu cintakuu cantikkuu! 💕 - Miftah";

    let twIndex = 0;
    let isTyping = false;

    if (openLetterBtn && letterPaper && typewriterText) {
        openLetterBtn.addEventListener('click', function() {
            // Mencegah tombol diklik dua kali saat sedang mengetik
            if(isTyping) return;
            isTyping = true;
            
            // Sembunyikan tombol setelah diklik
            openLetterBtn.style.display = 'none'; 
            
            // Munculkan kertas dengan animasi membentang
            letterPaper.classList.add('show-letter');
            
            // Tunggu 800 milidetik (sampai animasi kertas selesai), baru mulai mengetik
            setTimeout(() => {
                typeWriterEffect();
            }, 800); 
        });
    }

    function typeWriterEffect() {
        if (twIndex < secretLetter.length) {
            // Mengetik huruf satu per satu
            typewriterText.innerHTML += secretLetter.charAt(twIndex);
            twIndex++;
            
            // Kecepatan mengetik (40 milidetik per huruf). Bisa kamu ubah!
            setTimeout(typeWriterEffect, 40); 
        } else {
            // Jika surat sudah selesai diketik semua, munculkan hujan hati!
            if (typeof createHearts === "function") createHearts();
        }
    }
});

// ==========================================
// 4. FUNGSI UNTUK MEMBUAT HUJAN EMOJI
// ==========================================
function createHearts() {
    const heartsContainer = document.body;
    const heartIcons = ['💖', '💕', '🎀', '🌸', '✨']; 

    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerText = heartIcons[Math.floor(Math.random() * heartIcons.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
            
            heartsContainer.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, i * 150); 
    }
}

// ==========================================
// 5. EFEK JEJAK KURSOR (CURSOR TRAIL)
// ==========================================
function createTrail(x, y) {
    if (Math.random() > 0.6) {
        const trail = document.createElement('div');
        trail.classList.add('cursor-trail');
        
        const trailIcons = ['🌸', '✨', '💖', '🎀'];
        trail.innerText = trailIcons[Math.floor(Math.random() * trailIcons.length)];
        
        trail.style.left = (x - 10) + 'px';
        trail.style.top = (y - 10) + 'px';
        document.body.appendChild(trail);

        setTimeout(() => {
            trail.remove();
        }, 1000);
    }
}

document.addEventListener('mousemove', function(e) {
    createTrail(e.pageX, e.pageY);
});

document.addEventListener('touchmove', function(e) {
    createTrail(e.touches[0].pageX, e.touches[0].pageY);
});

// ==========================================
// 6. EFEK TABURAN SAAT DIKLIK (CLICK SPARKLES)
// ==========================================
document.addEventListener('click', function(e) {
    // Abaikan efek klik pada input form, kupon, tombol scan, canvas, tombol kertas, dan lilin agar tidak tumpang tindih
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'CANVAS' || e.target.closest('.coupon') || e.target.closest('.scan-btn') || e.target.closest('.draw-btn') || e.target.closest('.candle')) return;

    const sparkleIcons = ['✨', '💖', '🌟', '🎉'];
    const numSparkles = 5 + Math.floor(Math.random() * 5);

    for (let i = 0; i < numSparkles; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('click-sparkle');
        sparkle.innerText = sparkleIcons[Math.floor(Math.random() * sparkleIcons.length)];
        
        sparkle.style.left = (e.pageX - 10) + 'px';
        sparkle.style.top = (e.pageY - 10) + 'px';

        const tx = (Math.random() - 0.5) * 150; 
        const ty = (Math.random() - 0.5) * 150; 
        const rot = Math.random() * 360; 

        sparkle.style.setProperty('--tx', tx + 'px');
        sparkle.style.setProperty('--ty', ty + 'px');
        sparkle.style.setProperty('--rot', rot + 'deg');

        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 800);
    }
});

// ==========================================
// 7. KALKULATOR WAKTU BERSAMA (RELATIONSHIP COUNTER)
// ==========================================
function updateCounter() {
    const startDate = new Date('2026-08-25T00:00:00'); 
    const now = new Date();
    const diff = now - startDate;
    
    if (diff < 0) return; 

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    
    const dElem = document.getElementById('days');
    const hElem = document.getElementById('hours');
    const mElem = document.getElementById('minutes');
    const sElem = document.getElementById('seconds');
    
    if(dElem) dElem.innerText = days;
    if(hElem) hElem.innerText = hours < 10 ? '0' + hours : hours;
    if(mElem) mElem.innerText = minutes < 10 ? '0' + minutes : minutes;
    if(sElem) sElem.innerText = seconds < 10 ? '0' + seconds : seconds;
}

setInterval(updateCounter, 1000);
updateCounter(); 

// ==========================================
// 9. LOGIKA KUPON CINTA DIGITAL
// ==========================================
function claimCoupon(element) {
    if (!element.classList.contains('claimed')) {
        element.classList.add('claimed');
        
        const statusSpan = element.querySelector('.status');
        statusSpan.innerText = '✅ Sudah Diklaim!';
        
        if (typeof createHearts === "function") {
            createHearts();
        }
    } else {
        alert('Eits, kupon ini sudah kamu klaim ya! Screen capture dan kirim ke aku sekarang 😜');
    }
}

// ==========================================
// 13. LOGIKA TIUP LILIN KUE VIRTUAL
// ==========================================
function blowCandle(element) {
    const flame = element.querySelector('.flame');
    
    // Mengecek apakah api masih menyala
    if (flame && !flame.classList.contains('blown-out')) {
        // Matikan api
        flame.classList.add('blown-out'); 
        
        // Tampilkan teks permohonan yang diaminkan
        const wishText = document.getElementById('wishText');
        if (wishText) {
            wishText.style.display = 'block';
            wishText.style.animation = 'fadeIn 1s forwards';
        }

        // Panggil hujan hati untuk merayakan permohonannya!
        if (typeof createHearts === "function") {
            createHearts();
        }
    }
}