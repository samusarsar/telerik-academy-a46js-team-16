import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';

import PostFeed from '../../Posts/PostFeed/PostFeed';

const ForumTabs = ({ posts }) => {

    const resentPosts = [...posts].sort((a, b) => {
        return new Date(b.publishedOn) - new Date(a.publishedOn);
    });
    const popularPosts = [...posts].sort((a, b) => b.comments.length - a.comments.length);
    const unansweredPosts = posts.filter(post => post.comments.length === 0);

    return (
        <Tabs colorScheme='brand.400'>
            <TabList>
                <Tab>Resent</Tab>
                <Tab>Popular</Tab>
                <Tab>Unanswered</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <PostFeed posts={resentPosts} />
                </TabPanel>
                <TabPanel>
                    <PostFeed posts={popularPosts} />
                </TabPanel>
                <TabPanel>
                    <PostFeed posts={unansweredPosts} />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default ForumTabs;
