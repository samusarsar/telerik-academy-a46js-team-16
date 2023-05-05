import { Badge, Button, ButtonGroup, Divider, HStack, Heading, Icon, Image, Stack, Text, VStack } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiShare } from 'react-icons/fi';

const PostDetails = ({ post }) => {

    return (
        <>
            <VStack p={8} bg='brand.100' rounded='md' w={{ sm: '100%', md: '80%' }} boxShadow='lg'>
                <HStack w='100%' align='start' justify='left'>
                    <Image src='https://bit.ly/dan-abramov' w='70px' rounded='full'mx={2}/>
                    <VStack align='start' w='80%'>
                        <VStack align='start' w='100%'>
                            <Link to={`/forum/${post.category}`}><Badge>{post.category}</Badge></Link>

                            <Heading as='h1' size='lg' fontWeight='500' w='100%'>{post.title}</Heading>
                            <HStack>
                                <Link>{post.author.name}</Link>
                                <Text>| {post.publishedOn}</Text>
                            </HStack>
                            <Divider w='100%' />
                        </VStack>
                        <VStack align='start' p={5} gap={5} bg='brand.600' w='100%' rounded='md'>
                            <Text>
                                {post.body}
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
