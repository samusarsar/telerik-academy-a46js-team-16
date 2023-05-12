import { DeleteIcon } from '@chakra-ui/icons';
// eslint-disable-next-line max-len
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, IconButton, useDisclosure, useToast } from '@chakra-ui/react';
import { useRef } from 'react';

import PropTypes from 'prop-types';

export const DeleteButton = ({ deleteType, single=false, deleteFunction }) => {

    const toast = useToast();

    const handleDelete = () => {
        deleteFunction()
            .then(() => {
                onClose();
                toast({
                    title: `${deleteType.toUpperCase()} deleted successfully`,
                    status: 'info',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                    variant: 'subtle',
                });
            })
            .catch(error => toast({
                title: `Error deleting ${deleteType}`,
                description: `${error.message}`,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
                variant: 'subtle',
            }));
    };

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();

    return (
        <div className='delete-button'>
            {!single ?
                <IconButton h='30px' w='30px' colorScheme='red' icon={<DeleteIcon />} onClick={onOpen} /> :
                <IconButton size='xs' colorScheme='red' icon={<DeleteIcon />} onClick={onOpen} />}

            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete {deleteType}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can&apos;t undo this action afterwards.
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

DeleteButton.propTypes = {
    deleteType: PropTypes.string.isRequired,
    single: PropTypes.bool,
    deleteFunction: PropTypes.func.isRequired,
};

export default DeleteButton;
