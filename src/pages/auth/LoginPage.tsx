import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

// Import local components
import NavBar from '@/components/layout/NavBar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Import services and utilities
import { useToast } from '@/hooks/use-toast';
import axiosInstance from '@/lib/axios';
import { storageHandler } from '@/lib/localStorage';
import { errHandler } from '@/lib/utils';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axiosInstance.post('/auth/login', values);
      storageHandler.setToken(response.data.accessToken);
      toast.toast({
        title: 'Login Successful',
        description: 'You have successfully logged in.',
        variant: 'success',
      });
      navigate('/');
    } catch (err) {
      console.error('An error occurred while trying to log in', err);
      toast.toast({
        title: 'Login Failed',
        description: errHandler(err),
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <header>
        <NavBar />
      </header>

      <main className="grid justify-items-center px-5 lg:px-20 py-[150px] xl:pt-[100px]">
        <div className="text-center">
          <h1 className="mb-1 text-xl lg:text-3xl font-semibold">
            Log in to Your Account
          </h1>
          <h2 className="lg:text-lg opacity-80">
            Log in to your account to be able to access the full functionalities
            of African AI Network
          </h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-14 w-full lg:max-w-[80%] space-y-6"
            aria-disabled={form.formState.isSubmitting}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      aria-label="Email"
                      placeholder="Enter your email"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        aria-label="Password"
                        placeholder="Enter your password"
                        {...field}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        title={showPassword ? 'Hide password' : 'Show password'}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="w-4 h-4" />
                        ) : (
                          <EyeIcon className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={rememberMe}
                  onCheckedChange={(value: boolean) => setRememberMe(value)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember Me
                </label>
              </div>

              <Button variant="link" asChild>
                <a href="#">Forgot Password?</a>
              </Button>
            </div>

            <Button
              disabled={
                form.formState.isSubmitting ||
                Object.keys(form.formState.errors).length > 0
              }
              className="font-bold w-full"
              type="submit"
            >
              {form.formState.isSubmitting ? (
                <span className="flex gap-2 items-center">
                  <Loader2 className="animate-spin w-4 h-4" />
                  Please wait
                </span>
              ) : (
                'LOG IN'
              )}
            </Button>
          </form>
        </Form>
      </main>

      <footer className="bg-primary text-primary-foreground min-h-[400px] grid text-center place-items-center">
        <div className="flex flex-col gap-3 text-xl lg:text-2xl lg:max-w-[500px] px-2">
          <h3 className="font-bold">Don't have an account yet?</h3>
          <p className="text-lg lg:text-xl">
            Let's get you all set up so you can have your first onboarding
            experience
          </p>

          <Button
            asChild
            className="font-bold w-fit mx-auto border-white bg-transparent"
            size="lg"
            variant="outline"
          >
            <a href="/auth/signup">SIGN UP</a>
          </Button>
        </div>
      </footer>
    </>
  );
};

export default LoginPage;