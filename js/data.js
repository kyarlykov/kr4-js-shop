const products = [
  {
    id: 1,
    title: 'Шкаф-купе «Верона»',
    category: 'new',
    price: 24900,
    discountPercent: 0,
    rating: 4.8,
    isAvailable: true,
    badge: 'Новинка',
    image: 'images/wardrobe-verona.jpg',
    description: 'Двухдверный шкаф-купе с зеркальной вставкой и двумя выдвижными ящиками.',
    specs: [
      ['Материал корпуса', 'ЛДСП 16 мм'],
      ['Материал фасада', 'Зеркало + ЛДСП'],
      ['Габариты (В×Ш×Г)', '240 × 160 × 60 см'],
      ['Количество дверей', '2'],
      ['Гарантия', '24 месяца']
    ]
  },
  {
    id: 2,
    title: 'Шкаф распашной «Классик»',
    category: 'popular',
    price: 18500,
    discountPercent: 10,
    rating: 4.6,
    isAvailable: true,
    badge: '',
    image: 'images/wardrobe-classic.jpg',
    description: 'Трёхдверный распашной шкаф с антресолью и штангой для одежды.',
    specs: [
      ['Материал корпуса', 'ЛДСП 16 мм'],
      ['Материал фасада', 'ЛДСП'],
      ['Габариты (В×Ш×Г)', '220 × 140 × 55 см'],
      ['Количество дверей', '3'],
      ['Гарантия', '12 месяцев']
    ]
  },
  {
    id: 3,
    title: 'Шкаф-купе «Модерн»',
    category: 'popular',
    price: 32000,
    discountPercent: 0,
    rating: 4.9,
    isAvailable: true,
    badge: 'Хит продаж',
    image: 'images/wardrobe-modern.jpg',
    description: 'Трёхдверный шкаф-купе с LED-подсветкой и зеркальной фасадной панелью.',
    specs: [
      ['Материал корпуса', 'МДФ 18 мм'],
      ['Материал фасада', 'Зеркало + МДФ'],
      ['Габариты (В×Ш×Г)', '250 × 180 × 65 см'],
      ['Количество дверей', '3'],
      ['Гарантия', '36 месяцев']
    ]
  },
  {
    id: 4,
    title: 'Шкаф-пенал «Компакт»',
    category: 'new',
    price: 15900,
    discountPercent: 0,
    rating: 4.5,
    isAvailable: true,
    badge: 'Новинка',
    image: 'images/wardrobe-compact.jpg',
    description: 'Узкий шкаф-пенал для прихожей или небольшой комнаты.',
    specs: [
      ['Материал корпуса', 'ЛДСП 16 мм'],
      ['Материал фасада', 'ЛДСП'],
      ['Габариты (В×Ш×Г)', '210 × 60 × 40 см'],
      ['Количество дверей', '1'],
      ['Гарантия', '12 месяцев']
    ]
  },
  {
    id: 5,
    title: 'Гардеробная система «Люкс»',
    category: 'popular',
    price: 45000,
    discountPercent: 15,
    rating: 5.0,
    isAvailable: true,
    badge: 'Скидка 15%',
    image: 'images/wardrobe-lux.jpg',
    description: 'Модульная гардеробная система с открытыми секциями, штангой и LED-подсветкой.',
    specs: [
      ['Материал корпуса', 'МДФ 18 мм'],
      ['Материал фасада', 'Открытые секции'],
      ['Габариты (В×Ш×Г)', '250 × 250 × 65 см'],
      ['Количество секций', '5'],
      ['Гарантия', '36 месяцев']
    ]
  },
  {
    id: 6,
    title: 'Шкаф угловой «Нордик»',
    category: 'new',
    price: 27400,
    discountPercent: 0,
    rating: 4.7,
    isAvailable: true,
    badge: 'Новинка',
    image: 'images/nordic.jpg',
    description: 'Вместительный угловой шкаф в скандинавском стиле со светлым древесным декором.',
    specs: [
      ['Материал корпуса', 'ЛДСП Egger 18 мм'],
      ['Материал фасада', 'МДФ матовый'],
      ['Габариты (В×Ш×Г)', '235 × 110 × 110 см'],
      ['Количество дверей', '2'],
      ['Гарантия', '24 месяца']
    ]
  },
  {
    id: 7,
    title: 'Шкаф-купе «Лофт Индустриал»',
    category: 'popular',
    price: 36500,
    discountPercent: 10,
    rating: 4.8,
    isAvailable: true,
    badge: '',
    image: 'images/industrial.jpg',
    description: 'Двухдверный шкаф-купе с чёрным матовым профилем и вставками под дуб.',
    specs: [
      ['Материал корпуса', 'ЛДСП 18 мм'],
      ['Профиль', 'Алюминий матовый'],
      ['Габариты (В×Ш×Г)', '245 × 170 × 60 см'],
      ['Количество дверей', '2'],
      ['Гарантия', '24 месяца']
    ]
  },
  {
    id: 8,
    title: 'Шкаф для прихожей «Практик»',
    category: 'wardrobes',
    price: 19200,
    discountPercent: 0,
    rating: 4.4,
    isAvailable: false,
    badge: '',
    image: 'images/praktik.jpg',
    description: 'Функциональный шкаф с обувницей, вешалкой и зеркалом в полный рост.',
    specs: [
      ['Материал корпуса', 'ЛДСП 16 мм'],
      ['Материал фасада', 'Зеркало + ЛДСП'],
      ['Габариты (В×Ш×Г)', '215 × 120 × 45 см'],
      ['Количество дверей', '2'],
      ['Гарантия', '12 месяцев']
    ]
  },
  {
    id: 9,
    title: 'Гардеробная «Ателье Мини»',
    category: 'new',
    price: 39800,
    discountPercent: 15,
    rating: 4.9,
    isAvailable: true,
    badge: 'Новинка',
    image: 'images/atelie.jpg',
    description: 'Компактная модульная гардеробная с выдвижными корзинами и брючницей.',
    specs: [
      ['Материал корпуса', 'МДФ 18 мм'],
      ['Фурнитура', 'С доводчиками'],
      ['Габариты (В×Ш×Г)', '240 × 200 × 60 см'],
      ['Количество секций', '4'],
      ['Гарантия', '36 месяцев']
    ]
  }
];

