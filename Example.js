(function () {
  const { useState } = React;

  const ContactUs = () => {
    const initialFields = [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        required: true,
        validation: value => {
          if (!value) return 'First Name is required';
          if (!/^[A-Za-z]+$/.test(value)) return 'First Name must contain only letters';
          if (value.length < 2) return 'First Name must be at least 2 characters';
          if (value.length > 50) return 'First Name cannot exceed 50 characters';
          if (/\s/.test(value)) return 'First Name cannot contain spaces';
          return '';
        }
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        required: true,
        validation: value => {
          if (!value) return 'Last Name is required';
          if (!/^[A-Za-z]+$/.test(value)) return 'Last Name must contain only letters';
          if (value.length < 2) return 'Last Name must be at least 2 characters';
          if (value.length > 50) return 'Last Name cannot exceed 50 characters';
          if (/\s/.test(value)) return 'Last Name cannot contain spaces';
          return '';
        }
      },
      {
        name: 'phoneNumber',
        label: 'Phone Number',
        type: 'tel',
        required: true,
        validation: value =>
          /^\d{10}$/.test(value) ? '' : 'Invalid phone number (10 digits)'
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        validation: value =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address'
      }
    ];

    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });

      const field = initialFields.find(f => f.name === name);
      if (!value && field.required) {
        setErrors({ ...errors, [name]: `${field.label} is required` });
      } else if (field.validation) {
        setErrors({ ...errors, [name]: field.validation(value) });
      } else {
        setErrors({ ...errors, [name]: '' });
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const newErrors = {};
      initialFields.forEach(field => {
        const value = formData[field.name] || '';
        if (field.required && !value) {
          newErrors[field.name] = `${field.label} is required`;
        } else if (field.validation) {
          newErrors[field.name] = field.validation(value);
        }
      });
      setErrors(newErrors);

      if (Object.values(newErrors).every(error => !error)) {
        console.log('Form submitted:', formData);
      }
    };

    return React.createElement(
      'div',
      { className: 'd-flex justify-content-center align-items-center min-vh-100' },
      React.createElement(
        'div',
        { className: 'container py-5', style: { maxWidth: '800px' } },
        React.createElement(
          'div',
          { className: 'card shadow-sm p-4 bg-white rounded' },
          React.createElement(
            'h2',
            { className: 'text-center mb-4 fw-bold', style: { color: '#343a40', fontSize: '2rem' } },
            'Contact Us'
          ),
          React.createElement(
            'form',
            { onSubmit: handleSubmit },
            React.createElement(
              'div',
              { className: 'row g-3' },
              initialFields.map(field =>
                React.createElement(
                  'div',
                  { key: field.name, className: 'col-md-6 col-12' },
                  React.createElement(
                    'label',
                    { htmlFor: field.name, className: 'form-label' },
                    field.label,
                    field.required && React.createElement('span', { className: 'text-danger' }, '*')
                  ),
                  React.createElement('input', {
                    type: field.type,
                    className: `form-control ${errors[field.name] ? 'is-invalid' : ''}`,
                    id: field.name,
                    name: field.name,
                    value: formData[field.name] || '',
                    onChange: handleChange,
                    required: field.required
                  }),
                  errors[field.name] &&
                  React.createElement(
                    'div',
                    { className: 'invalid-feedback' },
                    errors[field.name]
                  )
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'text-center mt-4' },
              React.createElement(
                'button',
                { type: 'submit', className: 'btn btn-primary' },
                'Submit'
              )
            )
          )
        )
      )
    );
  };

  window.ContactUsComponent = ContactUs;
})();
