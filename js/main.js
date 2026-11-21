console.log('Файл main.js подключён');
console.log(products);
console.table(products);

function getProductTitles(products) {
  return products.map((product) => product.title);
}

const productTitles = getProductTitles(products);

console.log(productTitles);

function getAvailableProducts(products) {
  return products.filter((product) => product.isAvailable);
}

const availableProducts = getAvailableProducts(products);

console.table(availableProducts);

function searchProducts(products, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery === '') {
    return products;
  }

  return products.filter((product) => {
    return product.title.toLowerCase().includes(normalizedQuery);
  });
}

const searchResult = searchProducts(products, 'кофе');

console.table(searchResult);

function filterProductsByCategory(products, category) {
  if (category === 'all') {
    return products;
  }

  return products.filter((product) => {
    return product.category === category;
  });
}

const kitchenProducts = filterProductsByCategory(products, 'kitchen');

console.table(kitchenProducts);

function sortProductsByPrice(products, direction = 'asc') {
  const productsCopy = [...products];

  if (direction === 'desc') {
    return productsCopy.sort((a, b) => b.price - a.price);
  }

  return productsCopy.sort((a, b) => a.price - b.price);
}

const productsSortedByPrice = sortProductsByPrice(products, 'asc');

console.table(productsSortedByPrice);

function findProductById(products, id) {
  return products.find((product) => product.id === id);
}

const selectedProduct = findProductById(products, 3);

if (selectedProduct) {
  console.log(`Найден товар: ${selectedProduct.title}`);
} else {
  console.log('Товар не найден');
}

function calculateTotalPrice(products) {
  return products.reduce((sum, product) => {
    return sum + product.price;
  }, 0);
}

const totalPrice = calculateTotalPrice(products);

console.log(totalPrice);


function countAvailableProducts(products) {
  return products.filter((product) => product.isAvailable).length;
}

const availableCount = countAvailableProducts(products);

console.log(availableCount);

function calculateAveragePrice(products) {
  if (products.length === 0) {
    return 0;
  }

  const totalPrice = calculateTotalPrice(products);
  return Math.round(totalPrice / products.length);
}

const averagePrice = calculateAveragePrice(products);

console.log(averagePrice);

function getPreparedProducts(products, query, category, sortDirection) {
  let result = [...products];

  result = searchProducts(result, query);
  result = filterProductsByCategory(result, category);
  result = sortProductsByPrice(result, sortDirection);

  return result;
}

const preparedProducts = getPreparedProducts(products, 'ко', 'kitchen', 'asc');

console.table(preparedProducts);

const messageElement = document.querySelector('.js-message');
const productOutputElement = document.querySelector('.product-output');

if (messageElement) {
  messageElement.textContent = 'Массив товаров и функции обработки данных подключены.';
}

if (productOutputElement) {
  productOutputElement.textContent = [
    `Всего товаров: ${products.length}`,
    `Товаров в наличии: ${countAvailableProducts(products)}`,
    `Средняя цена: ${calculateAveragePrice(products)} руб.`,
    `Результатов поиска "ко": ${searchProducts(products, 'ко').length}`
  ].join('\n');
}