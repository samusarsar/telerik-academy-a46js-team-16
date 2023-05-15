import { Heading, Text, Icon, HStack, VStack, Spinner } from '@chakra-ui/react';
import { BRAND_COLOR_5, BRAND_COLOR_6 } from '../../../common/constants';
import PropTypes from 'prop-types';

const StatBox = ({ heading, count, icon, isLoading }) => {
    return (
        <VStack
            size='sm'
            w='fit-content'
            py={4}
            px={12}
            rounded='md'
            bg='brand.200'
            color='brand.500'
            sx={{ transition: 'ease-in-out 0.2s' }}
            _hover={{ transform: 'scale(1.15)', background: `${BRAND_COLOR_6}`, color: `${BRAND_COLOR_5}` }}
        >
            <HStack justify='center'>
                <Heading size='md'> {heading} </Heading>
                <Icon as={icon} alignSelf='center' fontSize='x-large' />
            </HStack>
            {isLoading ? (
                <Spinner size='xl' />
            ) : (
                <Text fontSize='lg' align='center'>
                    {count}
                </Text>
            )
            }

        </VStack >
    );
};

StatBox.propTypes = {
    heading: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    icon: PropTypes.elementType.isRequired,
    isLoading: PropTypes.bool,
};

export default StatBox;
