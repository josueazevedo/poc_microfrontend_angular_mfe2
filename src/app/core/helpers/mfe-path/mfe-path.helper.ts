import { MFE_CONFIG } from '../../../config/mfe.config';
import { ROUTES_LIST } from '../../../config/router.config';

export function getCurrentPath(current_path: string): string {
  const path =
    current_path.replace(`/${MFE_CONFIG.name}`, '').replace('/', '') ||
    ROUTES_LIST.HOME;
  return path;
}
