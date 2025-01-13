// // src/components/RegisterForm.js

// import React, { useState } from 'react';
// import axios from 'axios';

// const RegisterForm = ({ toggleForm }) => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/auth/register', formData);
//       alert(response.data.message);  // You can customize this message
//     } catch (err) {
//       setError(err.response.data.error);
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       {error && <p>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Register</button>
//       </form>
//       <p>
//         Already have an account?{' '}
//         <button onClick={toggleForm}>Login</button>
//       </p>
//     </div>
//   );
// };

// export default RegisterForm;
