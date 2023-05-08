import { Text, Box, HStack, Spacer, Card, Image, Stack, CardBody, CardFooter, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPostById } from '../../../services/post.service';

const SingleProfileComment = ({ comment, large=false }) => {
    const body = comment.content.length > 100 ? comment.content.slice(0,99) + '...' : comment.content;

    const [postTitle, setPostTitle] = useState(null);

    useEffect(() => {
        getPostById(comment.postId)
            .then(data => setPostTitle(data.title));
    }, []);

    // useEffect(() => console.log(comment.author), [])
    if (comment) {
        return (
            <Box textAlign='left' px={2}>
                <HStack justify='left' py={2}>
                    <Text fontSize='0.8em' >
                        <Link to={`../../profile/${comment.author}`}><b>{comment.author}</b></Link> commented on:
                    </Text>
                    <Spacer />
                    <Text fontSize='xs' color='gray.500'>
                        On {comment.createdOn}
                    </Text>
                </HStack >
                <Link to={`../../post/${comment.postId}`}>
                    <Heading as='h5' size='sm' py={3}>
                        {postTitle && postTitle}
                    </Heading>
                    {large &&
                        <Text py={3} color='brand.400' fontSize='0.9em'>
                            {body}
                        </Text>}
                </Link>
            </Box>
        );
    }

    return null;
    // <Card
    //     direction={{ base: 'column', sm: 'row' }}
    //     overflow='hidden'
    //     variant='outline'
    // >
    //     <Image
    //         objectFit='cover'
    //         maxW={{ base: '100%', sm: '200px' }}
    //         src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
    //         alt='Caffe Latte'
    //     />

    //     <Stack >
    //         <CardBody align='left'>
    //             {/* <Text fontSize='sm'>{comment.author} commented on discussion:</Text> */}
    //             <Text fontSize='0.8em' > <b>John McGee</b> commented on a discussion:</Text>

    //             <Link >
    //                 <Text py={3} color='brand.300'>
    //                     Adjusting Visual Comfort Goodman Pendants
    //                 </Text>
    //             </Link>
    //             <Text as='cite' fontSize='sm'>
    //                 I think this is such a great idea! Well Done!
    //             </Text>

    //         </CardBody>

    //         <CardFooter pt={0}>
    //             <Text fontSize='xs' color='gray.500'>
    //                 On Wednesday
    //             </Text>
    //         </CardFooter>
    //     </Stack>
    // </Card>

};

export default SingleProfileComment;
