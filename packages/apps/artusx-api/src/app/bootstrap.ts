import path from 'path';
import { Application } from '@artusx/utils';

export async function start(options?: any) {
  const app = await Application.start({
    ...options,
    root: path.resolve(__dirname),
    configDir: 'config'
  });

  return app;
}
