import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { Heading, Text, Box, HStack, Input, Button, Spinner, VStack } from '@chakra-ui/react';

import { categories } from '../../../../data';
import ForumTabs from './ForumTabs';
import { useEffect, useState } from 'react';
import { getPostsByCategory } from '../../../services/post.service';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';


const CategoryPosts = () => {

    const { category } = useParams();

    const [categoryPosts, setCategoryPosts] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (!categories.hasOwnProperty(category)) {
            navigate('../../not-found');
        }

        return onValue(ref(db, 'posts'), () => {
            getPostsByCategory(category)
                .then(posts => {
                    setCategoryPosts(posts);
                })
                .catch(() => navigate('../../server-down'));
        });
    }, [category]);


    const handleClick = () => {
        setSearchParams({ search: searchTerm.toLowerCase() });
        setSearchTerm('');
    };

    return (
        <Box bg={'white'} borderRadius={'10px'} p={'20px'} m={'20px'} boxShadow={'md'}>
            {category !== 'allCategories' && <Text fontStyle='italic'>posts from category</Text>}
            <Heading size='xl' mb='15px'>{categories[category]}</Heading>
            <Outlet />
            <HStack m='0px 0px 15px'>
                <Input
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    bg='white'
                    focusBorderColor='brand.400'
                    placeholder={`Search posts in ${categories[category]}`} />
                <Button onClick={handleClick}>Search</Button>
            </HStack>

            {!categoryPosts ? (
                <VStack justify='center' h='200px'>
                    <Spinner size='xl' />
                </VStack>
            ) : (
                <>
                    {searchParams.get('search') ? (
                        <>
                            <Text p='15px' fontStyle='italic'>Search results for `{searchParams.get('search')}` in {categories[category]}</Text>
                            <ForumTabs posts={categoryPosts.filter(post =>
                                (post.title.toLowerCase().includes(searchParams.get('search')) ||
                            (post.tags ? Object.keys(post.tags).includes(searchParams.get('search')) : false)))} />
                        </>
                    ) : (
                        <>
                            <ForumTabs posts={categoryPosts} />
                        </>
                    )}
                </>
            )}
        </Box>
    );
};

export default CategoryPosts;
