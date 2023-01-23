import * as yup from 'yup';

export const createPlaylistValidations = yup.object().shape({
  name: yup.string().required('Please enter playlist name'),
  description: yup.string().required('Please enter playlist description'),
  public: yup.boolean(),
});
