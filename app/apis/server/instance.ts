import ky from 'ky';

export const serverAPI = ky.create({ prefixUrl: `${import.meta.env.VITE_SERVER_HOST}/api` });
