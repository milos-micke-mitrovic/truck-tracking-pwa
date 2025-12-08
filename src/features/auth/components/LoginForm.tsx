import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIonRouter } from '@ionic/react';
import { Button, Input, Alert } from '@/shared/ui';
import { loginSchema, type LoginFormData } from '../types/auth.schema';
import { useLogin } from '../hooks/use-login';

export function LoginForm() {
  const router = useIonRouter();
  const { login, isLoading, error, clearError } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    clearError();
    try {
      await login(data);
      router.push('/tabs/home', 'root', 'replace');
    } catch {
      // Error is handled by the hook and shown via Alert
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="login-form__fields">
          <Controller
            name="username"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Username"
                type="text"
                placeholder="Enter your username"
                error={errors.username?.message}
                value={value}
                onIonInput={(e) => onChange(e.detail.value ?? '')}
                onIonBlur={onBlur}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                error={errors.password?.message}
                value={value}
                onIonInput={(e) => onChange(e.detail.value ?? '')}
                onIonBlur={onBlur}
              />
            )}
          />
        </div>

        <div className="login-form__actions">
          <Button type="submit" fullWidth loading={isLoading}>
            Sign In
          </Button>
        </div>
      </form>

      <Alert
        isOpen={!!error}
        onClose={clearError}
        header="Login Failed"
        message={error?.message || 'An error occurred during login'}
        buttons={[{ text: 'Try Again' }]}
      />
    </>
  );
}
