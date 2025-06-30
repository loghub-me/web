import ky, { type Options } from 'ky';

export let clientAPI = ky.create({ prefixUrl: import.meta.env.VITE_API_HOST, credentials: 'include' });

export function extendClientAPIConfig(options: Options) {
  clientAPI = clientAPI.extend(options);
}
