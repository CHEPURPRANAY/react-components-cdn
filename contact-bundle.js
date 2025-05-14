(function () {
  const root = document.getElementById('contact-form-root');
  if (!root) return;

  // Inject CSS
  const style = document.createElement('style');
  style.textContent = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }
    body {
      background-color: #f8f9fa;
    }
    .d-flex { display: flex; }
    .justify-content-center { justify-content: center; }
    .align-items-center { align-items: center; }
    .min-vh-100 { min-height: 100vh; }
    .container { width: 100%; max-width: 800px; padding: 3rem 1rem; }
    .card {
      background-color: white;
      border-radius: 0.25rem;
      box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
      padding: 1.5rem;
    }
    .text-center { text-align: center; }
    .mb-4 { margin-bottom: 1.5rem; }
    .fw-bold { font-weight: 700; }
    h2 { color: #343a40; font-size: 2rem; }
    .row { display: flex; flex-wrap: wrap; gap: 1rem; }
    .col-12, .col-md-6 { flex: 1 1 100%; }
    @media (min-width: 768px) {
      .col-md-6 { flex: 1 1 48%; }
    }
    .form-label { margin-bottom: 0.5rem; display: block; }
    .form-control {
      display: block;
      width: 100%;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      line-height: 1.5;
      color: #495057;
      background-color: #fff;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
    }
    .form-control:focus {
      border-color: #80bdff;
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
    .is-invalid { border-color: #dc3545; }
    .invalid-feedback {
      font-size: 0.875rem;
      color: #dc3545;
    }
    .mt-4 { margin-top: 1.5rem; }
    .btn {
      display: inline-block;
      font-weight: 400;
      text-align: center;
      border: 1px solid transparent;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      border-radius: 0.25rem;
      cursor: pointer;
      background-color: #007bff;
      color: #fff;
      border-color: #007bff;
    }
    .btn:hover {
      background-color: #0069d9;
      border-color: #0062cc;
    }
    .text-danger { color: #dc3545; }
  `;
  document.head.appendChild(style);

  // Field configuration
  const initialFields = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      required: true,
      validate: value => {
        if (!value) return 'First Name is required';
        if (!/^[A-Za-z]+$/.test(value)) return 'Only letters allowed';
        if (value.length < 2) return 'At least 2 characters';
        if (value.length > 50) return 'Max 50 characters';
        if (/\s/.test(value)) return 'No spaces allowed';
        return '';
      }
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      required: true,
      validate: value => {
        if (!value) return 'Last Name is required';
        if (!/^[A-Za-z]+$/.test(value)) return 'Only letters allowed';
        if (value.length < 2) return 'At least 2 characters';
        if (value.length > 50) return 'Max 50 characters';
        if (/\s/.test(value)) return 'No spaces allowed';
        return '';
      }
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'tel',
      required: true,
      validate: value => /^\d{10}$/.test(value) ? '' : 'Enter 10 digits only'
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email format'
    }
  ];

  let formData = {};
  let errors = {};

  const formContainer = document.createElement('div');
  formContainer.innerHTML = `
    <div class="d-flex justify-content-center align-items-center min-vh-100">
      <div class="container">
        <div class="card">
          <h2 class="text-center mb-4 fw-bold">Contact Us</h2>
          <form id="contactForm">
            <div class="row" id="formFields"></div>
            <div class="text-center mt-4">
              <button type="submit" class="btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
  root.appendChild(formContainer);

  function renderFields() {
    const formFields = formContainer.querySelector('#formFields');
    formFields.innerHTML = '';

    initialFields.forEach(field => {
      const wrapper = document.createElement('div');
      wrapper.className = 'col-md-6 col-12';

      const label = document.createElement('label');
      label.className = 'form-label';
      label.htmlFor = field.name;
      label.innerHTML = field.label + (field.required ? ' <span class="text-danger">*</span>' : '');

      const input = document.createElement('input');
      input.type = field.type;
      input.name = field.name;
      input.className = 'form-control';
      input.value = formData[field.name] || '';
      input.required = field.required;

      if (errors[field.name]) {
        input.classList.add('is-invalid');
        const feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        feedback.textContent = errors[field.name];
        wrapper.appendChild(feedback);
      }

      input.addEventListener('input', handleChange);

      wrapper.appendChild(label);
      wrapper.appendChild(input);
      formFields.appendChild(wrapper);
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    formData[name] = value;

    const field = initialFields.find(f => f.name === name);
    errors[name] = field.validate ? field.validate(value) : '';

    renderFields();
  }

  function handleSubmit(e) {
    e.preventDefault();
    errors = {};

    initialFields.forEach(field => {
      const value = formData[field.name] || '';
      if (field.required && !value) {
        errors[field.name] = `${field.label} is required`;
      } else if (field.validate) {
        errors[field.name] = field.validate(value);
      }
    });

    renderFields();

    if (Object.values(errors).every(err => !err)) {
      alert('Form submitted successfully!');
      console.log('Form Data:', formData);
    }
  }

  formContainer.querySelector('#contactForm').addEventListener('submit', handleSubmit);
  renderFields();
})();
