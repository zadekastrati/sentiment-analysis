// // src/components/LoginForm.js

// import React, { useState } from 'react';
// import axios from 'axios';

// const LoginForm = ({ toggleForm }) => {
//   const [formData, setFormData] = useState({
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
//       const response = await axios.post('/api/auth/login', formData);
//       alert(response.data.message);  // You can customize this message
//       localStorage.setItem('token', response.data.token);  // Save the token
//     } catch (err) {
//       setError(err.response.data.error);
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {error && <p>{error}</p>}
//       <form onSubmit={handleSubmit}>
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
//         <button type="submit">Login</button>
//       </form>
//       <p>
//         Don't have an account?{' '}
//         <button onClick={toggleForm}>Register</button>
//       </p>
//     </div>
//   );
// };

// export default LoginForm;
