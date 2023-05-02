import { useParams, useSearchParams } from 'react-router-dom';

import { Heading, Text, Box, HStack, Input, Button } from '@chakra-ui/react';

import { posts } from '../../../../data';
import ForumTabs from './ForumTabs';
import { useState } from 'react';


const CategoryPosts = () => {

    const { category } = useParams();

    const [searchTerm, setSearchTerm] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const categoryPosts = category === 'All Categories' ? posts : posts.filter(post => post.category === category);

    const handleClick = () => {
        setSearchParams({ search: searchTerm.toLowerCase() });
        setSearchTerm('');
    };

    return (
        <Box bg={'white'} borderRadius={'10px'} p={'20px'} m={'20px'} boxShadow={'md'}>
            <Text fontStyle='italic'>posts from category</Text>
            <Heading size='xl' mb='15px'>{category}</Heading>

            <HStack>
                <Input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    m='0px 0px 10px'
                    bg='white'
                    focusBorderColor='brand.400'
                    placeholder={`Search posts in category ${category}`} />
                <Button onClick={handleClick}>Search</Button>
            </HStack>

            {searchParams.get('search') ? (
                <>
                    <Text p='15px' fontStyle='italic'>Search results for `{searchParams.get('search')}` in category {category}</Text>
                    <ForumTabs posts={categoryPosts.filter(post => post.title.toLowerCase().includes(searchParams.get('search')))} />
                </>
            ) : (
                <ForumTabs posts={categoryPosts} />
            )}

        </Box>
    );

};

export default CategoryPosts;
