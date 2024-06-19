// src/controllers/authController.js
import jwt from 'jsonwebtoken';
import agents from '../utils/agents.js';

const SECRET_KEY = 'your_secret_key';

export const authenticateAgent = (req, res) => {
    const { email, password } = req.body;
    const agent = agents.find(agent => agent.email === email && agent.password === password);

    if (agent) {
        const token = jwt.sign({ email: agent.email }, SECRET_KEY, { expiresIn: '2m' });
        res.send(`
      <html>
        <body>
          <p>Email: ${agent.email}</p>
          <script>
            sessionStorage.setItem('token', '${token}');
            setTimeout(() => sessionStorage.removeItem('token'), 2 * 60 * 1000);
          </script>
          <a href="/auth/restricted">Go to restricted area</a>
        </body>
      </html>
    `);
    } else {
        res.status(401).send('Invalid credentials');
    }
};

export const restrictedRoute = (req, res) => {
    const { email } = req.user;
    res.send(`Welcome, ${email}`);
};
