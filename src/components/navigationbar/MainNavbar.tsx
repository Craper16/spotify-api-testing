import React from 'react';
import { Box, Flex, HStack, Button, Avatar, Link } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router';
import { colors } from '../../helpers/consts';

interface MainNavprops {
  handleLogout: () => void;
  imageSource?: string | undefined;
}

const MainNavbar = ({ handleLogout, imageSource }: MainNavprops) => {
  const navigate = useNavigate();

  const access_token: string | null = localStorage.getItem('access_token');

  return (
    <>
      <Box
        bg={colors.secondary}
        px={4}
      >
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <HStack
            spacing={8}
            alignItems={'center'}
          >
            <Box
              fontSize={30}
              fontWeight="bold"
              color={colors.primary}
              onClick={() => navigate('/home')}
            >
              Spotify
            </Box>
          </HStack>
          <Flex alignItems={'center'}>
            {access_token ? (
              <>
                <Button
                  variant={'solid'}
                  colorScheme={'whatsapp'}
                  size={'sm'}
                  mr={4}
                  textColor={colors.secondary}
                  leftIcon={<ArrowBackIcon />}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <Avatar
                  size="sm"
                  src={imageSource ? imageSource : undefined}
                />
              </>
            ) : null}
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default MainNavbar;
