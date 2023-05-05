import { Box, Container, Text, Image, Spacer, HStack, ButtonGroup, Button, Tabs, TabList, Tab, TabPanels, TabPanel, Flex, IconButton, Icon, useToast, Badge } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { users } from '../../../../data';
import ProfilePosts from './ProfilePosts';
import ProfileComments from './ProfileComments';
import { FiShare } from 'react-icons/fi';
import { TbMessageCircle } from 'react-icons/tb';
import { AppContext } from '../../../context/AppContext/AppContext';
import handleLogOut from '../../../common/helpers/handleLogOut';
import { useNavigate, useParams } from 'react-router-dom';
import EditDrawer from './EditDrawer';
import { onValue, ref } from 'firebase/database';
import { db, storage } from '../../../config/firebase-config';
import { MdSignalCellularNull } from 'react-icons/md';
import { changeUserRole, getUserByHandle } from '../../../services/users.service';
import AdminPanel from '../../Admin/AdminPanel';
import { ADMIN_ROLE, BASE_ROLE, BLOCKED_ROLE, WANT_ADMIN_ROLE } from '../../../common/constants';
import handleBlock from '../../../common/helpers/handleBlock';
import handleUnblock from '../../../common/helpers/handleUnblock';

const ProfileLayout = () => {
    const { user, userData, setContext } = useContext(AppContext);

    const { handle } = useParams();

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [avatarURL, setAvatarURL] = useState(null);
    const [role, setRole] = useState(null);

    const [posts, setPosts] = useState(users[0].posts);
    const [comments, setComments] = useState(users[0].comments);

    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        onValue(ref(db, `users/${handle}`), (snapshot) => {
            console.log(handle);
            const data = snapshot.val();
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setAvatarURL(data.avatarURL || null);
            setRole(data.role || null);
        });
    }, [handle]);

    const handleApply = () => {
        changeUserRole({ handle, roleType: WANT_ADMIN_ROLE });
        toast({
            title: 'Application received',
            description: 'We will review your application and get back to you ASAP!',
            status: 'info',
            duration: 3000,
            isClosable: true,
            position: 'top',
            variant: 'subtle',
        });
    };

    const adminCheck = () => userData.role === ADMIN_ROLE;

    const currUserCheck = () => userData.handle === handle;

    return (
        <>
            {(firstName && lastName) &&
            <Container className='main-view' id='profile-view' maxW='container' minH='90vh' p={0}>
                <Container maxW='container' bg='brand.100'>
                    <HStack justify='left' p={8} >
                        <Image
                            boxSize='150px'
                            objectFit='cover'
                            src={avatarURL}
                            fallbackSrc='https://bit.ly/dan-abramov'
                            alt='Dan Abramov'
                        />
                        <Box px={4}>
                            {(role === BASE_ROLE || role === WANT_ADMIN_ROLE) && <Badge colorScheme='blue'>Newbie</Badge>}
                            {role === ADMIN_ROLE && <Badge colorScheme='purple'>Admin</Badge>}
                            {role === BLOCKED_ROLE && <Badge colorScheme='red'>Blocked</Badge>}
                            <HStack>
                                <Text fontSize='1.8em' fontWeight='700'>{`${firstName} ${lastName}`}</Text>
                                {currUserCheck() && <EditDrawer handle={handle} currFirstName={firstName} currLastName={lastName} avatarURL={avatarURL} />}
                            </HStack>
                            <Text fontSize='0.9em' >{posts.length} posts | {comments.length} comments</Text>
                            {(role !== ADMIN_ROLE && role !== BLOCKED_ROLE && !currUserCheck() && adminCheck()) ?
                                <Button colorScheme='red' variant='outline' fontSize='0.8em' h='20px' mt={2} onClick={() => handleBlock({ handle, toast })}>Block User</Button> :
                                (role === BLOCKED_ROLE && !currUserCheck() && adminCheck()) &&
                                <Button colorScheme='telegram' variant='outline' fontSize='0.8em' h='20px' mt={2} onClick={() => handleUnblock({ handle, toast })}>Unblock User</Button>}
                            {(role !== ADMIN_ROLE && role !== BLOCKED_ROLE && currUserCheck()) &&
                                <Button fontSize='0.8em' h='20px' mt={2} onClick={handleApply}>Apply for Admin</Button>}
                        </Box>
                        <Spacer />
                        <ButtonGroup variant='solid' spacing='4' size='md'>
                            <Button colorScheme='teal'><Icon as={FiShare} mr={2}/>Share</Button>
                            {!currUserCheck() && <Button colorScheme='facebook' ><Icon as={TbMessageCircle} mr={2}/>Message</Button>}
                            {currUserCheck() && <Button colorScheme='red' variant='outline' onClick={() => handleLogOut({ setContext, navigate, toast })}>Log Out</Button>}
                        </ButtonGroup>
                    </HStack>
                </Container>
                <Tabs pl={12} pr={12} mt={2}>
                    <TabList>
                        <Tab>Activity</Tab>
                        <Tab>Liked</Tab>
                        <Tab>Saved</Tab>
                        {(role === ADMIN_ROLE && currUserCheck()) && <Tab color='purple'>Admin Panel</Tab>}
                    </TabList>
                    <TabPanels bg='brand.600'>
                        <TabPanel>
                            <Flex w='container' p={4} justify={'center'}>
                                <ProfilePosts posts={posts} />
                                <ProfileComments comments={comments} />
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Flex w='container' p={4} justify={'center'}>
                                <ProfilePosts posts={posts} />
                                <ProfileComments comments={comments} />
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Flex w='container' p={4} justify={'center'}>
                                <ProfilePosts posts={posts} />
                                <ProfileComments comments={comments} />
                            </Flex>
                        </TabPanel>
                        {(role === ADMIN_ROLE && currUserCheck()) &&
                        (<TabPanel>
                            <AdminPanel />
                        </TabPanel>)}
                    </TabPanels>
                </Tabs>
            </Container>}
        </>
    );
};

export default ProfileLayout;
