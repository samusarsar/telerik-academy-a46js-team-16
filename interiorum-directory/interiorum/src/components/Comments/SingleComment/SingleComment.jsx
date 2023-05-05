import { Box, Button, HStack, Heading, Icon, Image, Text, VStack } from '@chakra-ui/react';
import { AiOutlineLike } from 'react-icons/ai';

const SingleComment = ({ comment }) => {
    return (
        <HStack align='start' p={4} >
            <Image src='https://bit.ly/dan-abramov' w='30px' rounded='full'mx={2}/>
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
