import { HStack, Text, Spacer, VStack, Button, useToast, Badge, Flex, Avatar } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROLE, BASE_ROLE, BLOCKED_ROLE, WANT_ADMIN_ROLE } from '../../common/constants';
import { changeUserRole } from '../../services/users.service';
import handleUnblock from '../../common/helpers/handleUnblock';
import handleBlock from '../../common/helpers/handleBlock';
import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { db } from '../../config/firebase-config';

import PropTypes from 'prop-types';

const SingleUser = ({ user, roleType=null }) => {
    const toast = useToast();
    const [singleUser, setSingleUser] = useState(user);

    const navigate = useNavigate();
    useEffect(() => {
        return onValue(ref(db, `users/${user.handle}`), (snapshot) => {
            const data = snapshot.val();
            setSingleUser(data);
        });
    }, [user]);

    const handleApplication = (newRole) => {
        changeUserRole({ handle: singleUser.handle, roleType: newRole });
        toast({
            title: `Applicant ${newRole === ADMIN_ROLE ? 'approved' : 'rejected'}!`,
            description: `The user ${singleUser.handle} has been ${newRole === ADMIN_ROLE ? 'approved' : 'rejected'} as admin.`,
            status: `${newRole === ADMIN_ROLE ? 'success' : 'info'}`,
            duration: 3000,
            isClosable: true,
            position: 'top',
            variant: 'subtle',
        });
    };

    return (
        <HStack align='center' p={{ sm: 0, md: 4 }} flexWrap='no-wrap' gap={2}>
            <Avatar
                src={singleUser.avatarURL}
                name={`${singleUser.firstName} ${singleUser.lastName}`}
                size='md'
                mx={2}
                _hover={{ cursor: 'pointer' }}
                onClick={() => navigate(`../profile/${singleUser.handle}`)}/>
            <VStack align='start'>
                <HStack flexWrap='wrap'>
                    <Text fontSize='1.2em' fontWeight='700' _hover={{ cursor: 'pointer' }}
                        onClick={() => navigate(`../profile/${singleUser.handle}`)}>{singleUser.handle}</Text>
                    <Flex gap={2} flexDirection={roleType ? 'column' : 'row'}>
                        {(singleUser.role !== ADMIN_ROLE) && <Badge colorScheme='blue'>Newbie</Badge>}
                        {singleUser.role === ADMIN_ROLE && <Badge colorScheme='purple'>Admin</Badge>}
                        {singleUser.role === BLOCKED_ROLE && <Badge colorScheme='red'>Blocked</Badge>}
                    </Flex>
                </HStack>
                <Text>{singleUser.firstName} {singleUser.lastName}</Text>
            </VStack>
            <Spacer />
            {roleType === WANT_ADMIN_ROLE ?
                <VStack>
                    <Button h='30px' w='100%' fontSize='0.8em' colorScheme='purple' variant='outline' onClick={() => handleApplication(ADMIN_ROLE)}>Approve</Button>
                    <Button h='30px' w='100%' fontSize='0.8em' colorScheme='pink' variant='outline' onClick={() => handleApplication(BASE_ROLE)}>Reject</Button>
                </VStack> :
                roleType === BLOCKED_ROLE ?
                    <Button
                        h='30px'
                        fontSize='0.8em'
                        colorScheme='telegram'
                        variant='outline'
                        onClick={() => handleUnblock({ handle: singleUser.handle, toast })}>Unblock</Button> :
                    (
                        <>
                            {singleUser.role === WANT_ADMIN_ROLE &&
                                <VStack>
                                    <Button h='30px' w='100%' fontSize='0.8em' colorScheme='purple' variant='outline' onClick={() => handleApplication(ADMIN_ROLE)}>Approve</Button>
                                    <Button h='30px' w='100%' fontSize='0.8em' colorScheme='pink' variant='outline' onClick={() => handleApplication(BASE_ROLE)}>Reject</Button>
                                </VStack>}
                            {singleUser.role === BLOCKED_ROLE &&
                                <Button h='30px' fontSize='0.8em' colorScheme='telegram' variant='outline'
                                    onClick={() => handleUnblock({ handle: singleUser.handle, toast })}>Unblock</Button>}
                            {(singleUser.role === BASE_ROLE) &&
                                <VStack>
                                    <Button h='30px' w='100%' fontSize='0.8em' colorScheme='purple' variant='outline'
                                        onClick={() => handleApplication(ADMIN_ROLE)}>Make Admin</Button>
                                    <Button h='30px' w='100%' fontSize='0.8em' colorScheme='red' variant='outline'
                                        onClick={() => handleBlock({ handle: singleUser.handle, toast })}>Block</Button>
                                </VStack>}
                        </>
                    )}
        </HStack>
    );
};

SingleUser.propTypes = {
    user: PropTypes.object.isRequired,
    roleType: PropTypes.string,
};

export default SingleUser;
