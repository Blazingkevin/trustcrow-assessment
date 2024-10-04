import app from './app';
import dotenv from 'dotenv';
import { validateEnv } from './utils/validateEnv';

dotenv.config();

// before attempting to start server, validate env variables
validateEnv();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`TrustCrow Server is running on port ${PORT}`);
});
