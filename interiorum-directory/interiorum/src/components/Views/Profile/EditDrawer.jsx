import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Input,
    Button,
    useDisclosure,
    Icon,
    FormControl,
    FormLabel,
    FormErrorMessage,
    useToast,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react';
import { MdEdit } from 'react-icons/md';
import { useRef, useState } from 'react';
import { editUser, uploadAvatar } from '../../../services/users.service';

const EditDrawer = ({ handle, currFirstName, currLastName }) => {
    const [firstName, setFirstName] = useState(currFirstName);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastName, setLastName] = useState(currLastName);
    const [lastNameError, setLastNameError] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [avatarError, setAvatarError] = useState(false);
    const [newAvatarURL, setNewAvatarURL] = useState(null);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    const toast = useToast();

    const handleUpload = () => {
        const acceptedImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        setAvatarError(!acceptedImageTypes.includes(avatar.type));

        if (acceptedImageTypes.includes(avatar.type)) {
            setAvatarError(false);
            uploadAvatar({ handle, avatar })
                .then((imgURL) =>
                    setNewAvatarURL(imgURL))
                .then(() =>
                    toast({
                        title: 'Upload successful',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                        position: 'top',
                        variant: 'subtle',
                    }),
                );
        }
    };

    const handleEdit = () => {
        setFirstNameError(firstName.length < 4 || firstName.length > 32);
        setLastNameError(lastName.length < 4 || lastName.length > 32);

        if (firstName.length >= 4 && firstName.length <= 32 &&
            lastName.length >= 4 && lastName.length <= 32) {
            setFirstNameError(false);
            setLastNameError(false);

            editUser({ handle, firstName, lastName, avatarURL: newAvatarURL })
                .then(() => {
                    onClose();
                    toast({
                        title: 'Edit successful',
                        description: 'You have successfully edited your profile',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                        position: 'top',
                        variant: 'subtle',
                    });
                    setAvatar(null);
                    setNewAvatarURL(null);
                });
        }
    };

    return (
        <>
            <Icon as={MdEdit} onClick={onOpen} _hover={{ cursor: 'pointer' }}>
                Open
            </Icon>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Edit your profile</DrawerHeader>

                    <DrawerBody>
                        <FormControl isInvalid={firstNameError}>
                            <FormLabel>First Name</FormLabel>
                            <Input type='text' defaultValue={currFirstName} placeholder='John' onChange={(e) => setFirstName(e.target.value)} bg='brand.600' color='brand.500' />
                            <FormErrorMessage>First name should be between 4 and 32 characters.</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={lastNameError}>
                            <FormLabel>Last Name</FormLabel>
                            <Input type='text' defaultValue={currLastName} placeholder='Doherty' onChange={(e) => setLastName(e.target.value)} bg='brand.600' color='brand.500' />
                            <FormErrorMessage>Last name should be between 4 and 32 characters.</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={avatarError}>
                            <FormLabel htmlFor=''>Avatar</FormLabel>
                            <VStack justify='center'>
                                <Image mt={4} src={avatar && URL.createObjectURL(avatar)} />
                                <Text fontSize='0.8em'>{avatar ? avatar.name : 'No avatar uploaded.'}</Text>
                            </VStack>
                            <Menu>
                                <MenuButton
                                    mt={2}
                                    px={4}
                                    py={2}
                                    transition='all 0.2s'
                                    borderRadius='md'
                                    borderWidth='1px'
                                    _hover={{ bg: 'gray.400' }}
                                    _expanded={{ bg: 'blue.400' }}
                                    _focus={{ boxShadow: 'outline' }}
                                >
                                    File
                                </MenuButton>
                                <MenuList>
                                    <MenuItem><FormLabel>Choose File</FormLabel></MenuItem>
                                    <Input type='file' display='none' onChange={(e) => setAvatar(e.target.files[0])} />
                                    <MenuDivider />
                                    <MenuItem onClick={handleUpload}>Upload File</MenuItem>
                                    <MenuItem onClick={() => setAvatar(null)}>Delete File</MenuItem>
                                </MenuList>
                            </Menu>
                            <FormErrorMessage>Avatar should be a still image format.</FormErrorMessage>
                        </FormControl>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button isDisabled={avatar && !newAvatarURL} colorScheme='orange' onClick={handleEdit}>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default EditDrawer;
