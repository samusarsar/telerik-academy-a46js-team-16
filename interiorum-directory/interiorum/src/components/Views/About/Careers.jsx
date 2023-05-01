import { Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button, HStack, VStack, Icon, Link, CardHeader, InputGroup, InputLeftElement, Input, useDisclosure, Alert, AlertIcon, Box, AlertTitle, AlertDescription, CloseButton, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';

const Careers = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

    const handleSend = () => {
        setEmailError(!email.includes('@'));
        if (email.includes('@')) {
            onOpen();
            setEmail('');
        }
    };

    return (
        <VStack gap={4}>
            <Heading as='h2'>Career Opportunities at Interiorum</Heading>
            <Text>Don't wait another moment to begin building towards your professional goals and start at a bubbling work environment - right here at <b>Interiorum HQ</b>!</Text>
            <VStack justify='center' gap={10} py={4}>
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='elevated'
                    boxShadow='xl'
                    h='200px'
                    w='80%'
                    transition='0.2s ease-in-out'
                    _hover={{ transform: 'scale(1.05)' }}
                >
                    <Image
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '400px' }}
                        src='https://images.unsplash.com/photo-1559136656-3db4bf6c35f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80'
                        alt='Caffe Latte'
                    />
                    <Stack>
                        <CardHeader pb={0}>
                            <Heading size='md'>Creative and Innovative Environment</Heading>
                        </CardHeader>
                        <CardBody>

                            <Text py='2'>
                                Joininng the Interiorum team means you will be wokring
                                shoulder to shoulder with creative and innovative minds, re-shaping the industry!
                            </Text>
                        </CardBody>
                    </Stack>
                </Card>

                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='elevated'
                    boxShadow='xl'
                    h='200px'
                    w='80%'
                    transition='0.2s ease-in-out'
                    _hover={{ transform: 'scale(1.05)' }}
                >
                    <Stack>
                        <CardHeader pb={0}>
                            <Heading size='md'>Dynamic Workplace</Heading>
                        </CardHeader>
                        <CardBody>
                            <Text py='2'>
                                Interiorum's HQ is in Sofia, Bulgaria and in features a state-of-the-art
                                open-office ennviornment. Come by for a coffee to check it out!
                            </Text>
                        </CardBody>
                    </Stack>
                    <Image
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '400px' }}
                        src='https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
                        alt='Caffe Latte'
                    />
                </Card>

                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='elevated'
                    boxShadow='xl'
                    h='200px'
                    w='80%'
                    transition='0.2s ease-in-out'
                    _hover={{ transform: 'scale(1.05)' }}
                >
                    <Image
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '400px' }}
                        src='https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                        alt='Caffe Latte'
                    />
                    <Stack>
                        <CardHeader pb={0}>
                            <Heading size='md'>Professional Growth</Heading>
                        </CardHeader>
                        <CardBody>

                            <Text py='2'>
                                At Interiorum we don't shy away from challenges! Working here you will have to
                                think creatively and out-of-the-box, sharpeninng your skillset at all times!
                            </Text>
                        </CardBody>
                    </Stack>
                </Card>
            </VStack>

            <VStack>
                <Heading as='h3' size='lg'>Ready to jump in?</Heading>
                <Text>We're always hiring! Leave your email below and we'll get back to you ASAP!</Text>
                <InputGroup w='400px' py={4}>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<Icon as={AiOutlineMail} color='brand.200' boxSize='20px'/>}
                            mt={4}
                        />
                        <FormControl isInvalid={emailError}>
                            <Input pl={12} bg='brand.600' color='brand.500' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <FormErrorMessage>Email address is not valid.</FormErrorMessage>
                    </FormControl>
                </InputGroup>
                {isOpen ? (
                    <Alert status='success'>
                        <AlertIcon />
                        <Box>
                            <AlertTitle>Thank you for reaching out!</AlertTitle>
                            <AlertDescription>
                                Your email address has been received. A representative of the Interiorum
                                team will get in touch with you ASAP!
                            </AlertDescription>
                        </Box>
                        <CloseButton
                            alignSelf='flex-start'
                            position='relative'
                            right={-1}
                            top={-1}
                            onClick={onClose}
                        />
                    </Alert>
                ) : (
                    <Button onClick={handleSend}>Send Details</Button>
                )}
            </VStack>
        </VStack>
    );
};

export default Careers;
