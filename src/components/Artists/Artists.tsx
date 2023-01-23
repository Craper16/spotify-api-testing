import {
  Card,
  Image,
  CardBody,
  Text,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { colors } from '../../helpers/consts';
interface props {
  followers: { total: number };
  images: { height: number | null; url: string | null; width: number | null }[];
  name: string;
  popularity: number;
}

export default function Artists({
  followers,
  images,
  name,
  popularity,
}: props) {
  return (
    <Card
      maxW='sm'
      justifyContent='center'
      marginLeft='35%'
      marginTop={13}
      background={colors.primary}
    >
      <CardBody>
        <Image
          src={
            images.length !== 0
              ? images[0].url!
              : 'https://i.scdn.co/image/ab6761610000e5eb3a21495eac7c635940a04c14'
          }
          borderRadius='lg'
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{name}</Heading>
          <Text color={colors.secondary}>{`Followers ${followers.total}`}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Text color={colors.secondary}>{`Popularity: ${popularity}`}</Text>
      </CardFooter>
    </Card>
  );
}
