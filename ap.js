document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.modal-close');
    
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalCategory = document.getElementById('modal-category');
    const modalImage = document.getElementById('modal-image');
    const modalBadge = document.getElementById('modal-badge');
    
    // Находим активные кнопки "У кошик"
    const addToCartButtons = document.querySelectorAll('article button:not([disabled])');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const article = event.target.closest('article');
            
            // Получаем данные
            const categoryText = article.querySelector('p:nth-of-type(1)').textContent;
            const titleText = article.querySelector('h3').textContent;
            const priceText = article.querySelector('p:nth-of-type(2)').textContent;
            const imageElement = article.querySelector('img');
            const spanBadge = article.querySelector('span');
            
            // Заполняем модальное окно
            modalCategory.textContent = 'URBN · ' + categoryText;
            modalTitle.textContent = titleText;
            modalPrice.textContent = priceText;
            
            if(imageElement) {
                modalImage.src = imageElement.src;
                modalImage.alt = imageElement.alt;
            }
            
            // Если есть бейдж (Знижка)
            if (spanBadge && spanBadge.textContent.trim() !== '') {
                modalBadge.textContent = spanBadge.textContent;
                modalBadge.style.display = 'block';
            } else {
                modalBadge.style.display = 'none';
            }
            
            // Показываем
            modal.style.display = 'flex';
        });
    });

    // Закрытие
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (event) => {
        if (event.target === modal) modal.style.display = 'none';
    });
    
    // Счетчик количества
    let qtyValue = 1;
    const qtySpan = document.getElementById('qty-value');
    
    const resetQty = () => { qtyValue = 1; qtySpan.textContent = qtyValue; };
    addToCartButtons.forEach(btn => btn.addEventListener('click', resetQty));

    document.getElementById('qty-plus').addEventListener('click', () => {
        qtyValue++;
        qtySpan.textContent = qtyValue;
    });
    document.getElementById('qty-minus').addEventListener('click', () => {
        if(qtyValue > 1) {
            qtyValue--;
            qtySpan.textContent = qtyValue;
        }
    });

    // Переключение размеров
    const sizeBtns = document.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            sizeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
});