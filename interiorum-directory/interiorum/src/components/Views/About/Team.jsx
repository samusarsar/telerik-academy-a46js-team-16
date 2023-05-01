import { Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button, HStack, VStack, Icon, Link } from '@chakra-ui/react';
import { AiOutlinePhone, AiOutlineMail } from 'react-icons/ai';

const Team = () => {
    return (
        <VStack gap={4}>
            <Heading as='h2'>Meet the Interiorum team!</Heading>
            <Text>Following the astounding success of <b>GIFlamingo</b> - the infamous Team 16 graduated to bigger and better endeavour, bringing you Interiorum!</Text>
            <HStack justify='center' gap={10}>
                <Card maxW='sm'>
                    <CardBody>
                        <Image
                            src='src/assets/images/anon-user.jpg'
                            alt='Simona Ilcheva'
                            borderRadius='lg'
                        />
                        <Stack mt='6' spacing='3'>
                            <Heading size='md'>Simona Ilcheva</Heading>
                            <Text>
                                Lorem ipsum d officbis. Est nam facilis quaerat soluta officiis ducimus porro asperiores! Delectus neque velit inventore illo ratione similique, blanditiis optio ut deleniti rerum. Libero hic odio assumenda nemo.
                            </Text>
                        </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter ml='auto' mr='auto' h='80px'>
                        <ButtonGroup spacing='2'>
                            <Link href='tel:1231231234' data-rel='external'>
                                <Button variant='solid' colorScheme='blue' transition='.2s ease-in-out' _hover={{ mt: '-1' }}>
                                    <Icon as={AiOutlinePhone} mr={2}/>Call
                                </Button>
                            </Link>
                            <Link href='mailto:test@abv.bg' data-rel='external'>
                                <Button variant='ghost' colorScheme='orange' transition='.2s ease-in-out' _hover={{ mt: '-1' }}>
                                    <Icon as={AiOutlineMail} mr={2}/>Email
                                </Button>
                            </Link>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
                <Card maxW='sm'>
                    <CardBody>
                        <Image
                            src='src/assets/images/anon-user.jpg'
                            alt='Samuil Sarandev'
                            borderRadius='lg'
                        />
                        <Stack mt='6' spacing='3'>
                            <Heading size='md'>Samuil Sarandev</Heading>
                            <Text>
                                Lorem ipsum d officbis. Est nam facilis quaerat soluta officiis ducimus porro asperiores! Delectus neque velit inventore illo ratione similique, blanditiis optio ut deleniti rerum. Libero hic odio assumenda nemo.
                            </Text>
                        </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter ml='auto' mr='auto' h='80px'>
                        <ButtonGroup spacing='2'>
                            <Link href='tel:0886578988' data-rel='external'>
                                <Button variant='solid' colorScheme='blue' transition='.2s ease-in-out' _hover={{ mt: '-1' }}>
                                    <Icon as={AiOutlinePhone} mr={2}/>Call
                                </Button>
                            </Link>
                            <Link href='mailto:samuil.sarandev@gmail.com' data-rel='external'>
                                <Button variant='ghost' colorScheme='orange' transition='.2s ease-in-out' _hover={{ mt: '-1' }}>
                                    <Icon as={AiOutlineMail} mr={2}/>Email
                                </Button>
                            </Link>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
            </HStack>
        </VStack>
    );
};

export default Team;
