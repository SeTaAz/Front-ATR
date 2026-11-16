import { useState } from 'react';
import LoginComponent from '../components/LoginComponent';
import useLogin from '../hooks/useLogin';
import { requestPasswordResetMock } from '../services/loginService';

export default function LoginPage() {
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [resetError, setResetError] = useState('');
  const { error, isSubmitting, handleSubmit } = useLogin();

  async function handleResetPassword(event) {
    event.preventDefault();
    setIsSending(true);
    setResetError('');

    try {
      await requestPasswordResetMock(resetEmail);
      setEmailSent(true);
    } catch (requestError) {
      setResetError(
        requestError instanceof Error
          ? requestError.message
          : 'No fue posible completar la simulación.',
      );
    } finally {
      setIsSending(false);
    }
  }

  function handleCloseModal() {
    if (isSending) return;
    setShowForgotModal(false);
    setEmailSent(false);
    setResetEmail('');
    setResetError('');
  }

  return (
    <LoginComponent
      error={error}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
      onForgotPassword={() => setShowForgotModal(true)}
      resetModal={{
        isOpen: showForgotModal,
        emailSent,
        resetEmail,
        setResetEmail,
        isSending,
        error: resetError,
        onClose: handleCloseModal,
        onSubmit: handleResetPassword,
      }}
    />
  );
}
