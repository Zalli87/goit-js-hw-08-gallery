import items from "../js/gallery-items.js";

const galleryContainerEl = document.querySelector(".js-gallery");
const modalEl = document.querySelector(".js-lightbox");
const modalImgEl = document.querySelector(".lightbox__image");
const closeModalBtn = document.querySelector(".lightbox__button");
const modalBackdrop = document.querySelector(".lightbox__overlay");

closeModalBtn.addEventListener("click", onCloseBtnClick);
modalBackdrop.addEventListener("click", onBackdropClick);

function onCloseBtnClick() {
  window.removeEventListener("keydown", onEscBtnPress);
  modalEl.classList.remove("is-open");
  modalImgEl.src = "";
  modalImgEl.alt = "";
}

function onEscBtnPress(event) {
  if (event.code === "Escape") {
    onCloseBtnClick();
  }
}
function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseBtnClick();
  }
}

function createGalleryItemsMarkup(items) {
  return items
    .map(({ original, preview, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join("");
}

const itemsMarkup = createGalleryItemsMarkup(items);

galleryContainerEl.insertAdjacentHTML("beforeend", itemsMarkup);
galleryContainerEl.addEventListener("click", onItemClick);

function onItemClick(event) {
  event.preventDefault();
  window.addEventListener("keydown", onEscBtnPress);
  if (event.target.nodeName !== "IMG") {
    return;
  }
  modalEl.classList.add("is-open");
  modalImgEl.src = event.target.dataset.source;
  modalImgEl.alt = event.target.alt;
}
