import { Outlet, useParams, useSearchParams } from 'react-router-dom';

import { Heading, Text, Box, HStack, Input, Button, Flex, Spacer, VStack, Icon } from '@chakra-ui/react';

import { categories } from '../../../../data';
import ForumTabs from './ForumTabs';
import { useEffect, useState } from 'react';
import { getPosts, getPostsByCategory } from '../../../services/post.service';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import Pagination from '../../Base/Pagination/Pagination';


const CategoryPosts = () => {

    const { category } = useParams();

    const [categoryPosts, setCategoryPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const [postsToShow, setPostsToShow] = useState(null);
    const [pages, setPages] = useState(null);
    const [currPage, setCurrPage] = useState(0);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        getPostsByCategory(category)
            .then(posts => {
                setCategoryPosts(posts);
                setPostsToShow(posts.slice(offset, offset+15));
                setPages([...Array(Math.ceil(posts.length/15)).keys()]);
            });
    }, [category, offset]);


    const handleClick = () => {
        setSearchParams({ search: searchTerm.toLowerCase() });
        setSearchTerm('');
    };

    return (
        <Box bg={'white'} borderRadius={'10px'} p={'20px'} m={'20px'} boxShadow={'md'}>
            <Text fontStyle='italic'>posts from category</Text>
            <Heading size='xl' mb='15px'>{categories[category]}</Heading>
            <Outlet />
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

            {postsToShow &&
                (searchParams.get('search') ? (
                    <>
                        <Text p='15px' fontStyle='italic'>Search results for `{searchParams.get('search')}` in category {category}</Text>
                        <ForumTabs posts={postsToShow.filter(post => post.title.toLowerCase().includes(searchParams.get('search')))} />
                    </>
                ) : (
                    <ForumTabs posts={postsToShow} />
                ))}

            {pages && <Pagination pages={pages} currPage={currPage} setCurrPage={setCurrPage} setOffset={setOffset} />}
        </Box>
    );
};

export default CategoryPosts;
