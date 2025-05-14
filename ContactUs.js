
 
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
 
    return (
<div className="d-flex justify-content-center align-items-center min-vh-100">
<div className="container py-5" style={{ maxWidth: '800px' }}>
<div className="card shadow-sm p-4 bg-white rounded">
<h2 className="text-center mb-4 fw-bold" style={{ color: '#343a40', fontSize: '2rem' }}>

                        Contact Us
</h2>
<form onSubmit={handleSubmit}>
<div className="row g-3">

                            {initialFields.map((field) => (
<div key={field.name} className="col-md-6 col-12">
<label htmlFor={field.name} className="form-label">

                                        {field.label} {field.required && <span className="text-danger">*</span>}
</label>
<input

                                        type={field.type}

                                        className={`form-control ${errors[field.name] ? 'is-invalid' : ''}`}

                                        id={field.name}

                                        name={field.name}

                                        value={formData[field.name] || ''}

                                        onChange={handleChange}

                                        required={field.required}

                                    />

                                    {errors[field.name] && (
<div className="invalid-feedback">

                                            {errors[field.name]}
</div>

                                    )}
</div>

                            ))}
</div>
<div className="text-center mt-4">
<button type="submit" className="btn btn-primary">

                                Submit
</button>
</div>
</form>
</div>
</div>
</div>

    );

};
 
export default ContactUs;
 
// ✅ Expose globally for CDN use

if (typeof window !== 'undefined') {

    window.ContactUsComponent = ContactUs;

}

 
