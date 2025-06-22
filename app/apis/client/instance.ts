import ky, { type Options } from 'ky';

export let clientAPI = ky.create({ prefixUrl: import.meta.env.VITE_API_HOST, credentials: 'include' });
export let clientTaskAPI = ky.create({ prefixUrl: import.meta.env.VITE_TASK_API_HOST, credentials: 'include' });

export function extendClientAPIConfig(options: Options) {
  clientAPI = clientAPI.extend(options);
  clientTaskAPI = clientTaskAPI.extend(options);
}
