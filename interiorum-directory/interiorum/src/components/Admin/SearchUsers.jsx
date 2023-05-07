import { VStack, Heading, Input, HStack, Button, useDisclosure, Collapse, Box, Divider, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { getAllUsers } from '../../services/users.service';
import SingleUser from './SingleUser';
import UserFeed from './UserFeed';

const SearchUsers = () => {
    const [input, setInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [foundUsers, setFoundUsers] = useState([]);
    const [searching, setSearching] = useState(false);

    const { isOpen, onToggle } = useDisclosure();

    const handleSearch = () => {
        if (!input) {
            setSearchTerm('');
            setSearching(true);
            setFoundUsers([]);
            return;
        }

        getAllUsers()
            .then(snapshot => Object.values(snapshot.val()))
            .then(users => users.filter(user => {
                const fullName = `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`;
                const formattedSearchTerm = input.trim().toLowerCase();
                return (user.handle.toLowerCase()).includes(formattedSearchTerm) || (fullName.includes(formattedSearchTerm));
            }))
            .then(users => setFoundUsers(users))
            .catch(error => console.log(error.message));

        setSearchTerm(input);
        setInput('');
        setSearching(true);
    };

    return (
        <VStack bg='white' borderRadius='10px' p='20px' m='20px' boxShadow='md' w='80%' gap={3}>
            <Heading size='md'>Search Users:</Heading>
            <HStack>
                <Input type='text' placeholder='Search username or name' focusBorderColor='purple'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}></Input>
                <Button colorScheme='purple' onClick={handleSearch}>Search</Button>
            </HStack>
            <Box w='80%'>
                <Collapse in={searching} animateOpacity>
                    <UserFeed users={foundUsers} searchTerm={searchTerm} />
                </Collapse>
            </Box>

        </VStack>
    );
};

export default SearchUsers;
