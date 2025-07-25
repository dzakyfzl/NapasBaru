// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = 80; // Height of fixed header
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// AI Chat functionality
let aiChatOpen = false;

document.getElementById('aiButton').addEventListener('click', function() {
    openAIChat();
});

function openAIChat() {
    const overlay = document.getElementById('aiChatOverlay');
    const mainContent = document.getElementById('mainContent');
    
    overlay.classList.remove('hidden');
    mainContent.classList.add('split-active');
    aiChatOpen = true;
    
    // Focus on chat input
    setTimeout(() => {
        document.getElementById('chatInput').focus();
    }, 300);
}

function closeAIChat() {
    const overlay = document.getElementById('aiChatOverlay');
    const mainContent = document.getElementById('mainContent');
    
    overlay.classList.add('hidden');
    mainContent.classList.remove('split-active');
    aiChatOpen = false;
}

// Send message in AI chat
function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const message = chatInput.value.trim();
    
    if (message) {
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'bg-blue-500 text-white p-3 rounded-lg ml-12 chat-message';
        userMessage.innerHTML = `<p class="text-sm">${message}</p>`;
        chatMessages.appendChild(userMessage);
        
        // Clear input
        chatInput.value = '';
        
        // Simulate AI response after a delay
        setTimeout(() => {
            const aiResponse = document.createElement('div');
            aiResponse.className = 'bg-gray-100 p-3 rounded-lg chat-message';
            aiResponse.innerHTML = `<p class="text-sm">Terima kasih atas pertanyaan Anda tentang "${message}". Saya akan membantu Anda dalam perjalanan berhenti merokok. Apakah ada hal spesifik yang ingin Anda ketahui tentang tahapan berhenti merokok?</p>`;
            chatMessages.appendChild(aiResponse);
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Allow Enter key to send message
document.getElementById('chatInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Kalkulator functionality
function hitungPengeluaran() {
    const hargaRokok = parseFloat(document.getElementById('hargaRokok').value);
    const bungkusPerMinggu = parseFloat(document.getElementById('bungkusPerMinggu').value);
    const hasilDiv = document.getElementById('hasilKalkulator');
    
    if (isNaN(hargaRokok) || isNaN(bungkusPerMinggu) || hargaRokok <= 0 || bungkusPerMinggu <= 0) {
        hasilDiv.innerHTML = `
            <div class="text-red-600">
                <p class="font-semibold">⚠️ Mohon masukkan angka yang valid!</p>
                <p class="text-sm mt-1">Pastikan kedua field terisi dengan angka yang benar.</p>
            </div>
        `;
        return;
    }
    
    // Perhitungan pengeluaran
    const pengeluaranPerminggu = hargaRokok * bungkusPerMinggu;
    const pengeluaranPerbulan = pengeluaranPerminggu * 4.33; // rata-rata minggu per bulan
    const pengeluaranPertahun = pengeluaranPerbulan * 12;
    const pengeluaran5tahun = pengeluaranPertahun * 5;
    const pengeluaran10tahun = pengeluaranPertahun * 10;
    
    // Format currency
    const formatRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };
    
    hasilDiv.innerHTML = `
        <div class="space-y-4">
            <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 class="font-bold text-lg text-blue-800 mb-3">💰 Pengeluaran Rokok Anda:</h4>
                <div class="grid grid-cols-2 gap-3 text-sm">
                    <div>
                        <span class="text-gray-600">Per minggu:</span>
                        <p class="font-semibold text-blue-700">${formatRupiah(pengeluaranPerminggu)}</p>
                    </div>
                    <div>
                        <span class="text-gray-600">Per bulan:</span>
                        <p class="font-semibold text-blue-700">${formatRupiah(pengeluaranPerbulan)}</p>
                    </div>
                    <div>
                        <span class="text-gray-600">Per tahun:</span>
                        <p class="font-semibold text-red-600">${formatRupiah(pengeluaranPertahun)}</p>
                    </div>
                    <div>
                        <span class="text-gray-600">5 tahun:</span>
                        <p class="font-semibold text-red-600">${formatRupiah(pengeluaran5tahun)}</p>
                    </div>
                </div>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h4 class="font-bold text-green-800 mb-2">🎯 Potensi Penghematan:</h4>
                <p class="text-sm text-green-700">Dengan berhenti merokok, Anda bisa menghemat <span class="font-bold">${formatRupiah(pengeluaran10tahun)}</span> dalam 10 tahun!</p>
                <p class="text-xs text-green-600 mt-2">💡 Uang ini bisa digunakan untuk investasi, pendidikan, atau hal bermanfaat lainnya.</p>
            </div>
        </div>
    `;
}

// Feedback functionality
function kirimFeedback() {
    const nama = document.getElementById('namaFeedback').value.trim();
    const pesan = document.getElementById('pesanFeedback').value.trim();
    
    if (!nama || !pesan) {
        alert('Mohon lengkapi nama dan pesan Anda!');
        return;
    }
    
    // Simulate sending feedback
    alert(`Terima kasih ${nama}! Feedback Anda telah dikirim dan akan kami review segera.`);
    
    // Clear form
    document.getElementById('namaFeedback').value = '';
    document.getElementById('pesanFeedback').value = '';
}

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.card-hover, .bg-red-500, .bg-purple-500, .bg-orange-600');
    animateElements.forEach(el => observer.observe(el));
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('bg-white/95');
        header.classList.remove('bg-white/90');
    } else {
        header.classList.add('bg-white/90');
        header.classList.remove('bg-white/95');
    }
});

// Prevent chat overlay from closing when clicking inside the chat area
document.querySelector('#aiChatOverlay .w-96').addEventListener('click', function(e) {
    e.stopPropagation();
});