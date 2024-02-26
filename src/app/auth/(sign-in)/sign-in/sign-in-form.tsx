'use client';

import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import { Password } from '@/components/ui/password';
import { useMedia } from '@/hooks/use-media';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import { Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/utils/validators/login.schema';
import axios from 'axios';
import baseUrl from '@/utils/baseUrl';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Spinner from '@/components/ui/spinner';
import { useState } from 'react';

const initialValues: LoginSchema = {
  email: 'info@lilbeatz.com',
  password: 'Popabear1',
  rememberMe: true,
};

export default function SignInForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await axios.post(
        `${baseUrl}/api/login`,
        formData,
        config
      );

      if (response.data.status === 401) {
        toast.error(<Text as="b">{response.data.message}</Text>);
      }

      if (response.data.status === 'logged_in') {
        localStorage.setItem('loggedInStatus', JSON.stringify(true));
        localStorage.setItem('userData', JSON.stringify(response.data));
        localStorage.setItem('userEmail', data.email);
        await handleTokenRequest();
      }
    } catch (error: any) {
      // console.error('Error:', error.response || error.message || error);
      toast.error(<Text as="b">An unexpected error occurred.</Text>);
    } finally {
      setLoading(false);
    }
  };

  const handleTokenRequest = async () => {
    const headers = {
      'Content-Type': 'application/json',
      // Cookie: 'PHPSESSID=5nt1jsu0ntc18vmat04jkq93t8',
    };

    const data = {
      grant_type: 'client_credentials',
      client_id: 'testclient',
      client_secret: 'testpass',
    };

    try {
      const response = await axios.post(`${baseUrl}/api/token.php`, data, {
        headers,
      });

      localStorage.setItem('tokenLilBookz', JSON.stringify(response.data));
      router.replace('/');
    } catch (error: any) {
      toast.error(
        <Text as="b">{error.error_description || 'Token request failed.'}</Text>
      );
    }
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5 lg:space-y-6">
            <Input
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size={isMedium ? 'lg' : 'xl'}
              className="[&>label>span]:font-medium"
              {...register('password')}
              error={errors.password?.message}
            />
            {/* <div className="flex items-center justify-end pb-1">
              <Link
                href={routes.auth.forgotPassword}
                className="h-auto p-0 text-sm font-semibold text-gray-700 underline transition-colors hover:text-primary hover:no-underline"
              >
                Forgot Password?
              </Link>
            </div> */}

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
                'Sign In'
              )}
            </Button>
          </div>
        )}
      </Form>
      {/* <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        Don’t have an account?{' '}
        <Link
          href={routes.auth.signUp}
          className="font-semibold text-gray-700 transition-colors hover:text-primary"
        >
          Sign Up
        </Link>
      </Text> */}
    </>
  );
}
