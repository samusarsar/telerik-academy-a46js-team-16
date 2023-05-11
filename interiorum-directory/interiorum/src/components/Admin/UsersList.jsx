import { Heading, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getUsersByRole } from '../../services/users.service';
import UserFeed from './UserFeed';

import PropTypes from 'prop-types';

const UsersList = ({ roleType }) => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        getUsersByRole({ value: roleType })
            .then((snapshot) => snapshot.val())
            .then((data) => {
                setUsers(data ? Object.values(data) : []);
            });
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
    roleType: PropTypes.oneOf([null, 'admin', 'blocked']),
};

export default UsersList;
