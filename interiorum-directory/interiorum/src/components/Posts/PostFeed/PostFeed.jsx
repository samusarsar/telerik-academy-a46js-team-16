import { Box, Divider, Tabs, TabList, Tab, TabPanels, TabPanel, Icon, VStack, Text } from '@chakra-ui/react';
import SinglePost from '../SinglePost/SinglePost';
import { MdOutlineDensitySmall, MdOutlineDensityLarge } from 'react-icons/md';
import SingleProfileComment from '../../Comments/SingleProfileComment/SingleProfileComment';

const PostFeed = ({ posts, profileCommentMode=false }) => {
    return (
        <>
            {posts.length ?
                (<Box py={4}>
                    <Tabs align='end' variant='enclosed'>
                        <TabList>
                            <Tab><Icon as={MdOutlineDensitySmall}></Icon></Tab>
                            <Tab><Icon as={MdOutlineDensityLarge}></Icon></Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                {posts.map(post =>
                                    <>
                                        {!profileCommentMode ?
                                            <SinglePost key={post.postId} post={post} /> :
                                            <SingleProfileComment key={post.commentId} comment={post} />}
                                        <Divider borderColor='gray.400' w='95%'/>
                                    </>,
                                )}
                            </TabPanel>
                            <TabPanel>
                                {posts.map(post =>
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
                </Box>) : (
                    <VStack h='100%' justify='center'>
                        <Text>No {profileCommentMode ? 'comments' : 'posts'} here yet.</Text>
                    </VStack>
                )
            }
        </>
    );
};

export default PostFeed;
