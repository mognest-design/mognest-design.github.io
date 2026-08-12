document.addEventListener('DOMContentLoaded', () => {
  if (typeof worksData === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id'));
  const work = worksData.find((w) => w.id === id);

  if (!work) {
    const detail = document.querySelector('.work-detail');
    if (detail) detail.innerHTML = '<p>作品が見つかりませんでした。</p>';
    return;
  }

  document.title = `${work.title} | Mognest-design Portfolio`;

  const tagsEl = document.getElementById('detailTags');
  const titleEl = document.getElementById('detailTitle');
  const categoryEl = document.getElementById('detailCategory');
  const descriptionEl = document.getElementById('detailDescription');
  const imgWrap = document.getElementById('detailImageWrap');
  const subImagesEl = document.getElementById('detailSubImages');

  if (tagsEl) tagsEl.textContent = work.tags;
  if (titleEl) titleEl.textContent = work.title;
  if (categoryEl) categoryEl.textContent = work.category;
  if (descriptionEl) descriptionEl.textContent = work.description || '';

  if (imgWrap) {
    if (work.image) {
      imgWrap.innerHTML = `<img src="${work.image}" alt="${work.title}" class="work-detail__gallery-main">`;
    } else {
      imgWrap.classList.add('work-detail__image-wrap--placeholder');
    }
  }

  if (subImagesEl && work.subImages && work.subImages.length > 0) {
    subImagesEl.innerHTML = work.subImages.map((img) => `
      <div class="work-detail-extra__item">
        <img src="${img.src}" alt="${img.caption || work.title}">
        ${img.caption ? `<p class="work-detail-extra__caption">${img.caption}</p>` : ''}
      </div>
    `).join('');
  }

  function getDetailUrl(w) {
    return w.href ? w.href : `works-detail.html?id=${w.id}`;
  }

  const currentIndex = worksData.findIndex((w) => w.id === id);
  const prevWork = currentIndex > 0 ? worksData[currentIndex - 1] : null;
  const nextWork = currentIndex < worksData.length - 1 ? worksData[currentIndex + 1] : null;

  const prevArrow = document.querySelector('.work-detail__nav-arrow--prev');
  const nextArrow = document.querySelector('.work-detail__nav-arrow--next');

  if (prevArrow) {
    if (prevWork) {
      prevArrow.href = getDetailUrl(prevWork);
      prevArrow.classList.remove('work-detail__nav-arrow--disabled');
    } else {
      prevArrow.removeAttribute('href');
      prevArrow.classList.add('work-detail__nav-arrow--disabled');
    }
  }

  if (nextArrow) {
    if (nextWork) {
      nextArrow.href = getDetailUrl(nextWork);
      nextArrow.classList.remove('work-detail__nav-arrow--disabled');
    } else {
      nextArrow.removeAttribute('href');
      nextArrow.classList.add('work-detail__nav-arrow--disabled');
    }
  }
});