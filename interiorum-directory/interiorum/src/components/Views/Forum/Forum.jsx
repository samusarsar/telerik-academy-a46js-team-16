import { Box, Grid, GridItem } from '@chakra-ui/react';

import ForumHeader from './ForumHeader';
import CategoriesList from './CategoriesList';
import TopUsersList from './TopUsersList';
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext/AppContext';

const Forum = () => {
    const { userData } = useContext(AppContext);

    if (userData) {
        return (
            <Box className="forum-view" bg='brand.600'>
                <ForumHeader />
                <Grid className='forum-content' templateColumns='1fr 4fr'>
                    <GridItem>
                        <CategoriesList />
                        <TopUsersList type={'posts'}/>
                        <TopUsersList type={'comments'}/>
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
