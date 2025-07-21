import { Chart } from "@/components/ui/chart"
// Global variables
let isChatOpen = false
const chatMessages = []

// Initialize the website
document.addEventListener("DOMContentLoaded", () => {
  initializeCharts()
  initializeFeedbackForm()
  checkUserLogin()
  initializeSmoothScrolling()
})

// Check if user is logged in
function checkUserLogin() {
  const user = JSON.parse(localStorage.getItem("user") || "null")
  const userSection = document.getElementById("user-section")
  const authButtons = document.getElementById("auth-buttons")
  const userName = document.getElementById("user-name")

  if (user) {
    userSection.classList.remove("hidden")
    authButtons.classList.add("hidden")
    userName.textContent = user.name || user.email
  } else {
    userSection.classList.add("hidden")
    authButtons.classList.remove("hidden")
  }
}

// Logout function
function logout() {
  localStorage.removeItem("user")
  checkUserLogin()
  showNotification("Anda telah keluar", "success")
}

// Initialize charts
function initializeCharts() {
  // Bar Chart
  const barCtx = document.getElementById("barChart").getContext("2d")
  new Chart(barCtx, {
    type: "bar",
    data: {
      labels: ["Pria", "Wanita", "Total"],
      datasets: [
        {
          data: [65, 2, 67],
          backgroundColor: ["#06b6d4", "#ef4444", "#f97316"],
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 70,
          ticks: {
            stepSize: 10,
          },
        },
      },
    },
  })

  // Pie Chart
  const pieCtx = document.getElementById("pieChart").getContext("2d")
  new Chart(pieCtx, {
    type: "pie",
    data: {
      labels: ["Stroke", "Kanker Paru-Paru", "PPOK (COPD)", "Penyakit Jantung"],
      datasets: [
        {
          data: [25, 30, 20, 25],
          backgroundColor: ["#8b5cf6", "#f59e0b", "#06b6d4", "#ef4444"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
          labels: {
            usePointStyle: true,
            padding: 20,
          },
        },
      },
    },
  })
}

// Initialize feedback form
function initializeFeedbackForm() {
  const form = document.getElementById("feedback-form")
  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value
    const message = document.getElementById("message").value

    if (!name || !message) {
      showFeedbackMessage("Nama dan pesan harus diisi", false)
      return
    }

    // Simulate form submission
    showFeedbackMessage("Feedback berhasil dikirim! Terima kasih atas masukan Anda.", true)
    form.reset()
  })
}

// Show feedback message
function showFeedbackMessage(message, isSuccess) {
  const messageDiv = document.getElementById("feedback-message")
  messageDiv.textContent = message
  messageDiv.className = `mt-4 p-3 rounded-md ${isSuccess ? "bg-green-500/20 text-white border border-green-400" : "bg-red-500/20 text-white border border-red-400"}`
  messageDiv.classList.remove("hidden")

  setTimeout(() => {
    messageDiv.classList.add("hidden")
  }, 5000)
}

// Financial calculator
function calculateCosts() {
  const price = Number.parseFloat(document.getElementById("price").value)
  const packs = Number.parseFloat(document.getElementById("packs").value)

  if (isNaN(price) || isNaN(packs) || price <= 0 || packs <= 0) {
    showNotification("Mohon masukkan nilai yang valid", "error")
    return
  }

  const daily = (price * packs) / 7
  const weekly = price * packs
  const monthly = weekly * 4.33
  const yearly = weekly * 52

  document.getElementById("daily-cost").textContent = formatCurrency(daily)
  document.getElementById("weekly-cost").textContent = formatCurrency(weekly)
  document.getElementById("monthly-cost").textContent = formatCurrency(monthly)
  document.getElementById("yearly-cost").textContent = formatCurrency(yearly)

  document.getElementById("calculation-result").classList.remove("hidden")
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)
}

// Chat functionality
function toggleChat() {
  const chatPanel = document.getElementById("chat-panel")
  isChatOpen = !isChatOpen

  if (isChatOpen) {
    chatPanel.classList.add("open")
  } else {
    chatPanel.classList.remove("open")
  }
}

function sendMessage() {
  const input = document.getElementById("chat-input")
  const message = input.value.trim()

  if (!message) return

  addChatMessage(message, "user")
  input.value = ""

  // Simulate AI response
  setTimeout(() => {
    const responses = [
      "Terima kasih atas pertanyaan Anda! Sebagai asisten AI NapasBaru, saya siap membantu Anda dengan informasi tentang kesehatan paru-paru dan program berhenti merokok.",
      "Berhenti merokok adalah keputusan terbaik untuk kesehatan Anda. Apakah Anda ingin tahu lebih lanjut tentang roadmap 6 tahap kami?",
      "Kalkulator finansial kami dapat membantu Anda melihat berapa banyak uang yang bisa dihemat dengan berhenti merokok. Sudah mencobanya?",
      "Kesehatan paru-paru akan mulai membaik dalam 20 menit setelah berhenti merokok. Dalam 1 tahun, risiko penyakit jantung berkurang hingga 50%!",
      "Saya di sini untuk mendukung perjalanan Anda menuju hidup bebas rokok. Ada hal spesifik yang ingin Anda tanyakan?",
    ]

    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    addChatMessage(randomResponse, "assistant")
  }, 1000)
}

function addChatMessage(message, role) {
  const messagesContainer = document.getElementById("chat-messages")
  const messageDiv = document.createElement("div")

  messageDiv.className = `flex ${role === "user" ? "justify-end" : "justify-start"} mb-4`
  messageDiv.innerHTML = `
        <div class="max-w-[80%] rounded-lg px-4 py-2 ${role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"}">
            <p class="text-sm">${message}</p>
        </div>
    `

  messagesContainer.appendChild(messageDiv)
  messagesContainer.scrollTop = messagesContainer.scrollHeight
}

function handleChatKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage()
  }
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Show notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
    type === "success"
      ? "bg-green-500 text-white"
      : type === "error"
        ? "bg-red-500 text-white"
        : "bg-blue-500 text-white"
  }`
  notification.textContent = message

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 3000)
}

// Mobile menu toggle
function toggleMobileMenu() {
  const nav = document.querySelector("nav")
  nav.classList.toggle("hidden")
}

// Add some interactive animations
function addInteractiveAnimations() {
  // Animate statistics cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.transform = "translateY(0)"
        entry.target.style.opacity = "1"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll(".bg-red-500, .bg-purple-500, .bg-orange-600").forEach((card) => {
    card.style.transform = "translateY(20px)"
    card.style.opacity = "0"
    card.style.transition = "transform 0.6s ease, opacity 0.6s ease"
    observer.observe(card)
  })
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", addInteractiveAnimations)

// Add floating action button for quick access
function createFloatingActionButton() {
  const fab = document.createElement("button")
  fab.className =
    "fixed bottom-20 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40 md:hidden"
  fab.innerHTML = '<i class="fas fa-comment-alt"></i>'
  fab.onclick = toggleChat
  document.body.appendChild(fab)
}

// Initialize FAB on mobile
if (window.innerWidth < 768) {
  document.addEventListener("DOMContentLoaded", createFloatingActionButton)
}
