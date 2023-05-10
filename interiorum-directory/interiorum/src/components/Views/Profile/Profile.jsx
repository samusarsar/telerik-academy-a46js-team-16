import { Box, Container, Text, Image, Spacer, HStack, ButtonGroup, Button, Tabs, TabList, Tab, TabPanels, TabPanel, Flex, Icon, useToast, Badge } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import ProfilePosts from './ProfilePosts';
import ProfileComments from './ProfileComments';
import { FiShare } from 'react-icons/fi';
import { TbMessageCircle } from 'react-icons/tb';
import { AppContext } from '../../../context/AppContext/AppContext';
import handleLogOut from '../../../common/helpers/handleLogOut';
import { useNavigate, useParams } from 'react-router-dom';
import EditDrawer from './EditDrawer';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../config/firebase-config';
import { changeUserRole } from '../../../services/users.service';
import AdminPanel from '../../Admin/AdminPanel';
import { ADMIN_ROLE, BASE_ROLE, BLOCKED_ROLE, WANT_ADMIN_ROLE } from '../../../common/constants';
import handleBlock from '../../../common/helpers/handleBlock';
import handleUnblock from '../../../common/helpers/handleUnblock';
import { getPostsByAuthor } from '../../../services/post.service';
import { getCommentsByAuthor } from '../../../services/comment.services';
import ProfileLikedPosts from './ProfileLikedPosts';
import ProfileLikedComments from './ProfileLikedComments';

const Profile = () => {
    const { userData, setContext } = useContext(AppContext);

    const { handle } = useParams();

    const [profile, setProfile] = useState(null);

    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    const navigate = useNavigate();
    const toast = useToast();


    useEffect(() => {
        setProfile(null);
        return onValue(ref(db, `users/${handle}`), (snapshot) => {
            const data = snapshot.val();
            setProfile(data);
        });
    }, [handle]);

    useEffect(() => {
        if (profile) {
            getPostsByAuthor(profile.handle)
                .then(snapshot => snapshot.val())
                .then(data => {
                    setPosts(data ? Object.values(data) : []);
                });

            getCommentsByAuthor(profile.handle)
                .then(snapshot => snapshot.val())
                .then(data => {
                    setComments(data ? Object.values(data) : []);
                });
        };
    }, [profile]);

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
            {(profile && posts && comments) &&
            <Container className='main-view' id='profile-view' maxW='container' minH='90vh' p={0}>
                <Container maxW='container' bg='brand.100'>
                    <HStack justify='left' p={8}>
                        <Image
                            boxSize='150px'
                            objectFit='cover'
                            src={profile.avatarURL}
                            fallbackSrc='https://firebasestorage.googleapis.com/v0/b/interiorum-6c515.appspot.com/o/assets%2Fanon-user.jpg?alt=media&token=0007d79f-52fb-4866-9747-326d52395bd9'
                            alt={`${profile.handle} avatar image`}
                        />
                        <Box px={4}>
                            <HStack>
                                {(profile.role !== ADMIN_ROLE) && <Badge colorScheme='blue'>Newbie</Badge>}
                                {profile.role === ADMIN_ROLE && <Badge colorScheme='purple'>Admin</Badge>}
                                {profile.role === BLOCKED_ROLE && <Badge colorScheme='red'>Blocked</Badge>}
                            </HStack>
                            <HStack>
                                <Text fontSize='1.8em' fontWeight='700'>{`${profile.firstName} ${profile.lastName}`}</Text>
                                {currUserCheck() && <EditDrawer handle={handle} currFirstName={profile.firstName} currLastName={profile.lastName} avatarURL={profile.avatarURL} />}
                            </HStack>
                            <Text fontSize='0.9em' >{posts.length} posts | {comments.length} comments</Text>
                            {(profile.role !== ADMIN_ROLE && profile.role !== BLOCKED_ROLE && !currUserCheck() && adminCheck()) ?
                                <Button colorScheme='red' variant='outline' fontSize='0.8em' h='20px' mt={2} onClick={() => handleBlock({ handle, toast })}>Block User</Button> :
                                (profile.role === BLOCKED_ROLE && !currUserCheck() && adminCheck()) &&
                                <Button colorScheme='telegram' variant='outline' fontSize='0.8em' h='20px' mt={2}
                                    onClick={() => handleUnblock({ handle, toast })}>Unblock User</Button>}
                            {(profile.role === BASE_ROLE && currUserCheck()) &&
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
                {profile.handle &&
                    <Tabs pl={12} pr={12} mt={2} isLazy={true}>
                        <TabList>
                            <Tab>Activity</Tab>
                            <Tab>Liked</Tab>
                            {(profile.role === ADMIN_ROLE && currUserCheck()) && <Tab color='purple'>Admin Panel</Tab>}
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
                                    <ProfileLikedPosts handle={profile.handle} />
                                    <ProfileLikedComments handle={profile.handle} />
                                </Flex>
                            </TabPanel>
                            {(profile.role === ADMIN_ROLE && currUserCheck()) &&
                                (<TabPanel>
                                    <AdminPanel />
                                </TabPanel>)}
                        </TabPanels>
                    </Tabs>}
            </Container>}
        </>
    );
};

export default Profile;
