'use client'

import Link from 'next/link';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMedia } from '@/hooks/use-media';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
import {
  forgetPasswordSchema,
  ForgetPasswordSchema,
} from '@/utils/validators/forget-password.schema';
import baseUrl from '@/utils/baseUrl';
import Spinner from '@/components/ui/spinner';

const initialValues = {
  email: '',
};

export default function ForgetPasswordForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<ForgetPasswordSchema> = async (data) => {
    try {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer fcbde38ddf36656cf3faec0846b61d19dae6eccd");
      myHeaders.append("Cookie", "PHPSESSID=kv8o99sccp06ji9ro4c2gmj3is");

      const formdata = new FormData();
      formdata.append("email", data.email);

      const requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      const response = await fetch(`${baseUrl}/api/forgotpassword`, requestOptions);
      const result = await response.json();

      // console.log(result); 
      toast.success( 
        <Text>
          Reset link sent to this email:
          <Text as="b" className="font-semibold">
            {data.email}
          </Text>
        </Text>
      );
      setReset(initialValues);
    } catch (error) {
      console.error('Error:', error);
      // Handle error here
    } finally{
      setLoading(false);
    }
  };

  return (
    <>
      <Form<ForgetPasswordSchema>
        validationSchema={forgetPasswordSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-6">
            <Input
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
            />
            <Button
              className="w-full"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
            >
              {loading ? (
                <div className="m-auto">
                  <Spinner size="sm" className="text-white" />
                </div>
              ) : (
                'Reset Password'
              )}
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        Don’t want to reset?{' '}
        <Link
          href={routes.auth.signIn}
          className="font-semibold text-gray-700 transition-colors hover:text-primary"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
