import { Box, Heading, VStack, Text } from '@chakra-ui/react';
import { categories } from '../../../../data';
import { NavLink } from 'react-router-dom';

const CategoriesList = () => {
    return (
        <Box bg={'white'} borderRadius={'10px'} p={'20px'} m={'20px'} boxShadow={'md'}>
            <Heading as='h5' size='sm'>Categoreis List</Heading>
            <VStack ml={4} align='left' py={2}>
                {categories.map(c => <Text key={c} fontSize='0.9em'><NavLink to={c}>{c}</NavLink></Text>)}
            </VStack>
        </Box>
    );
};

export default CategoriesList;
