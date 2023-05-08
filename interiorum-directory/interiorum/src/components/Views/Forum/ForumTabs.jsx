import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';

import PostFeed from '../../Posts/PostFeed/PostFeed';
import { filterUnansweredPosts, sortPostsByDate, sortPostsByPopularity } from '../../../services/post.service';

const ForumTabs = ({ posts }) => {

    const resentPosts = sortPostsByDate(posts);

    const popularPosts = sortPostsByPopularity(posts);

    const unansweredPosts = filterUnansweredPosts(posts);

    return (
        <Tabs colorScheme='brand.400'>
            <TabList>
                <Tab>Recent</Tab>
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
