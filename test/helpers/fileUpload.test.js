import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
  cloud_name: 'juanjo-storage',
  api_key: '518175265852768',
  api_secret: 'yfWcFKWPg2NkBwVkb8aNXhbK6rU',
  secure: true,
});

describe('Pruebas en fileUpload', () => {
  // https://www.crunchyroll.com/imgsrv/display/thumbnail/480x720/catalog/crunchyroll/323c82257b2f6567fabbb7bd55bfa753.jpe
  test('Debe de subir el archivo correctamente a cloudinary', async () => {
    const imageUrl =
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], 'Shingeki.jpg');

    const url = await fileUpload(file);
    expect(typeof url).toBe('string');

    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.png', '');
    //console.log(imageId);
    await cloudinary.api.delete_resources(['journal/' + imageId], {
      resource_type: 'image',
    });
  });

  test('Debe de retornar null', async () => {
    const file = new File([], 'Shingeki.jpg');

    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});
