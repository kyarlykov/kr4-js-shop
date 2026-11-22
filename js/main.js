// 1. Обновление счётчика корзины в шапке навигации на всех страницах
function updateHeaderCartBadge() {
  const navList = document.querySelector('.site-nav__list');
  if (!navList || typeof getCartTotals !== 'function') return;

  let cartLink = navList.querySelector('[data-nav-cart]');

  if (!cartLink) {
    const li = document.createElement('li');
    li.classList.add('site-nav__item');

    cartLink = document.createElement('a');
    cartLink.classList.add('site-nav__link');
    cartLink.href = 'catalog.html#sidebar-cart';
    cartLink.dataset.navCart = 'true';

    li.append(cartLink);
    navList.append(li);
  }

  const { totalCount } = getCartTotals();
  cartLink.textContent = totalCount > 0 ? `Корзина (${totalCount})` : 'Корзина';
}

document.addEventListener('DOMContentLoaded', updateHeaderCartBadge);
document.addEventListener('woodspace:cart-updated', updateHeaderCartBadge);

// 2. Динамический вывод популярных товаров на главной странице (index.html#popular)
const popularGrid = document.querySelector('#popular .products-grid');

if (popularGrid && typeof products !== 'undefined') {
  const popularItems = products.filter((item) => item.category === 'popular').slice(0, 3);
  popularGrid.textContent = '';

  popularItems.forEach((product) => {
    const card = document.createElement('article');
    card.classList.add('product-card', 'product-card--featured');

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
    const actualPrice = typeof getFinalProductPrice === 'function' ? getFinalProductPrice(product) : product.price;
    price.textContent = `Цена: ${actualPrice.toLocaleString('ru-RU')} руб.`;

    const actions = document.createElement('div');
    actions.classList.add('order-form__actions');
    actions.style.marginTop = 'auto';
    actions.style.gap = '8px';

    const link = document.createElement('a');
    link.classList.add('button', 'button--secondary');
    link.href = `product.html?id=${product.id}`;
    link.textContent = 'Подробнее';

    const addBtn = document.createElement('button');
    addBtn.classList.add('button', 'button--primary');
    addBtn.type = 'button';
    addBtn.textContent = 'В корзину';
    addBtn.addEventListener('click', () => {
      if (typeof addToCart === 'function') {
        addToCart(product.id);
        addBtn.textContent = 'Добавлено ✓';
        setTimeout(() => {
          addBtn.textContent = 'В корзину';
        }, 1500);
      }
    });

    actions.append(link, addBtn);
    card.append(image, title, description, price, actions);
    popularGrid.append(card);
  });
}

// 3. Модальное окно заявки на главной странице
const orderDialog = document.getElementById('order-dialog');
const closeDialogButton = document.getElementById('close-order-dialog');

if (closeDialogButton && orderDialog) {
  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });
}

// 4. Автопрокрутка карусели в блоке .hero
const heroCarousel = document.querySelector('.hero__carousel');

if (heroCarousel) {
  let scrollInterval = setInterval(() => {
    const slide = heroCarousel.querySelector('.hero__slide');
    if (!slide) return;

    const slideWidth = slide.offsetWidth + 16;

    if (heroCarousel.scrollLeft + heroCarousel.clientWidth >= heroCarousel.scrollWidth - 10) {
      heroCarousel.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      heroCarousel.scrollBy({ left: slideWidth, behavior: 'smooth' });
    }
  }, 3500);

  heroCarousel.addEventListener('mouseenter', () => {
    clearInterval(scrollInterval);
  });
}