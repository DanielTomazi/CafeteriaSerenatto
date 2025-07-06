document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const contactForm = document.getElementById('contato');
    const rangeInput = document.getElementById('customRange3');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 8px 32px rgba(129, 109, 79, 0.15)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(129, 109, 79, 0.1)';
        }
    });

    if (rangeInput) {
        const rangeValue = document.createElement('span');
        rangeValue.className = 'range-value';
        rangeValue.style.cssText = `
            position: absolute;
            background: var(--accent-gold);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            top: -35px;
            left: 50%;
            transform: translateX(-50%);
            pointer-events: none;
        `;
        
        rangeInput.style.position = 'relative';
        rangeInput.parentNode.style.position = 'relative';
        rangeInput.parentNode.appendChild(rangeValue);
        
        function updateRangeValue() {
            const value = rangeInput.value;
            const min = rangeInput.min || 0;
            const max = rangeInput.max || 5;
            const percentage = ((value - min) / (max - min)) * 100;
            
            rangeValue.textContent = `${value}/5`;
            rangeValue.style.left = `${percentage}%`;
            
            const stars = '★'.repeat(Math.floor(value)) + '☆'.repeat(5 - Math.floor(value));
            rangeValue.title = stars;
        }
        
        rangeInput.addEventListener('input', updateRangeValue);
        updateRangeValue();
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            button.textContent = 'Enviando...';
            button.disabled = true;
            button.style.opacity = '0.7';
            
            setTimeout(() => {
                button.textContent = 'Mensagem Enviada!';
                button.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.opacity = '1';
                    button.style.background = '';
                    this.reset();
                    
                    const alert = document.createElement('div');
                    alert.className = 'alert alert-success alert-dismissible fade show mt-3';
                    alert.innerHTML = `
                        <strong>Sucesso!</strong> Sua mensagem foi enviada com sucesso. Entraremos em contato em breve!
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    `;
                    this.parentNode.appendChild(alert);
                    
                    setTimeout(() => {
                        if (alert.parentNode) {
                            alert.remove();
                        }
                    }, 5000);
                }, 1500);
            }, 2000);
        });
    }

    document.querySelectorAll('.card').forEach((card) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
