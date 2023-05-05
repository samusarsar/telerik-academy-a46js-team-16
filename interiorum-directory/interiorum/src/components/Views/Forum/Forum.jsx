import { Box, Grid, GridItem } from '@chakra-ui/react';

import CreatePostHeader from './CreatePostHeader';
import CategoriesList from './CategoriesList';
import TopCommentersList from './TopCommentersList';
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext/AppContext';

const Forum = () => {
    const { userData } = useContext(AppContext);

    if (userData) {
        return (
            <Box className="forum-view">
                <CreatePostHeader />
                <Grid className='forum-content' templateColumns='1fr 4fr'>
                    <GridItem>
                        <CategoriesList />
                        <TopCommentersList />
                    </GridItem>
                    <GridItem>
                        <Outlet />
                    </GridItem>

                </Grid>

            </Box>
        );
    }
};

export default Forum;
