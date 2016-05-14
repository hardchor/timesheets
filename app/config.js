import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  silent: true,
  path: path.resolve(__dirname, '../.env'),
});

const config = {
  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    scopes: ['user:email', 'notifications'] // Scopes limit access for OAuth tokens.
  }
};

export default config;
