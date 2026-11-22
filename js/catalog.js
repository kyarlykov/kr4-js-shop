const productsContainer = document.querySelector('[data-products-container]');
const filtersForm = document.querySelector('#catalog-filters-form');
const searchInput = document.querySelector('#catalog-search');
const sortSelect = document.querySelector('#sort-select');
const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
const onlyFavoritesCheckbox = document.querySelector('#only-favorites');
const priceFromInput = document.querySelector('#price-from');
const priceToInput = document.querySelector('#price-to');
const resetFiltersBtn = document.querySelector('#reset-filters');

const catalogCount = document.querySelector('.catalog-count');
const catalogEmpty = document.querySelector('.catalog-empty');
const catalogNotice = document.querySelector('#catalog-notice');

// Элементы встроенной корзины в сайдбаре
const sidebarCartEmpty = document.querySelector('[data-sidebar-cart-empty]');
const sidebarCartList = document.querySelector('[data-sidebar-cart-list]');
const sidebarCartSummary = document.querySelector('[data-sidebar-cart-summary]');
const sidebarCartCount = document.querySelector('[data-sidebar-cart-count]');
const sidebarCartDiscount = document.querySelector('[data-sidebar-cart-discount]');
const sidebarCartTotal = document.querySelector('[data-sidebar-cart-total]');
const promoForm = document.querySelector('#promo-form');
const promoInput = document.querySelector('#promo-input');
const promoMessage = document.querySelector('#promo-message');

const catalogState = {
  query: '',
  categories: ['all'],
  onlyFavorites: false,
  priceFrom: null,
  priceTo: null,
  sort: 'default'
};

// Поиск по названию
function searchProducts(items, query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return items;
  return items.filter((product) => product.title.toLowerCase().includes(normalized));
}

// Фильтрация по чекбоксам категорий (all, popular, new)
function filterByCategories(items, categories) {
  if (categories.length === 0 || categories.includes('all')) {
    return items;
  }
  return items.filter((product) => categories.includes(product.category));
}

// Фильтрация по цене От и До
function filterByPrice(items, minPrice, maxPrice) {
  return items.filter((product) => {
    const actualPrice = getFinalProductPrice(product);
    if (minPrice !== null && !Number.isNaN(minPrice) && actualPrice < minPrice) return false;
    if (maxPrice !== null && !Number.isNaN(maxPrice) && actualPrice > maxPrice) return false;
    return true;
  });
}

// Фильтрация по избранному
function filterByFavorites(items, onlyFavorites) {
  if (!onlyFavorites) return items;
  const favoriteIds = getFavorites();
  return items.filter((product) => favoriteIds.includes(product.id));
}

// Сортировка по копии массива
function sortProducts(items, sortType) {
  const copy = [...items];

  if (sortType === 'price-asc') {
    return copy.sort((a, b) => getFinalProductPrice(a) - getFinalProductPrice(b));
  }
  if (sortType === 'price-desc') {
    return copy.sort((a, b) => getFinalProductPrice(b) - getFinalProductPrice(a));
  }
  if (sortType === 'title-asc') {
    return copy.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
  }
  return copy;
}

function getPreparedProducts(items, state) {
  let result = [...items];
  result = searchProducts(result, state.query);
  result = filterByCategories(result, state.categories);
  result = filterByPrice(result, state.priceFrom, state.priceTo);
  result = filterByFavorites(result, state.onlyFavorites);
  result = sortProducts(result, state.sort);
  return result;
}

