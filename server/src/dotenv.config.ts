import { config } from 'dotenv';
import * as fs from 'fs';

export const dotenvConfig = () => {
  const envFile = '.env';

  if (fs.existsSync(envFile)) {
    const envConfig = config({ path: envFile });
    if (envConfig.error) {
      throw new Error(`Failed to load env file ${envFile}`);
    }
  }
};
