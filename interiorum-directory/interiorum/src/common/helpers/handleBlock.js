import { changeUserRole } from '../../services/users.service';
import { BLOCKED_ROLE } from '../constants';

const handleBlock = ({ handle, toast }) => {
    changeUserRole({ handle, roleType: BLOCKED_ROLE });
    toast({
        title: 'User blocked',
        description: `The user ${handle} has been blocked!`,
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
        variant: 'subtle',
    });
};

export default handleBlock;
