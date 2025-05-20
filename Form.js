(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['react'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('react'));
  } else {
    global.Form = factory(global.React);
  }
}(this, function (React) {
  const { useState } = React;
 
  const Form = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: ''
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
 
    const validate = () => {
      const newErrors = {};
      // First name validation
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      } else if (formData.firstName.length < 2) {
        newErrors.firstName = 'First name must be at least 2 characters';
      } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName)) {
        newErrors.firstName = 'First name can only contain letters and spaces';
      }
      // Last name validation
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required';
      } else if (formData.lastName.length < 2) {
        newErrors.lastName = 'Last name must be at least 2 characters';
      } else if (!/^[a-zA-Z\s]+$/.test(formData.lastName)) {
        newErrors.lastName = 'Last name can only contain letters and spaces';
      }
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'A valid email is required';
      }
      return newErrors;
    };
 
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      if (submitted) {
        setErrors(validate());
      }
    };
 
    const handleSubmit = (e) => {
      e.preventDefault();
      const validationErrors = validate();
      setErrors(validationErrors);
      setSubmitted(true);
      if (Object.keys(validationErrors).length === 0) {
        console.log('Form submitted:', formData);
        alert('Form submitted successfully!');
        setFormData({ firstName: '', lastName: '', email: '' });
        setSubmitted(false);
      }
    };
 
    return (
<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
<h2 className="text-2xl font-bold mb-6 text-center">User Form</h2>
<form onSubmit={handleSubmit} className="space-y-4">
<div>
<label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
</label>
<input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter first name"
            />
            {errors.firstName && (
<p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
</div>
<div>
<label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
</label>
<input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter last name"
            />
            {errors.lastName && (
<p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
</div>
<div>
<label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
</label>
<input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter email"
            />
            {errors.email && (
<p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
</div>
<button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
>
            Submit
</button>
</form>
</div>
    );
  };
 
  return Form;
}));
