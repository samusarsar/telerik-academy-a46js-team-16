import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure, useToast } from '@chakra-ui/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const DeleteButton = ({ deleteType, deleteFunction, from }) => {

    const navigate = useNavigate();

    const toast = useToast();

    const handleDelete = () => {
        deleteFunction();
        onClose();
        toast({
            title: `${deleteType.toUpperCase()} deleted successfully`,
            status: 'info',
            duration: 3000,
            isClosable: true,
            position: 'top',
            variant: 'subtle',
        });
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();

    return (
        <div className='delete-button'>
            <Button h='30px' fontSize='0.8em' colorScheme='red' onClick={onOpen}>
                Delete {deleteType}
            </Button>

            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete {deleteType}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={handleDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </div>
    );
};

export default DeleteButton;
