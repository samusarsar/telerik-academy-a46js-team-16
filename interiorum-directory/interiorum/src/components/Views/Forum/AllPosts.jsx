import { Heading, Box, HStack, Input, Button, Text } from '@chakra-ui/react';

import { posts } from '../../../../data.js';
import ForumTabs from './ForumTabs.jsx';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';


const AllPosts = () => {

    // fetch all posts

    const [searchTerm, setSerchTerm] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();


    return (
        <Box bg={'white'} borderRadius={'10px'} p={'20px'} m={'20px'} boxShadow={'md'}>
            <Heading size='xl' mb='15px'>All posts</Heading>

            <HStack>
                <Input
                    onChange={(e) => setSerchTerm(e.target.value)}
                    value={searchTerm}
                    m='0px 0px 10px'
                    bg='white'
                    focusBorderColor='brand.400'
                    placeholder='Search all posts' />
                <Button onClick={() => {
                    setSearchParams({ search: searchTerm.toLocaleLowerCase() });
                    setSerchTerm('');
                }}>Search</Button>
            </HStack>
            <>{searchParams.get('search') ? (<Text p='15px' fontStyle='italic'>Search results for "{searchParams.get('search')}"</Text>) : null}</>
            <ForumTabs posts={searchParams.get('search') ? posts.filter(post => post.title.toLocaleLowerCase().includes(searchParams.get('search'))) : posts} />
        </Box>
    );
};

export default AllPosts;

