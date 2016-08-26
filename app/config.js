import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  silent: true,
  path: path.resolve(__dirname, '../.env'),
});

const config = {
  github: {
    authUrl: 'https://timesheets-app.herokuapp.com/github/auth',
    tokenUrl: 'https://timesheets-app.herokuapp.com/github/token',
    // Scopes limit access for OAuth tokens.
    scopes: [
      'repo',
    ],
  },
};

export default config;
