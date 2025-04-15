document.addEventListener('DOMContentLoaded', function() {
    // Ticker animation for exchange rates
    const tickerElement = document.querySelector('.ticker-content');
    if (tickerElement) {
        // Ensure ticker starts from the right edge and moves properly
        const tickerWidth = tickerElement.scrollWidth;
        const viewportWidth = document.documentElement.clientWidth;
        const duration = tickerWidth / 40; // Adjust speed as needed
        
        // Set animation properties
        tickerElement.style.animation = `ticker ${duration}s linear infinite`;
        tickerElement.style.right = '0'; // Ensure it starts at the right edge
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add hover effect for cards
    const cards = document.querySelectorAll('.game-card, .deal-card, .promo-card, .payment-card, .event-card, .sport-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.1)';
        });
    });

    // Update progress bars with animation
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease';
            bar.style.width = targetWidth;
        }, 300);
    });

    // Update exchange rates every minute (simulated)
    function updateExchangeRates() {
        const rates = [
            { currency: 'USD', min: 110.00, max: 110.50 },
            { currency: 'EUR', min: 121.20, max: 121.70 }
        ];
        
        // Generate random rates within ranges
        const updatedRates = rates.map(rate => {
            const value = (Math.random() * (rate.max - rate.min) + rate.min).toFixed(2);
            return `${rate.currency}: ${value} BDT`;
        }).join(' | ');
        
        // Update any elements with exchange rates
        const tickerContent = document.querySelector('.ticker-content span');
        if (tickerContent) {
            const content = tickerContent.textContent;
            // Update all currency rates
            let updatedContent = content;
            rates.forEach(rate => {
                const regex = new RegExp(`${rate.currency}: [\\d.]+ BDT`, 'g');
                const newValue = (Math.random() * (rate.max - rate.min) + rate.min).toFixed(2);
                updatedContent = updatedContent.replace(regex, `${rate.currency}: ${newValue} BDT`);
            });
            tickerContent.textContent = updatedContent;
        }
    }
    
    // Update rates every 60 seconds
    setInterval(updateExchangeRates, 60000);
}); 