(function () {
   
    function createContactForm(containerId) {
      const container = document.getElementById(containerId);
      if (!container) {
        console.error('Container ID not found');
        return;
      }
 
     
      container.innerHTML = `
        <div class="contact-form-container" style="max-width: 500px; margin: 0 auto; padding: 20px;">
          <h2>Contact Us</h2>
          <form id="contactForm" style="display: flex; flex-direction: column; gap: 15px;">
            <div>
              <label for="name">Name:</label>
              <input type="text" id="name" name="name" style="width: 100%; padding: 8px; margin-top: 5px;" />
              <span id="nameError" style="color: red; font-size: 0.9em; display: none;"></span>
            </div>
            <div>
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" style="width: 100%; padding: 8px; margin-top: 5px;" />
              <span id="emailError" style="color: red; font-size: 0.9em; display: none;"></span>
            </div>
            <div>
              <label for="message">Message:</label>
              <textarea id="message" name="message" style="width: 100%; padding: 8px; margin-top: 5px; min-height: 100px;"></textarea>
              <span id="messageError" style="color: red; font-size: 0.9em; display: none;"></span>
            </div>
            <button type="submit" style="padding: 10px; background: #007bff; color: white; border: none; cursor: pointer;">Submit</button>
          </form>
          <p id="successMessage" style="color: green; display: none; margin-top: 10px;">Form submitted successfully!</p>
        </div>
      `;
 
     
      const form = document.getElementById('contactForm');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validateForm()) {
          submitForm();
        }
      });
    }
 
 
    function validateForm() {
      let isValid = true;
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
 
     
      resetErrors();
 
     
      if (name.length < 2) {
        showError('nameError', 'Name must be at least 2 characters long');
        isValid = false;
      }
 
     
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
      }
 
     
      if (message.length < 10) {
        showError('messageError', 'Message must be at least 10 characters long');
        isValid = false;
      }
 
      return isValid;
    }
 
 
    function showError(elementId, message) {
      const errorElement = document.getElementById(elementId);
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
 
   
    function resetErrors() {
      const errorElements = ['nameError', 'emailError', 'messageError'];
      errorElements.forEach(id => {
        const element = document.getElementById(id);
        element.textContent = '';
        element.style.display = 'none';
      });
    }
 
   
    function submitForm() {
      const successMessage = document.getElementById('successMessage');
      successMessage.style.display = 'block';
      document.getElementById('contactForm').reset();
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 3000);
    }
 
 
    window.createContactForm = createContactForm;
  })();
 
