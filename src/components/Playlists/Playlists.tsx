import {
  Card,
  Image,
  CardBody,
  Text,
  Stack,
  Heading,
  Divider,
  CardFooter,
} from '@chakra-ui/react';
import React from 'react';
import { colors } from '../../helpers/consts';
interface props {
  images: { height: number | null; url: string | null; width: number | null }[];
  name: string;
  tracks: number;
  creator: string;
  onClick: () => void;
}

export default function PlaylistsItem({
  images,
  name,
  tracks,
  creator,
  onClick,
}: props) {
  return (
    <Card
      onClick={onClick}
      maxW="sm"
      justifyContent="center"
      marginLeft="35%"
      marginTop={13}
      background={colors.primary}
    >
      <CardBody>
        <Image
          boxSize="350px"
          src={
            images.length !== 0
              ? images[0].url!
              : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANUAAADTCAMAAAAhx6asAAAAMFBMVEUiIyY+PkASExQ0NDY6OjwmJykkJSgqKy4oKSwxMjQsLTA0NTc4ODowMDMnJys2NzjPLoA2AAAD9klEQVR4nO3d7XqiMBAFYC0QICDe/91Wd+sqKmSYTMoc95z/nScvH0lAkh6+PjGHvRtQJBfV4eNCFU6owglVOKEKJ1ThhCqcUIUTqnBCFU6owglVOKEKJ1ThhCqcUIUTqnBCFU6owglVOKEKJ1T9bkIcjsexVf2tT1WI1fEnUfP3/lQPomvqTlHDl+py1dXHp/SKOn5UzRvRNZWilg/VkghX1bTLIkxV01arIjxVEIiwVFIRjmqLCEO1VeRfFdp+s8i3Sivyq8oR+VSFLk/kT2Uh8qWyEnlSTaOVyJEqWpq8qFpblA9VGD5R1Zh1E1RRRRVV/6lqPHXTrc5nqIbYzOrAq+ohhpc60Kq6apu3dWBVz6JZHUhV3bdhtQ6c6tLVvRXN6kCpLiJZHRhVSjSrA6H6GY7kdbyrHocjeR3Pqlp6jl7qeFW9G47kdTyqloYjeR1vqrXhSF7Hl6rSi+Z1FH9cULVjHarKt8aqDlXlW2NVh6ryrbGqQ1X51ljVoap8a6zqUFW+NVZ1qCrfGqs6VJVvjVUdqsq3xqoOVeVbY1WHqvKtsapDVfnWWNWhqnxrrOpQVb41VnWoKt8aqzpUlW+NVR1XqtCdzuM4VnEKn6JqTo+/k9fVJ6i683EhuKqmWjIBq07LJlhVWDlRsKomsQYNUpX8nhBRlf5IElAlWIMGqOqTKECVZA0knEq0BhJOJVqDu58qTF2MXXP9InCDKohWS++jCvG+E0ddxVaukq0s3mOXqXbxeKdV6zOlWzQbneWplk0CVRCtvfj1fc7Wp6VJVSc6VWfN57sZqnb9WCdVsl0ITpqm6VWpRiVVgnnF5QLc/n3/IUO1+qRnp1KdKrUqibJRjbqP4pUqwT1holLtX6lVdYJO2aK30K5fUKnC4muuLar01GLQLspQqdI3lUSVHIV1/d81GpXk+pPMmBIHR49SqURdskC1fnRGPUqjEq6dFTxBrJ0s1UzpFoVKdFflPgtrnj/u2a6Sbk0kaddSZ1rrto/+l+0q6eJt0QD6ftrf5y2z06iEe2NJe7D4cpCGaTvjKdtVwm3M5NOCOHv0rPJNGpWsXz9uuTNC24+XU1aPlXLe95xSKvVkxySlVJmdWGYK3Vd5w012yvSBObMdiyhG4fR4pXrbZRnFjCn5cjJ3ZpAfhSp1Ce6PKvAksvvld9CpVmeCmVsl2ET1hL/yuKd7f2cd23dMw849+i3K94FvH7LODu6ov1G/ke6efuSpe4vJtlEyfhOZTuOd5OY0/Unmb41h6rrJQ683z/7/+6VEqMIJVTihCidU4YQqnFCFE6pwQhVOqMIJVTihCidU4YQqnFCFE6pwQhVOqMIJVTihCidf39HXK73dLg4vAAAAAElFTkSuQmCC'
          }
        />
        <Stack
          mt="6"
          spacing="3"
        >
          <Heading size="md">{name}</Heading>
          <Text
            color={colors.secondary}
            fontWeight="bold"
          >
            {creator}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Text color={colors.secondary}>{`Number of tracks: ${tracks}`}</Text>
      </CardFooter>
    </Card>
  );
}
