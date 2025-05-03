import ky from 'ky';
import { storage } from '@/App';

const prefixUrl = `https://hiperkitap-api.azurewebsites.net/`;

export const instance = ky.extend({
  headers: {
    Accept: 'application/json',
  },
  prefixUrl,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = storage.getString('token');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      (request, options, response) => {
        if (response.status === 401) {
          storage.delete('token');
          storage.delete('user');
          // Gerekirse login ekranına yönlendirme yapabilirsiniz
        }
        return response;
      },
    ],
  },
});
