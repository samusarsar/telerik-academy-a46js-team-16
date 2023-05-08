import { Badge, Button, ButtonGroup, Divider, HStack, Heading, Icon, Image, Stack, Text, VStack } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiShare } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { getUserByHandle } from '../../../services/users.service';

const PostDetails = ({ post }) => {
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        getUserByHandle(post.author)
            .then(snapshot => snapshot.val())
            .then(data => setAuthor(data))
            .catch(error => console.log('Fetching author data was unsuccessful: ' + error.message));
    }, []);

    return (
        <>
            <VStack p={8} bg='brand.100' rounded='md' w={{ sm: '100%', md: '80%' }} boxShadow='lg'>
                <HStack w='100%' align='start' justify='left'>
                    <Image
                        src={author && author.avatarURL}
                        fallbackSrc='https://firebasestorage.googleapis.com/v0/b/interiorum-6c515.appspot.com/o/assets%2Fanon-user.jpg?alt=media&token=0007d79f-52fb-4866-9747-326d52395bd9'
                        w='70px'
                        rounded='full'
                        mx={2}/>
                    <VStack align='start' w='80%'>
                        <VStack align='start' w='100%'>
                            <HStack>
                                {post.categories && post.categories.map(category => <Link key={category} to={`/forum/${category}`}><Badge>{category}</Badge></Link>)}
                            </HStack>
                            <Heading as='h1' size='lg' fontWeight='500' w='100%'>{post.title}</Heading>
                            <HStack>
                                <Link to={`../../profile/${post.author}`}>{post.author}</Link>
                                <Text>| {post.createdOn}</Text>
                            </HStack>
                            <Divider w='100%' />
                        </VStack>
                        <VStack align='start' p={5} gap={5} bg='brand.600' w='100%' rounded='md'>
                            <Text>
                                {post.content}
                            </Text>
                        </VStack>
                        <ButtonGroup>
                            <Button h='30px' fontSize='0.8em'><Icon as={AiOutlineLike} mr={1} />Like</Button>
                            <Button h='30px' fontSize='0.8em'><Icon as={FaRegComment} mr={1} />Comment</Button>
                            <Button h='30px' fontSize='0.8em'><Icon as={FiShare} mr={2}/>Share</Button>
                        </ButtonGroup>
                    </VStack>
                </HStack>
            </VStack>
        </>
    );
};

export default PostDetails;
