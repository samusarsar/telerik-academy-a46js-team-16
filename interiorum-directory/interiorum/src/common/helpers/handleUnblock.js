import { changeUserRole } from '../../services/users.service';
import { BASE_ROLE } from '../constants';

const handleUnblock = ({ handle, toast }) => {
    changeUserRole({ handle, roleType: BASE_ROLE });
    toast({
        title: 'User unblocked',
        description: `The user ${handle} has been unblocked!`,
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
        variant: 'subtle',
    });
};

export default handleUnblock;
