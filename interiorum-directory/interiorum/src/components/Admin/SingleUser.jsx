import { Box, HStack, Heading, Text, AvatarGroup, Avatar, Spacer, Image, VStack, Button, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { ADMIN_ROLE, BASE_ROLE, BLOCKED_ROLE, WANT_ADMIN_ROLE } from '../../common/constants';
import { changeUserRole } from '../../services/users.service';
import handleUnblock from '../../common/helpers/handleUnblock';
import handleBlock from '../../common/helpers/handleBlock';
import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';
import { db } from '../../config/firebase-config';

const SingleUser = ({ user, roleType=null }) => {
    const toast = useToast();
    const [singleUser, setSingleUser] = useState(user);

    useEffect(() => {
        onValue(ref(db, `users/${user.handle}`), (snapshot) => {
            const data = snapshot.val();
            setSingleUser(data);
        });
    });

    const handleApprove = () => {
        changeUserRole({ handle: singleUser.handle, roleType: ADMIN_ROLE });
        toast({
            title: 'Applicant approved!',
            description: `The user ${singleUser.handle} has been approved as admin.`,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
            variant: 'subtle',
        });
    };

    return (
        <HStack align='center' p={4} w='100%'>
            <Image src='https://bit.ly/dan-abramov' w='30px' rounded='full'mx={2}/>
            <VStack align='start'>
                <Text fontSize='1.2em' fontWeight='700'>{singleUser.handle}</Text>
                <Text>{singleUser.firstName} {singleUser.lastName}</Text>
            </VStack>
            <Spacer />
            {roleType === WANT_ADMIN_ROLE ?
                <Button h='30px' fontSize='0.8em' colorScheme='purple' variant='outline' onClick={handleApprove}>Approve</Button> :
                roleType === BLOCKED_ROLE ?
                    <Button h='30px' fontSize='0.8em' colorScheme='telegram' variant='outline' onClick={() => handleUnblock({ handle: singleUser.handle, toast })}>Unblock</Button> :
                    (
                        <>
                            {singleUser.role === WANT_ADMIN_ROLE && <Button h='30px' fontSize='0.8em' colorScheme='purple' variant='outline' onClick={handleApprove}>Approve</Button>}
                            {singleUser.role === BLOCKED_ROLE &&
                            <Button h='30px' fontSize='0.8em' colorScheme='telegram' variant='outline' onClick={() => handleUnblock({ handle: singleUser.handle, toast })}>Unblock</Button>}
                            {(singleUser.role !== BLOCKED_ROLE && singleUser.role !== ADMIN_ROLE) &&
                            <Button h='30px' fontSize='0.8em' colorScheme='red' variant='outline' onClick={() => handleBlock({ handle: singleUser.handle, toast })}>Block</Button>}
                        </>
                    )}
        </HStack>
    );
};

export default SingleUser;
