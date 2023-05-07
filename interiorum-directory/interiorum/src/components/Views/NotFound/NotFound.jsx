import { Button, Divider, HStack, Heading, Spacer, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import HomeHeader from "../Home/HomeHeader";
import { BRAND_COLOR_2 } from "../../../common/constants";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <VStack minH='100vh' minW='100%'>
            <HomeHeader />
            <VStack p={2} gap={2}>
                <VStack gap={2}>
                    <Heading as='h1' size='2xl' p={6}>404 Page Not Found</Heading>
                    <Text>Hmm... looks like the page you are trying to access doesn't exist... That's okay, though! </Text>
                    <Text>Why don't you head back to the home page and browse Interiorum from there? Or go ahead and log in or sign up!</Text>
                </VStack>
                <HStack h='100px' gap={6}>
                    <Button colorScheme='orange' onClick={() => navigate('home')}>Go to Home</Button>
                    <Divider orientation='vertical' borderColor={BRAND_COLOR_2} />
                    <VStack>
                        <Button colorScheme='telegram' w='100%' onClick={() => navigate('log-in')}>Log In</Button>
                        <Button colorScheme='orange' variant='outline' w='100%' onClick={() => navigate('sign-up')}>Sign Up</Button>
                    </VStack>
                </HStack>
            </VStack>
        </VStack>
    )
};

export default NotFound;
