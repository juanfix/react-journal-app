import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from '../../../src/firebase/providers';
import {
  checkingCredentials,
  login,
  logout,
  startCreatingUserWithEmailPassword,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout,
} from '../../../src/store/auth';
import { checkingAuthenticacion } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => {
  const dispatch = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test('Debe de invocar el checkingCredentials', async () => {
    await checkingAuthenticacion()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test('startGoogleSignIn debe de llamar checkingCredentials y login - Exito', async () => {
    const loginData = { ok: true, ...demoUser };
    await signInWithGoogle.mockResolvedValue(loginData);

    // thunk
    await startGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error', async () => {
    const loginData = { ok: false, errorMessage: 'Google error' };
    await signInWithGoogle.mockResolvedValue(loginData);

    // thunk
    await startGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  test('startCreatingUserWithEmailPassword debe de llamar checkingCRedentials y registerUserWithEmailPassword - Exito', async () => {
    const createData = { ok: true, ...demoUser };
    const formData = {
      email: demoUser.email,
      password: '123456',
      displayName: demoUser.displayName,
    };
    await registerUserWithEmailPassword.mockResolvedValue(createData);

    //thunk
    await startCreatingUserWithEmailPassword(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login({ ...demoUser }));
  });

  test('startCreatingUserWithEmailPassword debe de llamar checkingCRedentials y logout - Error', async () => {
    const createData = {
      ok: false,
      errorMessage: 'Firebase error!',
    };
    const formData = {
      email: demoUser.email,
      password: '654321',
      displayName: demoUser.displayName,
    };
    await registerUserWithEmailPassword.mockResolvedValue(createData); // Valor de una funcion asincrona

    //thunk
    await startCreatingUserWithEmailPassword(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      logout({ errorMessage: 'Firebase error!' })
    );
  });

  test('startLoginWithEmailPassword debe de llamar checkingCRedentials y login - Exito', async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: '123456' };
    await loginWithEmailPassword.mockResolvedValue(loginData);

    //thunk
    await startLoginWithEmailPassword(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startLoginWithEmailPassword debe de llamar checkingCRedentials y logout - Error', async () => {
    const loginData = { ok: false, errorMessage: 'Authentication error' };
    const formData = { email: demoUser.email, password: '654321' };
    await loginWithEmailPassword.mockResolvedValue(loginData);

    //thunk
    await startLoginWithEmailPassword(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  test('startLogout debe de llamar logourFirebase, clearNotes y logout', async () => {
    await startLogout()(dispatch);

    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: null }));
  });
});
