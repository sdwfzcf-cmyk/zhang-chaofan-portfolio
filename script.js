const pageImage = n => `page-${String(n).padStart(2,"0")}.jpg`;
const allPages = [];

document.querySelectorAll(".pages").forEach(group => {
  const start = Number(group.dataset.start);
  const end = Number(group.dataset.end);
  for (let n = start; n <= end; n += 1) {
    const figure = document.createElement("figure");
    figure.className = "page";
    figure.dataset.page = n;
    figure.innerHTML = `<img src="${pageImage(n)}" alt="作品集第 ${n} 页" loading="lazy" decoding="async"><figcaption>${String(n).padStart(2,"0")} / 16</figcaption>`;
    group.appendChild(figure);
    allPages.push(n);
  }
});

const dialog = document.querySelector("#lightbox");
const image = dialog.querySelector("img");
const counter = dialog.querySelector(".counter");
let current = 0;

function show(index) {
  current = (index + allPages.length) % allPages.length;
  const n = allPages[current];
  image.src = pageImage(n);
  image.alt = `作品集第 ${n} 页放大图`;
  counter.textContent = `${String(n).padStart(2,"0")} / 16`;
}

document.querySelectorAll(".page").forEach((page, index) => page.addEventListener("click", () => {
  show(index);
  dialog.showModal();
}));
dialog.querySelector(".close").addEventListener("click", () => dialog.close());
dialog.querySelector(".prev").addEventListener("click", () => show(current - 1));
dialog.querySelector(".next").addEventListener("click", () => show(current + 1));
dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });
document.addEventListener("keydown", e => {
  if (!dialog.open) return;
  if (e.key === "ArrowLeft") show(current - 1);
  if (e.key === "ArrowRight") show(current + 1);
});
