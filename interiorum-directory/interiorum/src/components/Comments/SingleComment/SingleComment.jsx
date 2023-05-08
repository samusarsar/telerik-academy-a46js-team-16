import { Box, Button, HStack, Heading, Icon, Image, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { getUserByHandle } from '../../../services/users.service';

const SingleComment = ({ comment }) => {
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        getUserByHandle(comment.author)
            .then(snapshot => snapshot.val())
            .then(data => setAuthor(Object.values(data)[0]))
            .catch(error => console.log('Fetching author data was unsuccessful: ' + error.message));
    }, []);

    return (
        <HStack align='start' p={4} >
            <Image
                src={author && author.avatarURL}
                fallbackSrc='https://firebasestorage.googleapis.com/v0/b/interiorum-6c515.appspot.com/o/assets%2Fanon-user.jpg?alt=media&token=0007d79f-52fb-4866-9747-326d52395bd9'
                w='45px'
                rounded='full'
                mx={2}/>
            <VStack align='start'>
                <Text fontSize='0.8em' fontWeight='700'>{comment.author}</Text>
                <Text fontSize='0.8em' color='gray.500'>{comment.publishedOn}</Text>
                <Text>{comment.text}</Text>
                <Button h='30px' fontSize='0.8em'><Icon as={AiOutlineLike} mr={1} />Like</Button>
            </VStack>
        </HStack>
    );
};

export default SingleComment;
