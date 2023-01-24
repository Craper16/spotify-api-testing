import React from 'react';
import {
  Card,
  CardBody,
  Image,
  Stack,
  Text,
  Heading,
  Divider,
  CardFooter,
} from '@chakra-ui/react';
import { colors } from '../../helpers/consts';

interface props {
  name: string;
  artist: string;
  images: { width: number | null; url: string | null; height: number | null }[];
  duration: number;
  popularity: number;
  explicit: boolean;
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
}: props) {
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
        <Text color={colors.secondary}>{`Popularity: ${popularity}`}</Text>
      </CardFooter>
    </Card>
  );
}
