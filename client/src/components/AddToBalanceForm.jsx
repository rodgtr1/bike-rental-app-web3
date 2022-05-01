import { useForm } from 'react-hook-form'
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    Text,
    Flex
} from '@chakra-ui/react'
import { useContext } from 'react'
import { BlockchainContext } from '../context/BlockchainContext'

export default function AddToBalanceForm() {
    const { deposit } = useContext(BlockchainContext)
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

    const onSubmit = async (values) => {
        console.log(JSON.stringify(values, null, 2))
        const {creditbalance} = values;
        await deposit(creditbalance);
    }

    return (
        <Flex justifyContent={'center'} alignItems={'center'} p={5} mt={10}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Text
            fontFamily={'heading'}
            fontSize={'x-large'}
            fontWeight={600}
            mb={4}>
                Credit Your Account
            </Text>
            <FormControl isInvalid={errors.creditbalance}>
                <Input
                    id='creditbalance'
                    type="number"
                    step="any"
                    placeholder='Creditbalance'
                    {...register('creditbalance', {
                        required: 'This is required'
                    })}
                />
                <FormErrorMessage>
                    {errors.creditbalance && errors.creditbalance.message}
                </FormErrorMessage>
            </FormControl>
            <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                Submit
            </Button>
        </form>
        </Flex>
    )
}