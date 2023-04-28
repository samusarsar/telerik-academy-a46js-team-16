import { Textarea, Stack, Button, Checkbox, Collapse, useDisclosure } from '@chakra-ui/react';
import { categories } from '../../../../data';

const CreatePostView = () => {

    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack>
            <Textarea size='lg' placeholder='Tell us the specific details here' />
            <Button onClick={onToggle}>Select category</Button>
            <Collapse in={isOpen} animateOpacity>
                <Stack>
                    {categories.map(c => <Checkbox key={c}>{c}</Checkbox>)}
                </Stack>
                <Button>Create</Button>

            </Collapse>
        </Stack>
    );
};

export default CreatePostView;
