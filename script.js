// ===========================
// Loading Functionality
// ===========================

window.addEventListener("load", function () {
  setTimeout(function () {
    const preloader = document.querySelector(".preloader");
    const content = document.querySelector(".content");

    if (preloader) {
      preloader.style.display = "none";
    }
    content.style.display = "block";
  }, 3000); // 5000 milliseconds = 5 seconds
});

// ===========================
// Navigation Functionality
// ===========================
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Sticky navbar on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  // Animate hamburger icon
  const spans = hamburger.querySelectorAll("span");
  spans[0].style.transform = navMenu.classList.contains("active")
    ? "rotate(45deg) translateY(8px)"
    : "none";
  spans[1].style.opacity = navMenu.classList.contains("active") ? "0" : "1";
  spans[2].style.transform = navMenu.classList.contains("active")
    ? "rotate(-45deg) translateY(-8px)"
    : "none";
});

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    // Close mobile menu
    navMenu.classList.remove("active");
    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";

    // Scroll to section
    const offsetTop = targetSection.offsetTop - 70;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });

    // Update active link
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// Update active nav link on scroll
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ===========================
// Projects Filter Functionality
// ===========================
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Update active button
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    // Filter projects with animation
    projectCards.forEach((card, index) => {
      const category = card.getAttribute("data-category");

      if (filterValue === "all" || category === filterValue) {
        setTimeout(() => {
          card.style.display = "block";
          card.style.animation = "fadeInUp 0.5s ease-out forwards";
        }, index * 100);
      } else {
        card.style.display = "none";
      }
    });
  });
});

// ===========================
// Services Carousel Drag-to-Scroll
// ===========================
const carouselWrapper = document.querySelector(".services-scroll-wrapper");
if (carouselWrapper) {
  let isDown = false;
  let startX;
  let scrollLeft;

  carouselWrapper.addEventListener("mousedown", (e) => {
    isDown = true;
    carouselWrapper.classList.add("grabbing");
    startX = e.pageX - carouselWrapper.offsetLeft;
    scrollLeft = carouselWrapper.scrollLeft;
  });

  carouselWrapper.addEventListener("mouseleave", () => {
    isDown = false;
    carouselWrapper.classList.remove("grabbing");
  });

  carouselWrapper.addEventListener("mouseup", () => {
    isDown = false;
    carouselWrapper.classList.remove("grabbing");
  });

  carouselWrapper.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carouselWrapper.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast
    carouselWrapper.scrollLeft = scrollLeft - walk;
  });

  // Pause animation on manual scroll and resume after a delay
  const carouselContainer = carouselWrapper.querySelector(
    ".services-carousel-container"
  );
  let scrollTimeout;

  carouselWrapper.addEventListener("scroll", () => {
    // Pause the animation while user is scrolling
    carouselContainer.style.animationPlayState = "paused";

    // Clear any existing timeout
    clearTimeout(scrollTimeout);

    // Set a timeout to resume the animation after scrolling has stopped
    scrollTimeout = setTimeout(() => {
      carouselContainer.style.animationPlayState = "running";
    }, 1500); // Resume after 1.5 seconds of inactivity
  });
}

// ===========================
// Textarea Auto-Resize
// ===========================
const messageTextarea = document.getElementById("message");

if (messageTextarea) {
  messageTextarea.addEventListener("input", function () {
    // Reset the height to ensure it can shrink if text is deleted
    this.style.height = "auto";
    // Set the height to the scroll height, which represents the content height
    this.style.height = `${this.scrollHeight}px`;
  });
}

// ===========================
// Form Validation & Submission with EmailJS
// ===========================
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const formData = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    eventType: document.getElementById("event-type").value,
    date: document.getElementById("date").value,
    // guests: document.getElementById("guests").value, // Removed as field is commented out in HTML
    message: document.getElementById("message").value,
  };

  // Validation
  if (
    !formData.name ||
    !formData.phone ||
    !formData.email ||
    !formData.message
  ) {
    showNotification("Please fill in all required fields", "error");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    showNotification("Please enter a valid email address", "error");
    return;
  }

  // Phone validation
  const phoneRegex = /^[0-9]{10}$/;
  const cleanPhone = formData.phone.replace(/\D/g, "");
  if (cleanPhone.length < 10) {
    showNotification("Please enter a valid phone number", "error");
    return;
  }

  // Update button state
  const submitBtn = contactForm.querySelector(".btn-submit");
  submitBtn.innerHTML =
    '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
  submitBtn.disabled = true;

  // Send email using EmailJS
  showNotification("Sending your request...", "info");

  // Debug log
  console.log("Attempting to send email with data:", {
    service: "service_yunhtzm",
    template: "template_25wyx6b",
    data: {
      from_name: formData.name,
      email: formData.email,
      event_type: formData.eventType,
    },
  });

  emailjs
    .send("service_yunhtzm", "template_25wyx6b", {
      name: formData.name,
      to_email: "genzeventsz@gmail.com",
      phone: formData.phone,
      email: formData.email,
      eventtype: formData.eventType,
      date: formData.date,

      message: formData.message,
      reply_to: formData.email, // Add this to enable direct reply
    })
    .then(function (response) {
      console.log("Email sent successfully!", response);
      showNotification(
        `Thank you ${formData.name}! Your event request has been sent. We will contact you soon at ${formData.email}`,
        "success"
      );
      contactForm.reset();

      // Store submission timestamp
      localStorage.setItem("lastFormSubmission", new Date().toISOString());
    })
    .catch(function (error) {
      console.error("Email sending failed:", error);
      let errorMessage = "Failed to send message. ";

      // More detailed error handling
      if (error.text) {
        errorMessage += error.text;
      } else if (error.message) {
        errorMessage += error.message;
      } else {
        errorMessage += "Please try again later.";
      }
      showNotification(errorMessage, "error");
    })
    .finally(function () {
      submitBtn.innerHTML =
        '<span>Submit Request</span><i class="fas fa-paper-plane"></i>';
      submitBtn.disabled = false;
    });
});

// ===========================
// Notification System
// ===========================
function showNotification(message, type) {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;

  // Choose icon based on notification type
  let icon = "exclamation-circle";
  let bgColor = "#ef4444";

  switch (type) {
    case "success":
      icon = "check-circle";
      bgColor = "#10b981";
      break;
    case "info":
      icon = "info-circle";
      bgColor = "#3b82f6";
      break;
    case "warning":
      icon = "exclamation-triangle";
      bgColor = "#f59e0b";
      break;
    case "error":
      icon = "exclamation-circle";
      bgColor = "#ef4444";
      break;
  }

  notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: ${bgColor};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        animation: slideIn 0.3s linear;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        font-weight: 600;
        min-width: 300px;
        max-width: 500px;
    `;

  document.body.appendChild(notification);

  // Auto remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s linear";
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Add notification animations
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===========================
// Scroll Animations
// ===========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "all 0.6s ease-out";
  observer.observe(section);
});

// Observe service cards
document.querySelectorAll(".service-card").forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = `all 0.5s ease-out ${index * 0.1}s`;
  observer.observe(card);
});

// ===========================
// Prevent Form Resubmission
// ===========================
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}

// ===========================
// Dynamic Year in Footer
// ===========================
const currentYear = new Date().getFullYear();
const footerText = document.querySelector(".footer-bottom p");
if (footerText) {
  footerText.innerHTML = footerText.innerHTML.replace("2025", currentYear);
}

console.log(
  "%c🎉 Genz Events Website Loaded Successfully! 🎉",
  "color: #d4af37; font-size: 16px; font-weight: bold;"
);
