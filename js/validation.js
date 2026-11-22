const orderForm = document.querySelector('#order-form');
const orderCartSummary = document.querySelector('[data-order-cart-summary]');

// Выводим состав корзины из localStorage на странице оформления заказа
if (orderCartSummary && typeof getCart === 'function') {
  const cart = getCart();
  const totals = getCartTotals();

  if (cart.length > 0) {
    const itemsText = cart.map((item) => `${item.title} (${item.quantity} шт.)`).join(', ');
    orderCartSummary.textContent = `Ваш заказ из корзины: ${itemsText}. Итого к оплате: ${totals.finalTotal.toLocaleString('ru-RU')} руб.`;
    orderCartSummary.hidden = false;
  }
}

if (orderForm) {
  const nameInput = orderForm.querySelector('#order-name');
  const emailInput = orderForm.querySelector('#order-email');
  const phoneInput = orderForm.querySelector('#order-phone');
  const topicSelect = orderForm.querySelector('#order-topic');
  const agreementCheckbox = orderForm.querySelector('#order-agreement');

  const nameError = orderForm.querySelector('#order-name-error');
  const emailError = orderForm.querySelector('#order-email-error');
  const phoneError = orderForm.querySelector('#order-phone-error');
  const topicError = orderForm.querySelector('#order-topic-error');
  const agreementError = orderForm.querySelector('#order-agreement-error');
  const formMessage = document.querySelector('#form-message');

  // Автовыбор темы «Заказ товара», если корзина не пуста
  if (topicSelect && typeof getCart === 'function' && getCart().length > 0) {
    topicSelect.value = 'product';
  }

  function showError(input, errorEl, text) {
    if (errorEl) errorEl.textContent = text;
    if (input) input.setAttribute('aria-invalid', 'true');
  }

  function clearError(input, errorEl) {
    if (errorEl) errorEl.textContent = '';
    if (input) input.removeAttribute('aria-invalid');
  }

  function validateName() {
    if (!nameInput) return true;
    const value = nameInput.value.trim();
    if (value.length < 2) {
      showError(nameInput, nameError, 'Введите имя не короче 2 символов.');
      return false;
    }
    clearError(nameInput, nameError);
    return true;
  }

  function validateEmail() {
    if (!emailInput) return true;
    const value = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      showError(emailInput, emailError, 'Введите корректный e-mail (например, user@mail.ru).');
      return false;
    }
    clearError(emailInput, emailError);
    return true;
  }

  function validatePhone() {
    if (!phoneInput) return true;
    const digits = phoneInput.value.replace(/\D/g, '');
    if (digits.length !== 11 || !['7', '8'].includes(digits[0])) {
      showError(phoneInput, phoneError, 'Введите корректный номер телефона (11 цифр, начинается с +7 или 8).');
      return false;
    }
    clearError(phoneInput, phoneError);
    return true;
  }

  function validateTopic() {
    if (!topicSelect) return true;
    if (!topicSelect.value) {
      showError(topicSelect, topicError, 'Выберите тему заявки.');
      return false;
    }
    clearError(topicSelect, topicError);
    return true;
  }

  function validateAgreement() {
    if (!agreementCheckbox) return true;
    if (!agreementCheckbox.checked) {
      showError(agreementCheckbox, agreementError, 'Подтвердите согласие на обработку данных.');
      return false;
    }
    clearError(agreementCheckbox, agreementError);
    return true;
  }

  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const isValid =
      validateName() &
      validateEmail() &
      validatePhone() &
      validateTopic() &
      validateAgreement();

    if (!isValid) {
      if (formMessage) {
        formMessage.textContent = 'Пожалуйста, исправьте ошибки в форме.';
        formMessage.style.borderLeftColor = 'var(--color-danger)';
        formMessage.style.backgroundColor = '#fff5f5';
        formMessage.hidden = false;
      }
      return;
    }

    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const hadItems = typeof getCart === 'function' && getCart().length > 0;

    if (hadItems && typeof clearCart === 'function') {
      clearCart();
      if (orderCartSummary) {
        orderCartSummary.hidden = true;
      }
    }

    if (formMessage) {
      formMessage.textContent = hadItems
        ? `Заказ №${orderNumber} успешно оформлен! Корзина очищена, менеджер свяжется с вами.`
        : `Заявка №${orderNumber} успешно отправлена! Менеджер WoodSpace свяжется с вами.`;
      formMessage.style.borderLeftColor = 'var(--color-success)';
      formMessage.style.backgroundColor = 'var(--color-success-bg)';
      formMessage.hidden = false;
    }

    orderForm.reset();
  });

  if (nameInput) nameInput.addEventListener('input', validateName);
  if (emailInput) emailInput.addEventListener('input', validateEmail);
  if (phoneInput) phoneInput.addEventListener('input', validatePhone);
  if (topicSelect) topicSelect.addEventListener('change', validateTopic);
  if (agreementCheckbox) agreementCheckbox.addEventListener('change', validateAgreement);
}