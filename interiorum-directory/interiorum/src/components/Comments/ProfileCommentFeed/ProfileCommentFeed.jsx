import { Box, Divider, Tabs, TabList, Tab, TabPanels, TabPanel, Icon, VStack, Text } from '@chakra-ui/react';
import SingleProfileComment from '../SingleProfileComment/SingleProfileComment';
import { MdOutlineDensitySmall, MdOutlineDensityLarge } from 'react-icons/md';

const ProfileCommentFeed = ({ comments }) => {
    return (
        <>
            {comments.length ?
                (<Box py={4}>
                    <Tabs align='end' variant='enclosed'>
                        <TabList>
                            <Tab><Icon as={MdOutlineDensitySmall}></Icon></Tab>
                            <Tab><Icon as={MdOutlineDensityLarge}></Icon></Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                {comments.map(comment =>
                                    <>
                                        <SingleProfileComment key={comment.id} comment={comment} />
                                        <Divider borderColor='gray.400' w='95%'/>
                                    </>,
                                )}
                            </TabPanel>
                            <TabPanel>
                                {comments.map(comment =>
                                    <>
                                        <SingleProfileComment key={comment.id} comment={comment} large={true}/>
                                        <Divider borderColor='gray.400' w='95%'/>
                                    </>,
                                )}
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>) : (
                    <VStack h='100%' justify='center'>
                        <Text>No comments here yet.</Text>
                    </VStack>
                )
            }
        </>
    );
};

export default ProfileCommentFeed;
