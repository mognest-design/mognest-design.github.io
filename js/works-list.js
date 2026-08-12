document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('worksGrid');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (!grid || typeof worksData === 'undefined') return;

  const PER_PAGE = 16;
  let displayedCount = 0;

  function getDetailUrl(work) {
    return work.href ? work.href : `works-detail.html?id=${work.id}`;
  }

  function createCard(work) {
    const a = document.createElement('a');
    a.href = getDetailUrl(work);
    a.className = 'works-catalog__item';

    const thumb = document.createElement('div');
    thumb.className = 'works-catalog__thumb';

    if (work.image) {
      const img = document.createElement('img');
      img.src = work.image;
      img.alt = work.title;
      img.className = 'works-catalog__img';
      thumb.appendChild(img);
    }

    const tags = document.createElement('p');
    tags.className = 'works-catalog__tags';
    tags.textContent = work.tags;

    const title = document.createElement('h3');
    title.className = 'works-catalog__title';
    title.textContent = work.title;

    const category = document.createElement('p');
    category.className = 'works-catalog__category';
    category.textContent = work.category;

    a.appendChild(thumb);
    a.appendChild(tags);
    a.appendChild(title);
    a.appendChild(category);

    return a;
  }

  function renderNextPage() {
    const nextItems = worksData.slice(displayedCount, displayedCount + PER_PAGE);
    nextItems.forEach((work) => {
      grid.appendChild(createCard(work));
    });
    displayedCount += nextItems.length;

    if (displayedCount >= worksData.length) {
      loadMoreBtn.classList.add('is-hidden');
    }
  }

  renderNextPage();
  loadMoreBtn.addEventListener('click', renderNextPage);
});