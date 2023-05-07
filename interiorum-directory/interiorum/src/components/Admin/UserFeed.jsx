import { Box, Divider, HStack, Text } from '@chakra-ui/react';
import SingleUser from './SingleUser';
import { WANT_ADMIN_ROLE } from '../../common/constants';
import { useState } from 'react';

const UserFeed = ({ users, roleType=null, searchTerm }) => {
    return (
        <Box bg='brand.600' w='100%' rounded='md'>
            {users.length ?
                users.map(u => {
                    return (
                        <>
                            <SingleUser key={u.uid} user={u} roleType={roleType} />
                            <HStack px={6}>
                                <Divider />
                            </HStack>
                        </>);
                }) :
                roleType ?
                    <Text align='center' py={2}>There are currently no {roleType === WANT_ADMIN_ROLE ? 'admin applicant' : 'blocked'} users.</Text> :
                    <Text align='center' py={2}>There are no users found for "{searchTerm}".</Text>}
        </Box>
    );
};

export default UserFeed;
