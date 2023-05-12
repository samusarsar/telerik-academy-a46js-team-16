import { Heading, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getUsersByRole } from '../../services/users.service';
import UserFeed from './UserFeed';

import PropTypes from 'prop-types';

const UsersList = ({ roleType }) => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        getUsersByRole({ value: roleType })
            .then((data) => {
                setUsers(Object.values(data));
            })
            .catch(() => setUsers([]));
    });

    if (users) {
        return (
            <VStack align='center' bg='white' borderRadius='10px' p='20px' boxShadow='md' w='50%'>
                <Heading size='md'>{roleType === 'wantAdmin' ? 'Admin Applicants:' : 'Blocked Users'}</Heading>
                <UserFeed users={users} roleType={roleType} />
            </VStack>);
    };

    return null;
};

UsersList.propTypes = {
    roleType: PropTypes.oneOf([null, 'base', 'wantAdmin', 'admin', 'blocked']),
};

export default UsersList;
