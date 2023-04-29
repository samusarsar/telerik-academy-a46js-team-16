import { Box, Heading, UnorderedList, ListItem } from '@chakra-ui/react';
import { categories } from '../../../../data';
import { NavLink } from 'react-router-dom';

const CategoriesList = () => {
    return (
        <Box bg={'white'} borderRadius={'10px'} p={'20px'} m={'20px'} boxShadow={'md'}>
            <Heading>
                Categories List
            </Heading>
            <UnorderedList>
                {categories.map(c => <ListItem key={c}><NavLink to={c}>{c}</NavLink></ListItem>)}
            </UnorderedList>
        </Box>
    );
};

export default CategoriesList;
