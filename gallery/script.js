const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeBtn = document.querySelector(".close");

// Load artworks from JSON
fetch("artworks.json")
  .then(response => response.json())
  .then(artworks => {
    artworks.forEach(art => {
      const article = document.createElement("article");
      article.classList.add("art-item");

      article.innerHTML = `
        <img src="${art.image}" alt="${art.title}"
             data-title="${art.title}"
             data-desc="${art.desc}" />
        <div class="art-info">
          <h2>${art.title}</h2>
          <p>${art.desc}</p>
        </div>
      `;

      gallery.appendChild(article);
    });

    // Attach lightbox click events after images are loaded
    document.querySelectorAll(".gallery img").forEach(img => {
      img.addEventListener("click", () => {
        lightbox.style.display = "block";
        lightboxImg.src = img.src;
        lightboxCaption.innerHTML = `<h2>${img.dataset.title}</h2><p>${img.dataset.desc}</p>`;
      });
    });
  })
  .catch(err => console.error("Error loading artworks:", err));

// Close lightbox
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Close on click outside image
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});
