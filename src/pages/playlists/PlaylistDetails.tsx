import {
  ArrowBackIcon,
  CalendarIcon,
  DeleteIcon,
  DragHandleIcon,
  TimeIcon,
} from '@chakra-ui/icons';
import {
  Spinner,
  Text,
  Image,
  SimpleGrid,
  Box,
  List,
  ListItem,
  Divider,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { millisToMinutesAndSeconds } from '../../components/Tracks/Tracks';
import { removeTracksFromPlaylist } from '../../config/playlists/playlistsConfig';
import { colors } from '../../helpers/consts';
import { ARTIST_DETAILS_FN, PLAYLISTS } from '../../helpers/pathsConsts';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  GetPlaylist,
  RemoveTrackFromPlaylist,
} from '../../redux/playlists/playlistsActions';
import { resetIsSuccess } from '../../redux/playlists/playlistsSlice';

export default function PlaylistDetails() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { playlistId } = useParams();

  const { playlist, isLoading, isError, message, isSuccess } = useAppSelector(
    (state) => state.playlists
  );

  useEffect(() => {
    if (playlistId || isSuccess) {
      dispatch(GetPlaylist(playlistId!));
      dispatch(resetIsSuccess());
    }
  }, [playlistId, dispatch, isSuccess]);

  if (isError) {
    return (
      <Text
        color="tomato"
        textAlign="center"
        fontWeight="bold"
      >
        {message || message.message}
      </Text>
    );
  }

  return (
    <>
      <Button
        leftIcon={<ArrowBackIcon />}
        colorScheme="whatsapp"
        textColor={colors.secondary}
        marginLeft={3}
        onClick={() => navigate(PLAYLISTS)}
      >
        Back
      </Button>
      <div>
        {isLoading ? (
          <Spinner
            size="xl"
            justifyContent="center"
            marginTop={20}
            alignItems="center"
            marginLeft="50%"
            color={colors.primary}
          />
        ) : (
          <>
            <SimpleGrid
              columns={2}
              style={{ justifyContent: 'center' }}
            >
              <Box>
                <Text
                  marginTop={150}
                  textAlign="center"
                  fontWeight="bold"
                  fontSize={50}
                  color={colors.primary}
                >
                  {playlist?.name}
                </Text>
                <Text
                  marginTop={13}
                  textAlign="center"
                  fontWeight="bold"
                  fontSize={25}
                  color={colors.primary}
                >
                  {playlist?.owner?.display_name}
                </Text>
              </Box>
              <Box>
                <Image
                  boxSize="sm"
                  src={
                    playlist?.images[0]?.url ||
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANUAAADTCAMAAAAhx6asAAAAMFBMVEUiIyY+PkASExQ0NDY6OjwmJykkJSgqKy4oKSwxMjQsLTA0NTc4ODowMDMnJys2NzjPLoA2AAAD9klEQVR4nO3d7XqiMBAFYC0QICDe/91Wd+sqKmSYTMoc95z/nScvH0lAkh6+PjGHvRtQJBfV4eNCFU6owglVOKEKJ1ThhCqcUIUTqnBCFU6owglVOKEKJ1ThhCqcUIUTqnBCFU6owglVOKEKJ1T9bkIcjsexVf2tT1WI1fEnUfP3/lQPomvqTlHDl+py1dXHp/SKOn5UzRvRNZWilg/VkghX1bTLIkxV01arIjxVEIiwVFIRjmqLCEO1VeRfFdp+s8i3Sivyq8oR+VSFLk/kT2Uh8qWyEnlSTaOVyJEqWpq8qFpblA9VGD5R1Zh1E1RRRRVV/6lqPHXTrc5nqIbYzOrAq+ohhpc60Kq6apu3dWBVz6JZHUhV3bdhtQ6c6tLVvRXN6kCpLiJZHRhVSjSrA6H6GY7kdbyrHocjeR3Pqlp6jl7qeFW9G47kdTyqloYjeR1vqrXhSF7Hl6rSi+Z1FH9cULVjHarKt8aqDlXlW2NVh6ryrbGqQ1X51ljVoap8a6zqUFW+NVZ1qCrfGqs6VJVvjVUdqsq3xqoOVeVbY1WHqvKtsapDVfnWWNWhqnxrrOpQVb41VnWoKt8aqzpUlW+NVR1XqtCdzuM4VnEKn6JqTo+/k9fVJ6i683EhuKqmWjIBq07LJlhVWDlRsKomsQYNUpX8nhBRlf5IElAlWIMGqOqTKECVZA0knEq0BhJOJVqDu58qTF2MXXP9InCDKohWS++jCvG+E0ddxVaukq0s3mOXqXbxeKdV6zOlWzQbneWplk0CVRCtvfj1fc7Wp6VJVSc6VWfN57sZqnb9WCdVsl0ITpqm6VWpRiVVgnnF5QLc/n3/IUO1+qRnp1KdKrUqibJRjbqP4pUqwT1holLtX6lVdYJO2aK30K5fUKnC4muuLar01GLQLspQqdI3lUSVHIV1/d81GpXk+pPMmBIHR49SqURdskC1fnRGPUqjEq6dFTxBrJ0s1UzpFoVKdFflPgtrnj/u2a6Sbk0kaddSZ1rrto/+l+0q6eJt0QD6ftrf5y2z06iEe2NJe7D4cpCGaTvjKdtVwm3M5NOCOHv0rPJNGpWsXz9uuTNC24+XU1aPlXLe95xSKvVkxySlVJmdWGYK3Vd5w012yvSBObMdiyhG4fR4pXrbZRnFjCn5cjJ3ZpAfhSp1Ce6PKvAksvvld9CpVmeCmVsl2ET1hL/yuKd7f2cd23dMw849+i3K94FvH7LODu6ov1G/ke6efuSpe4vJtlEyfhOZTuOd5OY0/Unmb41h6rrJQ683z/7/+6VEqMIJVTihCidU4YQqnFCFE6pwQhVOqMIJVTihCidU4YQqnFCFE6pwQhVOqMIJVTihCidf39HXK73dLg4vAAAAAElFTkSuQmCC'
                  }
                />
              </Box>
            </SimpleGrid>
            <List
              marginTop={24}
              alignItems="center"
              textAlign="center"
            >
              {playlist?.tracks.items.length === 0 ? (
                <Text
                  color={colors.primary}
                  textAlign="center"
                  fontWeight="bold"
                >
                  Add to your playlist
                </Text>
              ) : (
                <ListItem>
                  <SimpleGrid columns={7}>
                    <Box>
                      <Text></Text>
                    </Box>
                    <Box>
                      <Text>TITLE</Text>
                    </Box>
                    <Box>
                      <Text>ARTIST</Text>
                    </Box>
                    <Box>
                      <Text>ALBUM</Text>
                    </Box>
                    <Box>
                      <CalendarIcon />
                    </Box>
                    <Box>
                      <TimeIcon />
                    </Box>
                    <Box>
                      <Text></Text>
                    </Box>
                  </SimpleGrid>
                </ListItem>
              )}
              {playlist?.tracks.items.map((track, i) => (
                <ListItem key={i}>
                  <SimpleGrid columns={7}>
                    <Box>
                      {track.track.album.images.length !== 0 && (
                        <Image
                          marginLeft={2}
                          boxSize="50px"
                          src={track.track.album.images[0].url}
                        />
                      )}
                    </Box>
                    <Box>
                      <Text
                        color="white"
                        marginTop={3}
                      >
                        {track.track.explicit
                          ? `E ${track.track.name}`
                          : `${track.track.name}`}
                      </Text>
                    </Box>
                    <Box>
                      <Text
                        color="white"
                        marginTop={3}
                      >
                        {track.track.artists[0].name}
                      </Text>
                    </Box>
                    <Box>
                      <Text
                        color="white"
                        marginTop={3}
                      >
                        {track.track.album.name}
                      </Text>
                    </Box>
                    <Box>
                      <Text
                        color="white"
                        marginTop={3}
                      >
                        {track.track.album.release_date}
                      </Text>
                    </Box>
                    <Box>
                      <Text
                        color="white"
                        marginTop={3}
                      >
                        {millisToMinutesAndSeconds(track.track.duration_ms)}
                      </Text>
                    </Box>
                    <Box>
                      <Menu>
                        <MenuButton
                          margin={3}
                          backgroundColor={colors.secondary}
                          as={Button}
                          alignItems="center"
                          justifyContent="center"
                          textAlign="center"
                          rightIcon={<DragHandleIcon />}
                        ></MenuButton>
                        <MenuList
                          borderColor="darkgray"
                          backgroundColor={colors.secondary}
                        >
                          <MenuItem
                            backgroundColor={colors.secondary}
                            onClick={() =>
                              dispatch(
                                RemoveTrackFromPlaylist({
                                  playlistId: playlist.id,
                                  data: [
                                    { uri: track.track.uri, positions: [i] },
                                  ],
                                })
                              )
                            }
                          >
                            Remove from playlist
                          </MenuItem>
                          <MenuItem
                            backgroundColor={colors.secondary}
                            onClick={() =>
                              navigate(
                                ARTIST_DETAILS_FN(track.track.artists[0].id)
                              )
                            }
                          >
                            Go to artist
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Box>
                  </SimpleGrid>
                  <Divider />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </div>
    </>
  );
}
