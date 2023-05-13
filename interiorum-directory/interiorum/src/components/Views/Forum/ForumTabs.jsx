import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';

import PostFeed from '../../Posts/PostFeed/PostFeed';
import { filterUnansweredPosts, sortPostsByDate, sortPostsByPopularity } from '../../../services/post.service';
import PropTypes from 'prop-types';

const ForumTabs = ({ posts }) => {

    const recentPosts = sortPostsByDate(posts);

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
                    <PostFeed posts={recentPosts} />
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

ForumTabs.propTypes = {
    posts: PropTypes.array.isRequired,
};

export default ForumTabs;
