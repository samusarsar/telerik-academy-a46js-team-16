// eslint-disable-next-line max-len
import { Heading, Grid, GridItem, Popover, PopoverTrigger, Button, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Link, Icon } from '@chakra-ui/react';
import { MdOutlineForum, MdOutlineAdminPanelSettings } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { FaHandsHelping } from 'react-icons/fa';
import { Link as ReachLink } from 'react-router-dom';
import { BRAND_COLOR_2 } from '../../../common/constants';

const FeaturesPopovers = () => {
    return (
        <>
            <Heading as='h2' size='lg' py={10}>Here&apos;s what you can do on Interiorum</Heading>
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                <GridItem>
                    <Popover>
                        <PopoverTrigger>
                            <Button
                                w='100%'
                                bg='brand.100'
                                _hover={{ background: `${BRAND_COLOR_2}` }}><Icon as={MdOutlineForum} boxSize='25px' mr={3} />Explore Design Community</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader><b>Forum</b></PopoverHeader>
                            <PopoverBody bg='brand.100'>On <i>interiorum</i> you can find a whole community of like-minded design enthusiasts.
                                    Explore our forum to get new design ideas for yourself, to share your own experiences, to get help and opinions on your latest projects,
                                    to learn new DIY techniques, or simply to get <b>inspired</b>!</PopoverBody>
                        </PopoverContent>
                    </Popover>
                </GridItem>
                <GridItem>
                    <Popover>
                        <PopoverTrigger>
                            <Button w='100%' bg='brand.100' _hover={{ background: `${BRAND_COLOR_2}` }}><Icon as={CgProfile} boxSize='25px' mr={3} />Create Your Profile</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader><b>Profile</b></PopoverHeader>
                            <PopoverBody bg='brand.100'>Create your own <i>interiorum</i> profile to browse our forum discussions,
                                    add your own posts and comments, like other discussions, and view user profiles to get in touch.
                                    Your home transformation journey starts with <Link as={ReachLink} to='../sign-up' color='brand.300'>signing up</Link>!
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </GridItem>
                <GridItem>
                    <Popover>
                        <PopoverTrigger>
                            <Button w='100%' bg='brand.100' _hover={{ background: `${BRAND_COLOR_2}` }}><Icon as={FaHandsHelping} boxSize='25px' mr={3} />Help Newbies</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader><b>Assistance</b></PopoverHeader>
                            <PopoverBody bg='brand.100'><i>interiorum</i> is all about lending a helping hand.
                                Browse through the latest posts and pay a visit to the unanswered ones,
                                in order to be the first to help a buddy out through a design dillemma!</PopoverBody>
                        </PopoverContent>
                    </Popover>
                </GridItem>
                <GridItem>
                    <Popover>
                        <PopoverTrigger>
                            <Button
                                w='100%'
                                bg='brand.100'
                                _hover={{ background: `${BRAND_COLOR_2}` }}>
                                <Icon as={MdOutlineAdminPanelSettings} boxSize='25px' mr={3} />Become Admin
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader><b>Admin Role</b></PopoverHeader>
                            <PopoverBody bg='brand.100'>If you are already an <i>interiorum</i> veteran and you feel as enthusiastic as we feel about interior design
                                - then how about you give an Admin role a go? Block and delete inappropriate users and posts/comments and
                                keep our community safe for all!</PopoverBody>
                        </PopoverContent>
                    </Popover>
                </GridItem>
            </Grid>
        </>);
};

export default FeaturesPopovers;
