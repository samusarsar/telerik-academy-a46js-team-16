import { Heading, Text, Icon, HStack, VStack } from '@chakra-ui/react';
import { BRAND_COLOR_5, BRAND_COLOR_6 } from '../../../common/constants';
import PropTypes from 'prop-types';

const StatBox = ({ heading, text, icon }) => {
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

            <Text fontSize='lg' align='center'>
                {text}
            </Text>
        </VStack>
    );
};

StatBox.propTypes = {
    heading: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
};

export default StatBox;
