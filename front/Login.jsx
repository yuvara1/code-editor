import React, { use, useState } from 'react';
import { useNavigate } from 'react-router';
import './styles/login.css';
import axios from 'axios';

function App() {
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');

     const Navigate = useNavigate()



     const handleSubmit = async (event) => {
          event.preventDefault();
          const response = await axios.get('http://localhost:5000/users?name=' + username);
          const users = response.data.map(user => ({
               username: user.Name,
               password: user.Password
          }));
          if (users.length === 0) {
               alert('Invalid username');
               return;
          }
          if (users[0].password !== password) {
               alert('Invalid password');
               return;
          }
          if (users[0].username === username && users[0].password === password) {
               Navigate('/access');
          }
     }

     return (
          <div id='body'>

               <form id='form' onSubmit={handleSubmit}>
                    <div className="form-group">
                         <label id="label" htmlFor="username">Username:</label>
                         <input
                              type="text"
                              id="username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              required
                         />
                    </div>
                    <div className="form-group">
                         <label id="label" htmlFor="password">Password:</label>
                         <input
                              type="password"
                              id="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                         />
                    </div>
                    <button id='button' type="submit">Login</button>
               </form>
          </div>
     );
}

export default App;