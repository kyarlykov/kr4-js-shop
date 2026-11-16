console.log('Файл main.js подключён');
console.log(product);
console.table(product);

function formatPrice(price) {
  return `${price} руб.`;
}

console.log(formatPrice(product.price));

function formatPrice(price) {
  return `${price} руб.`;
}

console.log(formatPrice(product.price));

function calculateFinalPrice(price, discountPercent) {
  const discountValue = calculateDiscount(price, discountPercent);
  return price - discountValue;
}

const finalPrice = calculateFinalPrice(product.price, product.discountPercent);

console.log(finalPrice);

function getProductStatus(product) {
  if (product.isAvailable) {
    return 'В наличии';
  }

  return 'Нет в наличии';
}

console.log(getProductStatus(product));

function createProductSummary(product) {
  const finalPrice = calculateFinalPrice(product.price, product.discountPercent);
  const status = getProductStatus(product);

  return `${product.title}: ${formatPrice(finalPrice)}. Статус: ${status}.`;
}

const productSummary = createProductSummary(product);

console.log(productSummary);


const messageElement = document.querySelector('.js-message');
const productOutputElement = document.querySelector('.product-output');
messageElement.textContent = 'JavaScript подключён корректно.';
productOutputElement.textContent = productSummary;
