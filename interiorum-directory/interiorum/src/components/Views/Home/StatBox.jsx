import { Card, CardBody, Heading, Text, Icon } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

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
        <Card
            direction={{ base: 'column', sm: 'column' }}
            margin='20px'
            align='center'
            size='lg'
            w='50%'
            h='180px'
        >
            <CardBody display='flex' flexDirection='column' align='center'>
                <Heading size='md'> {heading} </Heading>

                <Text py='2' fontSize='x-large' align='center'>
                    {text}
                </Text>
                <Icon as={icon} alignSelf='center' fontSize='xx-large'></Icon>
            </CardBody>
        </Card>
    );
};

export default StatBox;
