import React from 'react';

import { Formik, Form } from 'formik';
import { createPlaylistValidations } from '../../validations/playlistsValidations';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Switch,
} from '@chakra-ui/react';
import { colors } from '../../helpers/consts';
import { useNavigate } from 'react-router';
import {
  createPlaylistData,
  createUserPlayList,
} from '../../config/playlists/playlistsConfig';
import { useAppDispatch } from '../../redux/hooks';
import { CreateUserPlaylist } from '../../redux/playlists/playlistsActions';
import { PLAYLISTS } from '../../helpers/pathsConsts';

export default function CreatePlaylist() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmitPlaylist = (values: createPlaylistData) => {
    dispatch(CreateUserPlaylist({ ...values }));
    navigate(PLAYLISTS);
  };

  return (
    <Formik
      initialValues={{ name: '', description: '', public: false }}
      validateOnMount={true}
      validationSchema={createPlaylistValidations}
      onSubmit={(values) => handleSubmitPlaylist({ ...values })}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        errors,
        values,
        touched,
        isValid,
      }) => (
        <Form
          onSubmit={handleSubmit}
          style={{
            margin: 'auto',
            justifyItems: 'center',
            alignItems: 'center',
            width: '50%',
          }}
        >
          <FormControl
            isRequired
            isInvalid={!!errors.name && touched.name}
          >
            <FormLabel
              color={colors.primary}
              textAlign="center"
              margin="15"
              htmlFor="name"
            >
              Playlist Name
            </FormLabel>
            <Input
              marginBottom={13}
              textColor={colors.primary}
              borderColor={colors.primary}
              focusBorderColor={colors.primary}
              id="name"
              value={values.name}
              onChange={handleChange('name')}
              onBlur={handleBlur('name')}
              type="text"
              placeholder="Name"
            />
            <FormErrorMessage marginBottom={10}>{errors.name}</FormErrorMessage>
          </FormControl>
          <FormControl
            isRequired
            isInvalid={!!errors.description && touched.description}
          >
            <FormLabel
              color={colors.primary}
              textAlign="center"
              margin="15"
              htmlFor="name"
            >
              Playlist Description
            </FormLabel>
            <Input
              marginBottom={13}
              textColor={colors.primary}
              borderColor={colors.primary}
              focusBorderColor={colors.primary}
              id="password"
              value={values.description}
              onChange={handleChange('description')}
              onBlur={handleBlur('description')}
              type="text"
              placeholder="Description"
            />
            <FormErrorMessage>{errors.description}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.public}>
            <FormLabel
              color={colors.primary}
              textAlign="center"
              margin="15"
            >
              {values.public === false ? 'Private' : 'Public'}
            </FormLabel>
            <Switch
              colorScheme="whatsapp"
              onChange={handleChange('public')}
            />
          </FormControl>
          <Button
            marginTop={25}
            padding={6}
            height={50}
            width="full"
            type="submit"
            background={colors.primary}
            textColor={colors.secondary}
            isDisabled={!isValid}
          >
            Create Playlist
          </Button>
        </Form>
      )}
    </Formik>
  );
}
