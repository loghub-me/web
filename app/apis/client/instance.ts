import ky, { type Options } from 'ky';

export let clientAPI = ky.create({ prefixUrl: '/api', credentials: 'include' });

export function extendClientAPIConfig(options: Options) {
  clientAPI = clientAPI.extend(options);
}
