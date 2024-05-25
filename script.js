let search = document.querySelector('.search-box');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('header');

document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
    navbar.classList.remove('active');
};

document.querySelector('#menu-icon').onclick = () => {
    navbar.classList.toggle('active');
    search.classList.remove('active');
};

window.onscroll = () => {
    navbar.classList.remove('active');
    search.classList.remove('active');
    document.getElementById('cart-receipt').style.display = 'none';
};

let cart = [];
const cartIcon = document.getElementById('cart-icon');
const cartReceipt = document.getElementById('cart-receipt');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.onclick = () => {
        const itemName = button.getAttribute('data-name');
        const itemPrice = parseFloat(button.getAttribute('data-price'));
        
        addToCart(itemName, itemPrice);
        updateCartReceipt();
        cartReceipt.style.display = 'block';
    };
});

cartIcon.onclick = () => {
    cartReceipt.style.display = cartReceipt.style.display === 'block' ? 'none' : 'block';
};

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
}

function updateCartReceipt() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const itemElement = document.createElement('li');
        itemElement.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        cartItemsContainer.appendChild(itemElement);
    });

    cartTotalElement.textContent = total.toFixed(2);
}

window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});
