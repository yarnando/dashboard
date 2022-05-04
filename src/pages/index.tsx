import {
  Flex,
  FormControl,
  Button,
  Stack
} from '@chakra-ui/react'

import { SubmitHandler, useForm } from "react-hook-form";

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '../components/Form/Input'
import { useRouter } from 'next/router';

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
})


export default function SignIn() {
  const router = useRouter()

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const { errors } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = (values) => {
    router.push('/users')
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
              {...register('email')}
            />

          </FormControl>

          <FormControl>

            <Input
              name="password"
              type="password"
              label="Senha"
              error={errors.password}
              {...register('password')}
            />            

          </FormControl>

        </Stack>

        <Button type="submit" mt="6" colorScheme="green" size="lg">
          Entrar
        </Button>

      </Flex>

    </Flex>
  )
}
