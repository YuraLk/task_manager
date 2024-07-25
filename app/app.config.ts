import 'ts-node/register'; // Add this to import TypeScript files
import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'Task Manager',
  version: process.env.PROJECT_VERSION || '1.0.0',
  slug: 'task-manager',
};

export default config;
