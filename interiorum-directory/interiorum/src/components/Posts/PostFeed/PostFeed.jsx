import { Box, Divider, Tabs, TabList, Tab, TabPanels, TabPanel, Icon } from '@chakra-ui/react';
import SinglePost from '../SinglePost/SinglePost';
import SinglePostLarge from '../SinglePostLarge/SinglePostLarge';
import { MdOutlineDensitySmall, MdOutlineDensityLarge } from 'react-icons/md';

const PostFeed = ({ posts }) => {
    return (
        <>

            <Box py={4}>
                <Tabs align='end' variant='enclosed'>
                    <TabList>
                        <Tab><Icon as={MdOutlineDensitySmall}></Icon></Tab>
                        <Tab><Icon as={MdOutlineDensityLarge}></Icon></Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {posts.map(post =>
                                <>
                                    <SinglePost key={post.id} post={post} />
                                    <Divider borderColor='gray.400' w='95%'/>
                                </>,
                            )}
                        </TabPanel>
                        <TabPanel>
                            {posts.map(post =>
                                <>
                                    <SinglePost key={post.id} post={post} large={true} />
                                    <Divider borderColor='gray.400' w='95%'/>
                                </>,
                            )}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    );
};

export default PostFeed;
