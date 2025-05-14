(function () {
    function createContactForm(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('Container ID not found');
            return;
        }

        container.innerHTML = `
            <style>
                .contact-form-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    font-family: Arial, sans-serif;
                }
                .contact-form-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                    margin-bottom: 20px;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                }
                .form-group label {
                    margin-bottom: 5px;
                    font-weight: bold;
                }
                .form-group input, .form-group textarea {
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    box-sizing: border-box;
                }
                .error-message {
                    color: red;
                    font-size: 0.9em;
                    margin-top: 5px;
                    display: none;
                }
                .submit-btn {
                    padding: 10px;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                    grid-column: span 2;
                }
                .submit-btn:hover {
                    background: #0056b3;
                }
                .success-message {
                    color: green;
                    text-align: center;
                    margin-top: 20px;
                    display: none;
                    grid-column: span 2;
                }
                @media (max-width: 600px) {
                    .contact-form-grid {
                        grid-template-columns: 1fr;
                    }
                    .submit-btn {
                        grid-column: span 1;
                    }
                }
            </style>
            <div class="contact-form-container">
                <h2 style="text-align: center; margin-bottom: 20px;">Contact Us</h2>
                <form id="contactForm" novalidate>
                    <div class="contact-form-grid">
                        <div class="form-group">
                            <label for="firstName">First Name:</label>
                            <input type="text" id="firstName" name="firstName" />
                            <span id="firstNameError" class="error-message"></span>
                        </div>
                        <div class="form-group">
                            <label for="lastName">Last Name:</label>
                            <input type="text" id="lastName" name="lastName" />
                            <span id="lastNameError" class="error-message"></span>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone:</label>
                            <input type="tel" id="phone" name="phone" />
                            <span id="phoneError" class="error-message"></span>
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" />
                            <span id="emailError" class="error-message"></span>
                        </div>
                        <button type="submit" class="submit-btn">Submit</button>
                    </div>
                </form>
                <p id="successMessage" class="success-message">Form submitted successfully!</p>
            </div>
        `;

        const form = document.getElementById('contactForm');
        const inputs = form.querySelectorAll('input');

        // Add onblur validation for each input
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (validateForm()) {
                submitForm();
            }
        });
    }

    function validateField(input) {
        const value = input.value.trim();
        const fieldId = input.id;
        const errorElement = document.getElementById(`${fieldId}Error`);
        let isValid = true;
        let errorMessage = '';

        switch (fieldId) {
            case 'firstName':
                if (value.length < 2) {
                    errorMessage = 'First name must be at least 2 characters long';
                    isValid = false;
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    errorMessage = 'First name can only contain letters and spaces';
                    isValid = false;
                }
                break;
            case 'lastName':
                if (value.length < 2) {
                    errorMessage = 'Last name must be at least 2 characters long';
                    isValid = false;
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    errorMessage = 'Last name can only contain letters and spaces';
                    isValid = false;
                }
                break;
            case 'phone':
                const phoneRegex = /^\+?[\d\s-]{10,}$/;
                if (!phoneRegex.test(value)) {
                    errorMessage

                    errorMessage = 'Please enter a valid phone number (minimum 10 digits)';
                    isValid = false;
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
        }

        showError(`${fieldId}Error`, errorMessage);
        return isValid;
    }

    function validateForm() {
        let isValid = true;
        const inputs = document.querySelectorAll('#contactForm input');
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        return isValid;
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = message ? 'block' : 'none';
    }

    function resetErrors() {
        const errorElements = ['firstNameError', 'lastNameError', 'phoneError', 'emailError'];
        errorElements.forEach(id => showError(id, ''));
    }

    function submitForm() {
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
        document.getElementById('contactForm').reset();
        resetErrors();
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }

    window.createContactForm = createContactForm;
})();
