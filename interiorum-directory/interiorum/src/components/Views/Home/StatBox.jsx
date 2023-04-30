import { Card, CardBody, Heading, Text, Icon, Box, HStack, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BRAND_COLOR_5, BRAND_COLOR_6 } from '../../../common/constants';

const StatBox = ({ heading, text, icon }) => {
    const [users, setUsers] = useState();
    const [posts, setPosts] = useState();

    // useEffect(() => {
    //     fetch()
    //     .then(response => response.json())
    //     .then(data => setUsers(data.length))


    //     .fetch()
    //     .then(response => response.json())
    //     .then(data => setPosts(data.length));
    // })

    return (
        <VStack
            size='sm'
            w='fit-content'
            py={4}
            px={12}
            rounded='md'
            bg='brand.200'
            color='brand.500'
            sx={{ transition: 'ease-in-out 0.2s' }}
            _hover={{ transform: 'scale(1.15)', background: `${BRAND_COLOR_6}`, color: `${BRAND_COLOR_5}` }}
        >
            <HStack justify='center'>
                <Heading size='md'> {heading} </Heading>
                <Icon as={icon} alignSelf='center' fontSize='x-large'/>
            </HStack>

            <Text fontSize='lg' align='center'>
                {text}
            </Text>
        </VStack>
    );
};

export default StatBox;
