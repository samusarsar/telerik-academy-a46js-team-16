import { Box, Heading, UnorderedList, ListItem } from '@chakra-ui/react';
import { categories } from '../../../../data';
import { NavLink } from 'react-router-dom';

const CategoriesList = () => {
    return (
        <Box borderWidth='1px' borderRadius='lg'>
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