// --- ОБЩЕЕ СОСТОЯНИЕ МАГАЗИНА (localStorage + расчёты через reduce) ---

const STORAGE_KEYS = {
  cart: 'woodspace_cart',
  favorites: 'woodspace_favorites',
  promo: 'woodspace_promo'
};

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn('Ошибка чтения localStorage:', error);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Ошибка записи localStorage:', error);
  }
}

function getFinalProductPrice(product) {
  if (!product.discountPercent) {
    return product.price;
  }
  return Math.round(product.price * (1 - product.discountPercent / 100));
}

function getCart() {
  return readStorage(STORAGE_KEYS.cart, []);
}

function saveCart(cart) {
  writeStorage(STORAGE_KEYS.cart, cart);
  document.dispatchEvent(new CustomEvent('woodspace:cart-updated'));
}

function addToCart(productId) {
  const product = products.find((item) => item.id === Number(productId));
  if (!product || !product.isAvailable) {
    return null;
  }

  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: getFinalProductPrice(product),
      quantity: 1
    });
  }

  saveCart(cart);
  return product;
}

function changeCartQuantity(productId, delta) {
  let cart = getCart();
  const target = cart.find((item) => item.id === Number(productId));
  if (!target) return;

  target.quantity += delta;
  if (target.quantity <= 0) {
    cart = cart.filter((item) => item.id !== Number(productId));
  }

  saveCart(cart);
}

function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== Number(productId));
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(STORAGE_KEYS.promo);
  saveCart([]);
}

// Расчёт количества и суммы через reduce() (обязательный критерий КР №4)
function getCartTotals() {
  const cart = getCart();
  const promoCode = localStorage.getItem(STORAGE_KEYS.promo) || '';

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = promoCode === 'WOOD15' ? Math.round(subtotal * 0.15) : 0;
  const finalTotal = subtotal - discount;

  return {
    totalCount,
    subtotal,
    promoCode,
    discount,
    finalTotal
  };
}

function getFavorites() {
  return readStorage(STORAGE_KEYS.favorites, []);
}

function isFavorite(productId) {
  return getFavorites().includes(Number(productId));
}

function toggleFavorite(productId) {
  const id = Number(productId);
  let favorites = getFavorites();

  if (favorites.includes(id)) {
    favorites = favorites.filter((favId) => favId !== id);
  } else {
    favorites.push(id);
  }

  writeStorage(STORAGE_KEYS.favorites, favorites);
  return favorites.includes(id);
}