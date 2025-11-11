// Generate decorative string lights
const colors = [
  "#ff5757ff",
  "#fc9e41ff",
  "#f5f540ff",
  "#33f533ff",
  "#4ca2f9ff",
  "#fd379aff",
];
const lightsContainer = document.getElementById("lights");
const heroSection = document.querySelector(".hero-section");

if (lightsContainer && heroSection) {
  for (let i = 0; i < 15; i++) {
    const light = document.createElement("div");
    light.className = "light";
    const color = colors[i % colors.length];

    const threadLength = Math.floor(Math.random() * 31) + 90;
    const swingType = Math.floor(Math.random() * 3) + 1;
    const swingDuration = (Math.random() * 1.5 + 2.5).toFixed(1);

    light.style.setProperty("color", color);
    light.style.setProperty("height", `${threadLength}px`);
    light.style.setProperty(
      "animation",
      `swing-${swingType} ${swingDuration}s ease-in-out infinite alternate`
    );
    light.style.setProperty("animation-delay", `${Math.random() * -2}s`);

    lightsContainer.appendChild(light);
  }

  for (let i = 0; i < 20; i++) {
    const circle = document.createElement("div");
    circle.className = "blur-circle";
    const size = Math.random() * 60 + 20;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${Math.random() * 100}%`;
    circle.style.animationDuration = `${10 + Math.random() * 20}s`;
    heroSection.appendChild(circle);
  }
}

// Generate twinkling stars
if (heroSection) {
  for (let i = 0; i < 80; i++) {
    const star = document.createElement("div");
    star.className = "twinkle-star";
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    heroSection.appendChild(star);
  }
}