function createProductCard(product) {
  const card = document.createElement('article');
  card.classList.add('product-card');

  if (product.discountPercent > 0) {
    card.classList.add('product-card--discount');
  } else if (product.category === 'popular') {
    card.classList.add('product-card--featured');
  }

  if (product.badge || product.discountPercent > 0) {
    const badge = document.createElement('span');
    badge.classList.add('product-card__badge');
    badge.textContent = product.badge || `−${product.discountPercent}%`;
    card.append(badge);
  }

  const image = document.createElement('img');
  image.classList.add('product-card__image');
  image.src = product.image;
  image.alt = product.title;
  image.loading = 'lazy';

  const title = document.createElement('h3');
  title.classList.add('product-card__title');
  title.textContent = product.title;

  const description = document.createElement('p');
  description.classList.add('product-card__description');
  description.textContent = product.description;

  const price = document.createElement('p');
  price.classList.add('product-card__price');
  const finalPrice = getFinalProductPrice(product);
  price.textContent =
    product.discountPercent > 0
      ? `Цена: ${finalPrice.toLocaleString('ru-RU')} руб. (вместо ${product.price.toLocaleString('ru-RU')} руб.)`
      : `Цена: ${product.price.toLocaleString('ru-RU')} руб.`;

  const meta = document.createElement('p');
  meta.classList.add('product-card__description');
  meta.textContent = `Рейтинг: ★ ${product.rating} • ${product.isAvailable ? 'В наличии' : 'Под заказ'}`;

  const actions = document.createElement('div');
  actions.classList.add('order-form__actions');
  actions.style.marginTop = 'auto';
  actions.style.flexWrap = 'wrap';
  actions.style.gap = '8px';

  const detailsLink = document.createElement('a');
  detailsLink.classList.add('button', 'button--secondary');
  detailsLink.href = `product.html?id=${product.id}`;
  detailsLink.textContent = 'Подробнее';

  const cartButton = document.createElement('button');
  cartButton.classList.add('button', 'button--primary');
  cartButton.type = 'button';
  cartButton.dataset.action = 'add-to-cart';
  cartButton.dataset.productId = String(product.id);
  cartButton.textContent = product.isAvailable ? 'В корзину' : 'Нет в наличии';
  if (!product.isAvailable) {
    cartButton.disabled = true;
  }

  const favButton = document.createElement('button');
  favButton.classList.add('button', 'button--secondary');
  favButton.type = 'button';
  favButton.dataset.action = 'toggle-favorite';
  favButton.dataset.productId = String(product.id);
  const favActive = isFavorite(product.id);
  favButton.textContent = favActive ? '★ В избранном' : '☆ В избранное';
  favButton.setAttribute('aria-pressed', String(favActive));

  actions.append(detailsLink, cartButton, favButton);
  card.append(image, title, description, price, meta, actions);

  return card;
}

function renderProducts(list) {
  if (!productsContainer) return;

  productsContainer.textContent = '';

  if (catalogCount) {
    catalogCount.textContent = `Найдено товаров: ${list.length}`;
  }

  if (catalogEmpty) {
    catalogEmpty.hidden = list.length > 0;
  }

  list.forEach((product) => {
    productsContainer.append(createProductCard(product));
  });
}

function syncStateFromInputs() {
  catalogState.query = searchInput ? searchInput.value : '';
  catalogState.sort = sortSelect ? sortSelect.value : 'default';
  catalogState.onlyFavorites = onlyFavoritesCheckbox ? onlyFavoritesCheckbox.checked : false;

  catalogState.priceFrom = priceFromInput && priceFromInput.value !== '' ? Number(priceFromInput.value) : null;
  catalogState.priceTo = priceToInput && priceToInput.value !== '' ? Number(priceToInput.value) : null;

  const checkedCategories = Array.from(categoryCheckboxes)
    .filter((cb) => cb.checked)
    .map((cb) => cb.value);

  catalogState.categories = checkedCategories.length > 0 ? checkedCategories : ['all'];
}

function updateCatalog() {
  syncStateFromInputs();
  const prepared = getPreparedProducts(products, catalogState);
  renderProducts(prepared);
}

// --- РЕНДЕР ВСТРОЕННОЙ КОРЗИНЫ В САЙДБАРЕ ---

function renderSidebarCart() {
  if (!sidebarCartList) return;

  const cart = getCart();
  const totals = getCartTotals();

  sidebarCartList.textContent = '';

  if (cart.length === 0) {
    if (sidebarCartEmpty) sidebarCartEmpty.hidden = false;
    if (sidebarCartSummary) sidebarCartSummary.hidden = true;
    return;
  }

  if (sidebarCartEmpty) sidebarCartEmpty.hidden = true;
  if (sidebarCartSummary) sidebarCartSummary.hidden = false;

  cart.forEach((item) => {
    const row = document.createElement('div');
    row.style.padding = '8px 0';
    row.style.borderBottom = '1px solid var(--color-surface-accent)';

    const name = document.createElement('p');
    name.style.margin = '0 0 4px';
    name.style.fontWeight = '700';
    name.textContent = item.title;

    const info = document.createElement('p');
    info.style.margin = '0 0 6px';
    info.style.fontSize = '14px';
    info.textContent = `${item.price.toLocaleString('ru-RU')} руб. × ${item.quantity} шт. = ${(item.price * item.quantity).toLocaleString('ru-RU')} руб.`;

    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.gap = '6px';

    const btnMinus = document.createElement('button');
    btnMinus.type = 'button';
    btnMinus.classList.add('button', 'button--secondary');
    btnMinus.textContent = '−';
    btnMinus.dataset.cartAction = 'decrease';
    btnMinus.dataset.productId = String(item.id);

    const btnPlus = document.createElement('button');
    btnPlus.type = 'button';
    btnPlus.classList.add('button', 'button--secondary');
    btnPlus.textContent = '+';
    btnPlus.dataset.cartAction = 'increase';
    btnPlus.dataset.productId = String(item.id);

    const btnDel = document.createElement('button');
    btnDel.type = 'button';
    btnDel.classList.add('button', 'button--secondary');
    btnDel.textContent = 'Удалить';
    btnDel.dataset.cartAction = 'remove';
    btnDel.dataset.productId = String(item.id);

    controls.append(btnMinus, btnPlus, btnDel);
    row.append(name, info, controls);
    sidebarCartList.append(row);
  });

  if (sidebarCartCount) sidebarCartCount.textContent = `${totals.totalCount} шт.`;
  if (sidebarCartDiscount) {
    sidebarCartDiscount.textContent =
      totals.discount > 0 ? `−${totals.discount.toLocaleString('ru-RU')} руб. (${totals.promoCode})` : '0 руб.';
  }
  if (sidebarCartTotal) sidebarCartTotal.textContent = `${totals.finalTotal.toLocaleString('ru-RU')} руб.`;
}

