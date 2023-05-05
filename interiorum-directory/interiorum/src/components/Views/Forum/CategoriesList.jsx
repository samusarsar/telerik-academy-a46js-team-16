import { Box, Heading, VStack, Link } from '@chakra-ui/react';
import { categories } from '../../../../data';
import { NavLink } from 'react-router-dom';
import { BRAND_COLOR_3 } from '../../../common/constants';

const CategoriesList = () => {
    return (
        <Box bg={'white'} borderRadius={'10px'} p={'20px'} m={'20px'} boxShadow={'md'}>
            <Heading as='h5' size='sm'>Categoreis List</Heading>
            <VStack ml={4} align='left' py={2}>
                {Object.keys(categories).map(category => <Link key={category} as={NavLink} to={category} _activeLink={ { color: BRAND_COLOR_3 } }>{categories[category]}</Link>)}
            </VStack>
        </Box>
    );
};

export default CategoriesList;
