import { Box, Divider, Tabs, TabList, Tab, TabPanels, TabPanel, Icon, VStack, Text } from '@chakra-ui/react';
import SinglePost from '../SinglePost/SinglePost';
import { MdOutlineDensitySmall, MdOutlineDensityLarge } from 'react-icons/md';
import SingleProfileComment from '../../Comments/SingleProfileComment/SingleProfileComment';
import { useEffect, useState } from 'react';
import Pagination from '../../Base/Pagination/Pagination';

const PostFeed = ({ posts, profileCommentMode=false }) => {
    const [postsToShow, setPostsToShow] = useState(null);

    const [pages, setPages] = useState(null);

    const [currPage, setCurrPage] = useState(0);

    const [offset, setOffset] = useState(0);

    useEffect(() => {
        setOffset(0);
        setCurrPage(0);
    }, [posts]);

    useEffect(() => {
        setPostsToShow(posts.slice(offset, offset+15));
        setPages([...Array(Math.ceil(posts.length/15)).keys()]);
    }, [offset, posts]);

    if (postsToShow) {
        return (
            <>
                {postsToShow.length ?
                    (<Box py={4}>
                        <Tabs align='end' variant='enclosed'>
                            <TabList>
                                <Tab><Icon as={MdOutlineDensitySmall}></Icon></Tab>
                                <Tab><Icon as={MdOutlineDensityLarge}></Icon></Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    {postsToShow.map(post =>
                                        <>
                                            {!profileCommentMode ?
                                                <SinglePost key={post.postId} post={post} /> :
                                                <SingleProfileComment key={post.commentId} comment={post} />}
                                            <Divider borderColor='gray.400' w='95%'/>
                                        </>,
                                    )}
                                </TabPanel>
                                <TabPanel>
                                    {postsToShow.map(post =>
                                        <>
                                            {!profileCommentMode ?
                                                <SinglePost key={post.postId} post={post} large={true} /> :
                                                <SingleProfileComment key={post.commentId} comment={post} large={true}/>}
                                            <Divider borderColor='gray.400' w='95%'/>
                                        </>,
                                    )}
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                        {pages && <Pagination pages={pages} currPage={currPage} setCurrPage={setCurrPage} setOffset={setOffset} />}
                    </Box>) : (
                        <VStack h='100%' justify='center'>
                            <Text>No {profileCommentMode ? 'comments' : 'posts'} here yet.</Text>
                        </VStack>
                    )
                }
            </>
        );
    }
};

export default PostFeed;
