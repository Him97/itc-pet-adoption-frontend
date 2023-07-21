import { Container, Stack, Input, Button, Text, useToast } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react';

export default function FormHandler({ props }) {
    const [pokemon, setPokemon] = useState('');
    const [trainer, setTrainer] = useState('');
    const [episode, setEpisode] = useState('');
    const [username, setUsername] = useState('Xin');
    const [times, setTimes] = useState(0);
    const toast = useToast()

    const handleSubmit = () => {
        console.log({
            pokemon,
            trainer,
            episode,
            username,
        });
        setTimes((prevTimes) => prevTimes + 1);
    }

    useEffect(() => {
        toast({
            title: `Count sucessfully updated`,
            position: 'top-right',
            isClosable: true,
            colorScheme:'teal'
        })
    }, [times])

    return (
        <Container>
            <Stack spacing={3}>
                <Text>Welcome</Text>
                <Input focusBorderColor='teal' placeholder='Favorite Pokemon' value={pokemon} onChange={(e) => setPokemon(e.target.value)} />
                <Input focusBorderColor='teal' placeholder='Favorite Trainer' value={trainer} onChange={(e) => setTrainer(e.target.value)} />
                <Input focusBorderColor='teal' placeholder='Favorite Episode' value={episode} onChange={(e) => setEpisode(e.target.value)} />
                <Input focusBorderColor='teal' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <Button colorScheme='teal' type='button' onClick={() => {handleSubmit()}}>Submit</Button>
                <Text>Submitted {times} times</Text>
            </Stack>
        </Container>
    )
}