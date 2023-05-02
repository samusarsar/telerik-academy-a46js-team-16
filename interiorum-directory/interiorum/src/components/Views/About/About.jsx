import { Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react';
import AboutHeader from './AboutHeader';
import Team from './Team';
import Careers from './Careers';
import FAQ from './FAQ';

const About = () => {
    return (
        <div>
            <AboutHeader />
            <Tabs align='center' bg='brand.600'>
                <TabList>
                    <Tab w='200px'>Team</Tab>
                    <Tab w='200px'>Careers</Tab>
                    <Tab w='200px'>FAQ</Tab>
                </TabList>

                <TabPanels bg='brand.100' w={{ sm: '100%', lg: '80%' }} py={5}>
                    <TabPanel >
                        <Team />
                    </TabPanel>
                    <TabPanel>
                        <Careers />
                    </TabPanel>
                    <TabPanel>
                        <FAQ />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
};

export default About;
