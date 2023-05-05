import { Box, Divider, HStack, Heading, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getUsersByChild } from '../../services/users.service';
import { ROLE_CHILD, WANT_ADMIN_ROLE } from '../../common/constants.js';
import SingleUser from './SingleUser';

const UsersList = ({ roleType }) => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        getUsersByChild({ child: ROLE_CHILD, value: roleType })
            .then((snapshot) => snapshot.val())
            .then((data) => {
                setUsers(data ? Object.values(data) : []);
            });
    });

    if (users) {
        return (
            <VStack align='center' bg='white' borderRadius='10px' p='20px' m='20px' boxShadow='md'>
                <Heading size='md'>{roleType === 'wantAdmin' ? 'Admin Applicants:' : 'Blocked Users'}</Heading>
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
                        <Text>There are currently no {roleType === WANT_ADMIN_ROLE ? 'admin applicant' : 'blocked'} users.</Text>}
                </Box>
            </VStack>);
    };
};

export default UsersList;
