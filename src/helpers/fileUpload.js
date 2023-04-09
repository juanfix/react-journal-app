export const fileUpload = async (file) => {
  //if (!file) throw new Error('You do not upload any file');
  if (!file) return null; // Only for testing

  const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/juanjo-storage/upload';
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'react-journal');

  try {
    const resp = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData,
    });

    if (!resp.ok) throw new Error('Upload error');

    const cloudinaryResp = await resp.json();
    return cloudinaryResp.secure_url;
  } catch (error) {
    //console.log(error);
    //throw Error(error.message);
    return null;
  }
};