let noticeTimer = null;
function showCatalogNotice(text) {
  if (!catalogNotice) return;
  catalogNotice.textContent = text;
  catalogNotice.hidden = false;

  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => {
    catalogNotice.hidden = true;
  }, 3000);
}

// Обработчики чекбоксов категорий
categoryCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    if (checkbox.value === 'all' && checkbox.checked) {
      categoryCheckboxes.forEach((cb) => {
        if (cb.value !== 'all') cb.checked = false;
      });
    } else if (checkbox.value !== 'all' && checkbox.checked) {
      const allCb = Array.from(categoryCheckboxes).find((cb) => cb.value === 'all');
      if (allCb) allCb.checked = false;
    }

    const anyChecked = Array.from(categoryCheckboxes).some((cb) => cb.checked);
    if (!anyChecked) {
      const allCb = Array.from(categoryCheckboxes).find((cb) => cb.value === 'all');
      if (allCb) allCb.checked = true;
    }

    updateCatalog();
  });
});

if (searchInput) searchInput.addEventListener('input', updateCatalog);
if (sortSelect) sortSelect.addEventListener('change', updateCatalog);
if (onlyFavoritesCheckbox) onlyFavoritesCheckbox.addEventListener('change', updateCatalog);
if (priceFromInput) priceFromInput.addEventListener('input', updateCatalog);
if (priceToInput) priceToInput.addEventListener('input', updateCatalog);

if (filtersForm) {
  filtersForm.addEventListener('submit', (event) => {
    event.preventDefault();
    updateCatalog();
  });
}

if (resetFiltersBtn && filtersForm) {
  resetFiltersBtn.addEventListener('click', () => {
    filtersForm.reset();
    const allCb = Array.from(categoryCheckboxes).find((cb) => cb.value === 'all');
    if (allCb) allCb.checked = true;
    updateCatalog();
  });
}

if (productsContainer) {
  updateCatalog();

  productsContainer.addEventListener('click', (event) => {
    const cartBtn = event.target.closest('[data-action="add-to-cart"]');
    if (cartBtn) {
      const productId = Number(cartBtn.dataset.productId);
      const added = addToCart(productId);
      if (added) {
        showCatalogNotice(`Товар «${added.title}» добавлен в корзину.`);
      }
      return;
    }

    const favBtn = event.target.closest('[data-action="toggle-favorite"]');
    if (favBtn) {
      const productId = Number(favBtn.dataset.productId);
      const nowFav = toggleFavorite(productId);
      favBtn.textContent = nowFav ? '★ В избранном' : '☆ В избранное';
      favBtn.setAttribute('aria-pressed', String(nowFav));

      if (catalogState.onlyFavorites && !nowFav) {
        updateCatalog();
      }
    }
  });
}

if (sidebarCartList) {
  renderSidebarCart();
  document.addEventListener('woodspace:cart-updated', renderSidebarCart);

  sidebarCartList.addEventListener('click', (event) => {
    const actionBtn = event.target.closest('[data-cart-action]');
    if (!actionBtn) return;

    const id = Number(actionBtn.dataset.productId);
    const action = actionBtn.dataset.cartAction;

    if (action === 'increase') changeCartQuantity(id, 1);
    if (action === 'decrease') changeCartQuantity(id, -1);
    if (action === 'remove') removeFromCart(id);
  });
}

if (promoForm && promoInput) {
  const savedPromo = localStorage.getItem(STORAGE_KEYS.promo);
  if (savedPromo) promoInput.value = savedPromo;

  promoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const code = promoInput.value.trim().toUpperCase();

    if (code === 'WOOD15') {
      localStorage.setItem(STORAGE_KEYS.promo, code);
      if (promoMessage) promoMessage.textContent = 'Промокод WOOD15 применён (скидка 15%).';
    } else if (code === '') {
      localStorage.removeItem(STORAGE_KEYS.promo);
      if (promoMessage) promoMessage.textContent = 'Промокод сброшен.';
    } else {
      if (promoMessage) promoMessage.textContent = 'Неверный промокод. Попробуйте WOOD15.';
    }

    renderSidebarCart();
  });
}