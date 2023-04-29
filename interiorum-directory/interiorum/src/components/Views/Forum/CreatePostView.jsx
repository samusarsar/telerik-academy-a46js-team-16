import { Textarea, Stack, Button, Checkbox, Collapse, useDisclosure } from '@chakra-ui/react';
import { categories } from '../../../../data';

const CreatePostView = () => {

    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack>
            <Textarea bg="white" focusBorderColor='brand.400' size='lg' placeholder='Tell us the specific details here' />
            <Button onClick={onToggle}>Select category</Button>
            <Collapse in={isOpen} animateOpacity>
                <Stack borderRadius='10px' padding='10px' marginBottom='10px' bg='white'>
                    {categories.map(c => <Checkbox iconColor='brand.400' colorScheme='black' key={c}>{c}</Checkbox>)}
                </Stack>
                <Button width='100%'>Create</Button>

            </Collapse>
        </Stack>
    );
};

export default CreatePostView;
