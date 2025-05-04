import ky from 'ky';
import { storage } from '@/App';
import { StorageKeys } from '@/constants/storage';

const prefixUrl = `https://hiperkitap-api.azurewebsites.net/`;

export const instance = ky.extend({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  prefixUrl,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = storage.getString(StorageKeys.APP_TOKEN);
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      console.log('📤 Request:', {
          method: request.method,
          url: request.url,
          headers: Object.fromEntries(request.headers.entries()),
          body: request.body,
        });
        if (request.body) {
          const clonedRequest = request.clone();
          clonedRequest.text().then(body => {
            try {
              const parsedBody = JSON.parse(body);
              console.log('📤 Request Body:', parsedBody);
            } catch (e) {
              console.log('📤 Request Body (raw):', body);
            }
          }).catch(e => {
            console.log('📤 Error reading request body:', e);
          });
        } 
      },
    ],
    beforeError: [
      (error) => {
        console.log('📤 Request Error:', {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
        });
        return error;
      }
    ],
    afterResponse: [
      async (request, options, response) => {


        console.log("req")
        console.log('📥 Response:', {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
          headers: Object.fromEntries(response.headers.entries()),
        });

        try {
          const responseText = await response.clone().text();
          console.log('📥 Response Body:', responseText);
        } catch (e) {
          console.log('📥 Error reading response body:', e);
        }

        if (response.status === 401) {
          storage.delete(StorageKeys.TOKEN);
          storage.delete(StorageKeys.USER);
        }
        return response;
      },
    ],
  },
});
