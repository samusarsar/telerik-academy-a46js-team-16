import { Box, Heading, VStack, HStack, Text, Avatar } from '@chakra-ui/react';
import { users } from '../../../../data';
import { NavLink } from 'react-router-dom';

const TopCommentersList = () => {
    return (
        <Box bg={'white'} borderRadius={'10px'} p={'20px'} m={'20px'} boxShadow={'md'}>
            <Heading as='h5' size='sm'>Top Commenters</Heading>
            <VStack ml={4} align='left' py={2}>
                {users.map(user => {
                    return (
                        <HStack key={user.id} justify='left' py={0.5}>
                            <Avatar size='sm' name={user.firstName + ' ' + user.lastName} src='' />
                            <Text key={user.id} fontSize='0.9em'>{user.firstName} {user.lastName}</Text>
                        </HStack>
                    );
                })}
            </VStack>
        </Box>
    );
};

export default TopCommentersList;
