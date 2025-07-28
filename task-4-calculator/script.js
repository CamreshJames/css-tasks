// Calculator functionality and theme/layout switching
document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const themeSlider = document.getElementById('theme-slider');
    const themeThumb = document.querySelector('.theme-thumb');
    const layoutToggle = document.getElementById('layout-toggle');
    const gridCSS = document.getElementById('grid-css');
    const keys = document.querySelectorAll('.key');
    
    let currentInput = '399,981';
    let operator = null;
    let previousInput = null;
    let waitingForOperand = false;
    let isGridLayout = false;

    // Initialize display
    updateDisplay();

    // Theme switching functionality
    function updateTheme() {
        const themeValue = themeSlider.value;
        document.body.setAttribute('data-theme', themeValue);
        
        // Update thumb position
        const thumbPosition = ((themeValue - 1) / 2) * 100;
        themeThumb.style.transform = `translateX(${thumbPosition * 0.025}rem)`;
    }

    themeSlider.addEventListener('input', updateTheme);
    
    // Initialize theme
    updateTheme();

    // Layout switching functionality
    layoutToggle.addEventListener('click', function() {
        isGridLayout = !isGridLayout;
        
        if (isGridLayout) {
            gridCSS.disabled = false;
            layoutToggle.innerHTML = '<span class="layout-icon">⚏</span>';
            layoutToggle.title = 'Switch to Flex Layout';
        } else {
            gridCSS.disabled = true;
            layoutToggle.innerHTML = '<span class="layout-icon">⚏</span>';
            layoutToggle.title = 'Switch to Grid Layout';
        }
    });

    // Calculator functionality
    function updateDisplay() {
        display.textContent = formatNumber(currentInput);
    }

    function formatNumber(num) {
        if (num === '') return '0';
        
        // Handle decimal numbers
        if (num.includes('.')) {
            const parts = num.split('.');
            const integerPart = parts[0].replace(/,/g, '');
            const decimalPart = parts[1];
            
            if (integerPart === '') return '0.' + decimalPart;
            
            return Number(integerPart).toLocaleString() + '.' + decimalPart;
        }
        
        const cleanNum = num.toString().replace(/,/g, '');
        if (cleanNum === '' || cleanNum === '0') return '0';
        
        return Number(cleanNum).toLocaleString();
    }

    function inputNumber(num) {
        if (waitingForOperand) {
            currentInput = num;
            waitingForOperand = false;
        } else {
            if (num === '.' && currentInput.includes('.')) return;
            
            currentInput = currentInput === '0' ? num : currentInput + num;
        }
        updateDisplay();
    }

    function inputOperator(nextOperator) {
        const inputValue = parseFloat(currentInput.replace(/,/g, ''));

        if (previousInput === null) {
            previousInput = inputValue;
        } else if (operator) {
            const currentValue = previousInput || 0;
            const newValue = calculate(currentValue, inputValue, operator);

            currentInput = String(newValue);
            previousInput = newValue;
            updateDisplay();
        }

        waitingForOperand = true;
        operator = nextOperator;
    }

    function calculate(firstOperand, secondOperand, operator) {
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '*':
                return firstOperand * secondOperand;
            case '/':
                return firstOperand / secondOperand;
            default:
                return secondOperand;
        }
    }

    function performCalculation() {
        const inputValue = parseFloat(currentInput.replace(/,/g, ''));

        if (previousInput !== null && operator) {
            const newValue = calculate(previousInput, inputValue, operator);
            currentInput = String(newValue);
            previousInput = null;
            operator = null;
            waitingForOperand = true;
            updateDisplay();
        }
    }

    function reset() {
        currentInput = '0';
        previousInput = null;
        operator = null;
        waitingForOperand = false;
        updateDisplay();
    }

    function deleteLastDigit() {
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = '0';
        }
        updateDisplay();
    }

    // Key event listeners
    keys.forEach(key => {
        key.addEventListener('click', function() {
            // Add visual feedback
            this.style.transform = 'translateY(0.125rem)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);

            if (this.dataset.number !== undefined) {
                inputNumber(this.dataset.number);
            } else if (this.dataset.operator !== undefined) {
                inputOperator(this.dataset.operator);
            } else if (this.dataset.action !== undefined) {
                switch (this.dataset.action) {
                    case 'equals':
                        performCalculation();
                        break;
                    case 'reset':
                        reset();
                        break;
                    case 'delete':
                        deleteLastDigit();
                        break;
                }
            }
        });
    });

    // Keyboard support
    document.addEventListener('keydown', function(e) {
        const key = e.key;
        
        if (key >= '0' && key <= '9' || key === '.') {
            inputNumber(key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            inputOperator(key);
        } else if (key === 'Enter' || key === '=') {
            e.preventDefault();
            performCalculation();
        } else if (key === 'Escape' || key === 'c' || key === 'C') {
            reset();
        } else if (key === 'Backspace') {
            deleteLastDigit();
        }
    });

    // Theme keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key >= '1' && e.key <= '3') {
            themeSlider.value = e.key;
            updateTheme();
        }
        
        if (e.key === 'Tab' && e.shiftKey) {
            e.preventDefault();
            layoutToggle.click();
        }
    });
});