const SIMULATED_DELAY_MS = 500;
const PASSWORD_RESET_DELAY_MS = 1500;

function wait(duration) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
}

export async function loginWithMock({ email, password }) {
  await wait(SIMULATED_DELAY_MS);
  if (!email || !password) {
    throw new Error('Ingresa un correo y una contraseña para continuar.');
  }

  return {
    email,
    name: email.split('@')[0],
  };
}

export async function requestPasswordResetMock(email) {
  await wait(PASSWORD_RESET_DELAY_MS);
  if (!email) {
    throw new Error('Ingresa un correo electrónico para continuar.');
  }

  return { email };
}