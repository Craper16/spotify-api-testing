import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  Image,
  Stack,
  Text,
  Heading,
  Divider,
  CardFooter,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  SimpleGrid,
  Box,
  ModalFooter,
  Modal,
  ModalOverlay,
  useDisclosure,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Alert,
  Toast,
  useToast,
} from '@chakra-ui/react';
import { colors } from '../../helpers/consts';
import { HamburgerIcon } from '@chakra-ui/icons';
import { playlist } from '../../redux/playlists/playlistsActions';
import { addTrackToPlaylist } from '../../config/playlists/playlistsConfig';

interface props {
  name: string;
  artist: string;
  images: { width: number | null; url: string | null; height: number | null }[];
  duration: number;
  popularity: number;
  explicit: boolean;
  onGoToArtist: () => void;
  playlists: playlist[];
  trackId: string;
}

export const millisToMinutesAndSeconds = (millis: number) => {
  let minutes = Math.floor(millis / 60000);
  let seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ':' + (+seconds < 10 ? '0' : '') + seconds;
};

export default function Tracks({
  artist,
  images,
  name,
  popularity,
  duration,
  explicit,
  onGoToArtist,
  playlists,
  trackId,
}: props) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedPlaylistName, setSelectedPlaylistName] = useState('');
  const [playlistId, setPlaylistId] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSelectedPlaylistName('');
      setPlaylistId('');
    }
  }, [isOpen]);

  const handleAddToPlaylist = (playlistName: string) => {
    if (playlistId && trackId) {
      addTrackToPlaylist(playlistId, trackId);
      return toast({
        title: 'Success',
        description: `Added ${name} to ${playlistName}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
    return toast({
      title: 'Please enter a playlist',
      description: 'You must select a playlist',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Card
      maxW="sm"
      justifyContent="center"
      margin="auto"
      marginLeft="36%"
      marginTop={13}
      background={colors.primary}
    >
      <CardBody>
        <Image
          src={
            images.length !== 0
              ? images[0].url!
              : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIMAAACCCAMAAABSH4vxAAAAMFBMVEUiIyY+PkAREhMfICMYGRsxMTM5OTslJikoKSwzNDYsLTA3NzoqKy0uLzEdHiBAQEFuppyBAAACLElEQVR4nO3a0XaDIAwAUCyDIOD8/7+dnVu3SSJxB0K3kzxTvQ0QFTC38WFur3ZwvJibNYNDDWpQgxrUoAY1qEENalCDGlhh65fvabAGsvPTMtAQZj+t0xZxiOH9/z/CixsgfL+/uMGa4NJUhJwB8uLL+wsatvwTAAnDnv+VBHQ3QKDyL2QAlxiAXgZrskvraf57G+Bk/AkZwiVAH8P8BIZrHaGG5zD4/Qk2yuCTC9ZaN8yQlgB72xGGdbt/Nl9XFDf4FOHQVtaQYjDllcQMfo5AfEaIGPycj/kXNXi39f/5r7savMO6X9bgeL/qa+C1VYMa1KAGNahBDWpQw98zWMjx/tEzzvBYNfddv/3PDMcFK3lDnI4hbnAFQdyALRwKGxaEIGzAl3BlDchGUlMDQIhLDnBiyCihlcHeNyv32P8rZrDESnZqYoAiyWgecEJ1o5dliOUyGGYAwhAaGJCygxqI4TDXrs8wYIQrhrM1M6ahrP+UAa8O9TeNqoHoZPaYnBucfyDmG3duVgcDw0BtoKF5KBtzCFUDtYGG9/LxkbWwanDNQC3SE2c7fiB8dUawDFTZoSbcVtM/Gqwp8wRVAzUcTvoZskt+dswcMAxE2amUX8s4kMQ3UNWh6RmaX41J1oxrZ8AeFrX3gdYGKBPROAuMWl3MjNqprw4GE35kYr4w59oZtuL3qfBXZn1bw1YmFueWWHsn62voG2pQgxrUoAY1qEENalCDGv6J4Q0Nixio9hrgfwAAAABJRU5ErkJggg=='
          }
          borderRadius="lg"
        />
        <Stack
          mt="6"
          spacing="3"
        >
          <Heading size="md">{name}</Heading>
          <Text color={colors.secondary}>{artist}</Text>
          <Text
            color={colors.secondary}
          >{`Duration: ${millisToMinutesAndSeconds(duration)}`}</Text>
          {explicit && <Text color={colors.secondary}>{'Explicit'}</Text>}
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <SimpleGrid
          margin="auto"
          columns={2}
          spacing={20}
        >
          <Box>
            <Text color={colors.secondary}>{`Popularity: ${popularity}`}</Text>
          </Box>
          <Box>
            <Menu>
              <MenuButton
                backgroundColor={colors.primary}
                as={Button}
                rightIcon={<HamburgerIcon />}
              >
                More
              </MenuButton>
              <MenuList backgroundColor={colors.secondary}>
                <MenuItem
                  backgroundColor={colors.secondary}
                  justifyContent="center"
                >
                  <Button
                    onClick={onOpen}
                    variant="ghost"
                  >
                    Add to playlist
                  </Button>
                  <Modal
                    isCentered
                    onClose={onClose}
                    isOpen={isOpen}
                    motionPreset="slideInRight"
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader
                        color={colors.secondary}
                        backgroundColor={colors.primary}
                      >
                        Add to playlist
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody backgroundColor={colors.secondary}>
                        <SimpleGrid
                          columns={2}
                          marginBottom={4}
                        >
                          <Box>
                            <Text>Playlist</Text>
                          </Box>
                          <Box>Creator</Box>
                        </SimpleGrid>
                        {playlists.map((playlist) => (
                          <div
                            key={playlist.id}
                            onClick={() => {
                              setPlaylistId(playlist.id);
                              setSelectedPlaylistName(playlist.name);
                            }}
                          >
                            <SimpleGrid
                              columns={2}
                              marginBottom={2}
                            >
                              <Box
                                backgroundColor={
                                  playlistId === playlist.id
                                    ? colors.primary
                                    : colors.secondary
                                }
                              >
                                <Text
                                  color={
                                    playlistId === playlist.id
                                      ? colors.secondary
                                      : colors.primary
                                  }
                                >
                                  {playlist.name}
                                </Text>
                              </Box>
                              <Box
                                backgroundColor={
                                  playlistId === playlist.id
                                    ? colors.primary
                                    : colors.secondary
                                }
                              >
                                <Text
                                  color={
                                    playlistId === playlist.id
                                      ? colors.secondary
                                      : colors.primary
                                  }
                                >
                                  {playlist.owner.display_name}
                                </Text>
                              </Box>
                            </SimpleGrid>
                            <Divider />
                          </div>
                        ))}
                      </ModalBody>
                      <ModalFooter backgroundColor={colors.secondary}>
                        <Button
                          variant="ghost"
                          color={colors.primary}
                          onClick={() => {
                            handleAddToPlaylist(selectedPlaylistName);
                            setPlaylistId('');
                            setSelectedPlaylistName('');
                          }}
                        >
                          Add
                        </Button>
                        <Button
                          colorScheme="blackAlpha"
                          mr={3}
                          onClick={onClose}
                        >
                          Close
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </MenuItem>
                <MenuItem
                  backgroundColor={colors.secondary}
                  as={Button}
                  onClick={onGoToArtist}
                >
                  Go to artist
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </SimpleGrid>
      </CardFooter>
    </Card>
  );
}
