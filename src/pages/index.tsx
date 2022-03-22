import {
  Flex,
  FormControl,
  Button,
  Stack
} from '@chakra-ui/react'

import { SubmitHandler, useForm } from "react-hook-form";

import { Input } from '../components/Form/Input'

type SignInFormData = {
  email: string;
  password: string;
}

export default function SignIn() {

  const { register, handleSubmit, formState } = useForm()

  const { errors } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = (values) => {
    console.log(values);
  }


  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center">

      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={4}>

          <FormControl>

            <Input
              name="email"
              type="email"
              label="E-mail"
              error={errors.email}
              {...register('email', {
                required: 'E-mail é obrigatório',
              })}
            />

          </FormControl>

          <FormControl>

            <Input
              name="password"
              type="password"
              label="Senha"
              error={errors.password}
              {...register('password', {
                required: 'Por favor, digite uma senha',
              })}
            />            

          </FormControl>

        </Stack>

        <Button type="submit" mt="6" colorScheme="pink" size="lg">
          Entrar
        </Button>

      </Flex>

    </Flex>
  )
}
