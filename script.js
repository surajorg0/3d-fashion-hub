// Product Data - Clothing Only
const products = [
    {
        id: 1,
        name: "Believe T-Shirt - Black",
        category: "men",
        price: 499,
        emoji: "👕",
        image: "tshirt images/Belive-Black1.webp"
    },
    {
        id: 2,
        name: "Classic T-Shirt",
        category: "men",
        price: 599,
        emoji: "👕",
        image: "tshirt images/Belive-Black1.webp"
    },
    {
        id: 3,
        name: "Premium T-Shirt",
        category: "men",
        price: 699,
        emoji: "👕",
        image: "tshirt images/Belive-Black1.webp"
    },
    {
        id: 4,
        name: "Designer Dress",
        category: "women",
        price: 2499,
        emoji: "👗"
    },
    {
        id: 5,
        name: "Classic Suit",
        category: "men",
        price: 5999,
        emoji: "👔"
    },
    {
        id: 6,
        name: "Elegant Blouse",
        category: "women",
        price: 1499,
        emoji: "👚"
    },
    {
        id: 7,
        name: "Stylish Jacket",
        category: "men",
        price: 3999,
        emoji: "🧥"
    },
    {
        id: 8,
        name: "Fashionable Skirt",
        category: "women",
        price: 1799,
        emoji: "👗"
    },
    {
        id: 9,
        name: "Casual Jeans",
        category: "men",
        price: 1999,
        emoji: "👖"
    },
    {
        id: 10,
        name: "Summer Dress",
        category: "women",
        price: 2199,
        emoji: "👗"
    },
    {
        id: 11,
        name: "Formal Shirt",
        category: "men",
        price: 1299,
        emoji: "👔"
    },
    {
        id: 12,
        name: "Designer Top",
        category: "women",
        price: 1599,
        emoji: "👚"
    },
    {
        id: 13,
        name: "Denim Jacket",
        category: "men",
        price: 3499,
        emoji: "🧥"
    },
    {
        id: 14,
        name: "Elegant Gown",
        category: "women",
        price: 4499,
        emoji: "👗"
    }
];

let currentFilter = 'all';

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
    setupAnimations();
});

// Setup Event Listeners
function setupEventListeners() {
    // Filter Buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderProducts();
        });
    });

    // Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                navMenu.classList.remove('active');
            }
        });
    });

    // Contact Form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Navbar Scroll Effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 5px 30px rgba(255, 255, 255, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(255, 255, 255, 0.05)';
        }
        lastScroll = currentScroll;
    });
}

// Render Products
function renderProducts() {
    const filteredProducts = currentFilter === 'all' 
        ? products 
        : products.filter(p => p.category === currentFilter);

    productsGrid.innerHTML = '';

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-light);">No products found in this category.</p>';
        return;
    }

    filteredProducts.forEach((product, index) => {
        const productCard = createProductCard(product, index);
        productsGrid.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.animationDelay = `${index * 0.1}s`;

    // Check if product has an image, otherwise use emoji
    const imageContent = product.image 
        ? `<img src="${product.image}" alt="${product.name}" class="product-img">`
        : `<div class="product-emoji">${product.emoji}</div>`;

    card.innerHTML = `
        <div class="product-image">
            ${imageContent}
        </div>
        <div class="product-info">
            <div class="product-category">${product.category.toUpperCase()}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
            <button class="view-button" onclick="viewProduct(${product.id})">
                View
            </button>
        </div>
    `;

    // Add hover effect
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });

    return card;
}

// View Product Function - Redirects t-shirts to Shopify link
function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Check if product is a t-shirt (contains "T-Shirt" in name or uses 👕 emoji)
    if (product.name.toLowerCase().includes('t-shirt') || product.emoji === '👕') {
        // Redirect to Shopify t-shirt product page
        window.open('https://3dfashionhub.myshopify.com/products/believe-t-shirts-for-men-black-stylish-tshirts', '_blank');
    } else {
        // For other products, you can add specific links later
        console.log('View product:', productId, product.name);
    }
}

// Setup Animations
function setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('.products-section, .about-section, .contact-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - scrolled / window.innerHeight;
        }
    });

    // 3D Card Tilt Effect
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}
