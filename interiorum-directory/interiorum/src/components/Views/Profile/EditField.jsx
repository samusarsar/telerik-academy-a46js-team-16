import { ButtonGroup, Editable, EditableInput, EditablePreview, Flex, FormControl, FormErrorMessage, HStack, IconButton, Input, useEditableControls } from '@chakra-ui/react';
import { useState } from 'react';
import { MdEdit, MdCheck, MdClose } from 'react-icons/md';
import { editUserNames } from '../../../services/users.service';

const EditField = ({ handle, firstName: currFirst, lastName: currLast, setContext }) => {
    const [input, setInput] = useState(`${currFirst} ${currLast}`);
    const [inputError, setInputError] = useState(false);
    const [firstName, setFirstName] = useState(currFirst);
    const [lastName, setLastName] = useState(currLast);

    const EditableControls = () => {
        let {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
        } = useEditableControls();

        const handleEdit = () => {
            if (input.split(' ').length !== 2) {
                setInputError('You need to set a first and last name!');
                return;
            }

            const names = input.split(' ');
            setFirstName(names[0]);
            setLastName(names[1]);
            if (firstName.length < 4 || lastName.length < 4) {
                setInputError('First and last names must have minimum 4 characters');
                return;
            }

            setInputError(false);
            // editUserNames({ handle, firstName, lastName }).then((thing) => console.log(thing));
        };

        return isEditing ? (
            <ButtonGroup justifyContent='center' size='xs'>
                <IconButton icon={<MdCheck/>} {...getSubmitButtonProps()} onSubmit={handleEdit} />
                <IconButton icon={<MdClose/>} {...getCancelButtonProps()} />
            </ButtonGroup>
        ) : (
            <Flex justifyContent='center' align='center'>
                <IconButton size='xs' icon={<MdEdit/>} {...getEditButtonProps()} />
            </Flex>
        );
    };

    return (
        <>
            <Editable
                textAlign='center'
                defaultValue={input}
                value={input}
                fontSize='1.8em'
                fontWeight='700'
                isPreviewFocusable={false}
                display='flex'
                gap={3}
            >
                {/* Here is the custom input */}
                <FormControl isInvalid={inputError}>
                    <HStack gap={3}>
                        <EditablePreview />
                        <Input as={EditableInput} onChange={(e) => setInput(e.target.value)}/>
                        <EditableControls />
                    </HStack>
                    <FormErrorMessage>{inputError}</FormErrorMessage>
                </FormControl>
            </Editable>
        </>
    );
};

export default EditField;
