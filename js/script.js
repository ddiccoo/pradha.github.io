// ==========================================
// PRELOADER & TYPING EFFECT
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const textToType = "PRADHA INVITATION";
  const typewriterElem = document.getElementById("typewriter");
  const preloader = document.getElementById("preloader");
  const progressBar = document.querySelector(".loading-progress");

  let index = 0;
  const typingSpeed = 100; // Kecepatan mengetik per huruf (ms)

  // 1. Fungsi Mengetik Teks
  function typeText() {
    if (index < textToType.length) {
      typewriterElem.textContent += textToType.charAt(index);
      index++;

      // Update progress bar seiring ketikan
      if (progressBar) {
        const progressPercent = (index / textToType.length) * 100;
        progressBar.style.width = `${progressPercent}%`;
      }

      setTimeout(typeText, typingSpeed);
    } else {
      // Teks selesai diketik, beri jeda singkat lalu hilangkan preloader
      setTimeout(hidePreloader, 600);
    }
  }

  // 2. Fungsi Menghilangkan Preloader Smoothly
  function hidePreloader() {
    if (preloader) {
      preloader.classList.add("fade-out");

      // Hapus dari DOM setelah animasi fade-out CSS selesai
      setTimeout(() => {
        preloader.style.display = "none";
      }, 800);
    }
  }

  // Jalankan efek mengetik saat halaman mulai dimuat
  typeText();
});
// Script Slider Background Jumbotron
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
const slideInterval = 6000;

function nextSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}

setInterval(nextSlide, slideInterval);

// Script Infinite Loop Carousel untuk Section Pricing
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("pricingTrack");
  const prevBtn = document.getElementById("pricingPrevBtn");
  const nextBtn = document.getElementById("pricingNextBtn");

  if (!track || !prevBtn || !nextBtn) return;

  let isMoving = false;

  // Klik Panah Kanan (Next)
  nextBtn.addEventListener("click", () => {
    if (isMoving) return;
    isMoving = true;

    const firstCard = track.firstElementChild;
    const cardWidth = firstCard.offsetWidth + 24; // Card width + gap

    track.style.transition = "transform 0.4s ease-in-out";
    track.style.transform = `translateX(-${cardWidth}px)`;

    track.addEventListener("transitionend", function handleNext() {
      track.style.transition = "none";
      track.appendChild(firstCard);
      track.style.transform = "translateX(0)";
      isMoving = false;
      track.removeEventListener("transitionend", handleNext);
    });
  });

  // Klik Panah Kiri (Prev)
  prevBtn.addEventListener("click", () => {
    if (isMoving) return;
    isMoving = true;

    const lastCard = track.lastElementChild;
    const cardWidth = lastCard.offsetWidth + 24; // Card width + gap

    track.style.transition = "none";
    track.prepend(lastCard);
    track.style.transform = `translateX(-${cardWidth}px)`;

    void track.offsetWidth; // Trigger reflow

    track.style.transition = "transform 0.4s ease-in-out";
    track.style.transform = "translateX(0)";

    track.addEventListener("transitionend", function handlePrev() {
      isMoving = false;
      track.removeEventListener("transitionend", handlePrev);
    });
  });
});

// Script Smooth Section & Card Transition (Intersection Observer)
document.addEventListener("DOMContentLoaded", () => {
  // Animasi Section
  const sections = document.querySelectorAll("section");
  const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  sections.forEach((section) => sectionObserver.observe(section));

  // Animasi Staggered Tema & Pricing
  const cards = document.querySelectorAll(".theme-card, .pricing-card");
  const cardObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(
            () => {
              entry.target.classList.add("card-visible");
            },
            (index % 4) * 100,
          );
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  cards.forEach((card) => cardObserver.observe(card));
});
