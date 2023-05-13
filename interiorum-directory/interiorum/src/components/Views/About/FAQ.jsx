import { Heading, VStack, Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel } from '@chakra-ui/react';

const FAQ = () => {
    return (
        <VStack gap={10}>
            <Heading as='h2'>Frequently Asked Questions</Heading>
            <Accordion w={{ sm: '80%', lg: '60%' }} defaultIndex={[0]} align='left' allowMultiple>
                <AccordionItem>
                    <h2>
                        <AccordionButton py={4} _expanded={{ bg: 'brand.400', color: 'brand.600' }}>
                            <Box as="span" flex='1' textAlign='left' fontWeight='700'>
                                How can I create a profile on Interiorum?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} bg='brand.600'>
                        To create a profile you simply need to click <b>Sign Up</b> on the top right of the navigation
                        menu or found anywhere else around the wbsite as well. Then you need to enter your first and last names,
                        email address, select a username, create a password and you&apos;re done!
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton py={4} _expanded={{ bg: 'brand.400', color: 'brand.600' }}>
                            <Box as="span" flex='1' textAlign='left' fontWeight='700'>
                                How can I browse discussions on the forum?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} bg='brand.600'>
                        Going to the &apos;Forum&apos; tab you will be able to browse any and all discussions on Interiorum.
                        You can filter them by category, search for them directly, and even sort them by date,
                        popularity and &apos;unanswered&apos;. Happy reading!
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton py={4} _expanded={{ bg: 'brand.400', color: 'brand.600' }}>
                            <Box as="span" flex='1' textAlign='left' fontWeight='700'>
                                What actions can I do within the forum?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} bg='brand.600'>
                        You can always edit your own posts and comments if you find any mistakes or anything ahs changed.
                        You may also like and save other people&apos;s posts and comments and view them from your profile at a later stage.
                        You can also check out other people&apos;s profile pages to see what they are up to!
                    </AccordionPanel >
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton py={4} _expanded={{ bg: 'brand.400', color: 'brand.600' }}>
                            <Box as="span" flex='1' textAlign='left' fontWeight='700'>
                                How can I become an admin?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} bg='brand.600'>
                        To become an admin you need to click to &apos;Apply for Admin&apos; from your profile page. Once you do that and we approve you
                        you will be able to delete posts and comments and block users to keep our community safe.
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </VStack>
    );
};

export default FAQ;
