import React, { useEffect } from 'react';

import { Formik, Form } from 'formik';
import { createPlaylistValidations } from '../../validations/playlistsValidations';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Switch,
  Text,
} from '@chakra-ui/react';
import { colors } from '../../helpers/consts';
import { useNavigate } from 'react-router';
import { createPlaylistData } from '../../config/playlists/playlistsConfig';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { CreateUserPlaylist } from '../../redux/playlists/playlistsActions';
import { PLAYLISTS } from '../../helpers/pathsConsts';
import { resetIsSuccess } from '../../redux/playlists/playlistsSlice';

export default function CreatePlaylist() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isError, message, isLoading, isSuccess } = useAppSelector(
    (state) => state.playlists
  );

  const handleSubmitPlaylist = (values: createPlaylistData) => {
    dispatch(CreateUserPlaylist({ ...values }));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(PLAYLISTS);
      dispatch(resetIsSuccess());
    }
  }, [isSuccess, navigate]);

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
            isDisabled={!isValid || isLoading}
          >
            Create Playlist
          </Button>
          {isError && (
            <Text
              textAlign="center"
              color="tomato"
              marginTop={10}
            >
              {message || message.message}
            </Text>
          )}
        </Form>
      )}
    </Formik>
  );
}
