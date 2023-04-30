import { Box, Grid, GridItem } from '@chakra-ui/react';

import CreatePostHeader from './CreatePostHeader';
import CategoriesList from './CategoriesList';
import PostFeed from '../../Posts/PostFeed/PostFeed';
import MostRecent from '../Home/MostRecent';

const Forum = () => {
    return (
        <Box className="forum-view">
            <CreatePostHeader />
            <Grid className='forum-content' templateColumns='1fr 3fr'>
                <GridItem>
                    <CategoriesList />
                    <CategoriesList />
                </GridItem>
                <GridItem>
                    <MostRecent />
                </GridItem>

            </Grid>

        </Box>
    );
};

export default Forum;
