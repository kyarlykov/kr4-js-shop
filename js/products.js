const params = new URLSearchParams(window.location.search);
const requestedId = Number(params.get('id')) || 1;
const currentProduct = products.find((item) => item.id === requestedId) || products[0];

if (currentProduct) {
  document.title = `${currentProduct.title} — WoodSpace`;

  const breadcrumbEl = document.querySelector('.breadcrumbs__current');
  if (breadcrumbEl) {
    breadcrumbEl.textContent = currentProduct.title;
  }

  const titleEl = document.querySelector('.product__title');
  const descriptionEl = document.querySelector('.product__description');
  const priceEl = document.querySelector('.product__price');
  const badgeEl = document.querySelector('.product__badge');
  const imageEl = document.querySelector('.product__image');
  const specsBodyEl = document.querySelector('.product__specs-body');
  const addCartBtn = document.querySelector('#product-add-cart');
  const productNotice = document.querySelector('#product-notice');

  if (titleEl) titleEl.textContent = currentProduct.title;
  if (descriptionEl) descriptionEl.textContent = currentProduct.description;

  if (priceEl) {
    const finalPrice = getFinalProductPrice(currentProduct);
    priceEl.textContent =
      currentProduct.discountPercent > 0
        ? `Цена: ${finalPrice.toLocaleString('ru-RU')} руб. (со скидкой ${currentProduct.discountPercent}%)`
        : `Цена: ${currentProduct.price.toLocaleString('ru-RU')} руб.`;
  }

  if (imageEl) {
    imageEl.src = currentProduct.image;
    imageEl.alt = currentProduct.title;
  }

  if (badgeEl) {
    const label = currentProduct.badge || (currentProduct.discountPercent > 0 ? `−${currentProduct.discountPercent}%` : '');
    if (label) {
      badgeEl.textContent = label;
    } else {
      badgeEl.hidden = true;
    }
  }

  if (specsBodyEl && currentProduct.specs) {
    specsBodyEl.textContent = '';
    currentProduct.specs.forEach((row) => {
      const tr = document.createElement('tr');

      const tdName = document.createElement('th');
      tdName.setAttribute('scope', 'row');
      tdName.textContent = row[0];

      const tdValue = document.createElement('td');
      tdValue.textContent = row[1];

      tr.append(tdName, tdValue);
      specsBodyEl.append(tr);
    });
  }

  if (addCartBtn) {
    if (!currentProduct.isAvailable) {
      addCartBtn.disabled = true;
      addCartBtn.textContent = 'Нет в наличии';
    } else {
      addCartBtn.addEventListener('click', () => {
        addToCart(currentProduct.id);
        if (productNotice) {
          productNotice.textContent = `Товар «${currentProduct.title}» добавлен в корзину.`;
          productNotice.hidden = false;
        }
      });
    }
  }
}