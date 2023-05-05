import { Box, HStack, Heading, Text, AvatarGroup, Avatar, Spacer, Image, VStack, Button, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { ADMIN_ROLE, WANT_ADMIN_ROLE } from '../../common/constants';
import { changeUserRole } from '../../services/users.service';
import handleUnblock from '../../common/helpers/handleUnblock';

const SingleUser = ({ user, roleType }) => {
    const toast = useToast();

    const handleApprove = () => {
        changeUserRole({ handle: user.handle, roleType: ADMIN_ROLE });
        toast({
            title: 'Applicant approved!',
            description: `The user ${user.handle} has been approved as admin.`,
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
            variant: 'subtle',
        });
    };

    return (
        <HStack align='center' p={4} >
            <Image src='https://bit.ly/dan-abramov' w='30px' rounded='full'mx={2}/>
            <VStack align='start'>
                <Text fontSize='1.2em' fontWeight='700'>{user.handle}</Text>
                <Text>{user.firstName} {user.lastName}</Text>
            </VStack>
            {roleType === WANT_ADMIN_ROLE ?
                <Button h='30px' fontSize='0.8em' onClick={handleApprove}>Approve</Button> :
                <Button h='30px' fontSize='0.8em' onClick={() => handleUnblock({ handle: user.handle, toast })}>Unblock</Button>}
        </HStack>
    );
};

export default SingleUser;
