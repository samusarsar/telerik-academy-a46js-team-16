import { Container, Divider, Flex, Heading } from '@chakra-ui/react';
import { BsFillPeopleFill, BsFillChatTextFill } from 'react-icons/bs';
import MostRecent from './MostRecent';
import MostCommented from './MostCommented';
import StatBox from './StatBox';

const Home = () => {
    return (
        <Container className='main-view' id='home-view' bg={'grey'} maxW='container' centerContent>
            <Heading as='h1' m='20px'>interiorum</Heading>

            <Flex w='container.lg' h={'250px'} p={4} flexDirection={'row'}>
                <StatBox heading='Total Users' text='321' icon={BsFillPeopleFill} />
                <StatBox heading='Total Posts' text='123234' icon={BsFillChatTextFill} />
            </Flex>

            <Divider borderColor={'white'} w={'80%'}/>

            <Flex w='container.lg' p={4} justify={'center'}>
                <MostRecent />
                <MostCommented />
            </Flex>
        </Container>
    );
};

export default Home;
