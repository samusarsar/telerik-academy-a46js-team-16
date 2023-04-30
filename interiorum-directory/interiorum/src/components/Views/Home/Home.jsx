import { Container, Divider, Flex } from '@chakra-ui/react';
import MostRecent from './MostRecent';
import MostCommented from './MostCommented';
import FeaturesPopovers from './FeaturesPopovers';
import HomeHeader from './HomeHeader';
import CallToAction from './CallToAction';

const Home = () => {
    return (
        <>
            <HomeHeader/>
            <Container className='main-view' id='home-view' bg='brand.600' maxW='container' centerContent>
                <FeaturesPopovers/>
                <CallToAction/>

                <Divider w={'80%'} borderColor='brand.300'/>

                <Flex w='container.lg' p={4} justify={'center'}>
                    <MostRecent />
                    <MostCommented />
                </Flex>
            </Container>
        </>
    );
};

export default Home;
