import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithMock } from '../services/loginService';

export default function useLogin() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const credentials = {
      email: String(formData.get('email') || '').trim(),
      password: String(formData.get('password') || ''),
    };

    try {
      await loginWithMock(credentials);
      navigate('/dashboard', { replace: true });
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : 'No fue posible completar el ingreso de demostración.',
      );
    } finally {
      setIsSubmitting(false);
    }

  }

  return { error, isSubmitting, handleSubmit };
}