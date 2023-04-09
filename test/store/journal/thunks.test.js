import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  startLoadingNotes,
  startNewNote,
} from '../../../src/store/journal';
import { FirebaseDB } from '../../../src/firebase/config';
import { loadNotes } from '../../../src/helpers';

const deleteCollectionFirebase = async (uid) => {
  // Borrar coleccion de Firebase
  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
  const { docs } = await getDocs(collectionRef);

  await Promise.all(docs.map(({ ref }) => deleteDoc(ref)));
};

describe('Pruebas en JournalThunks', () => {
  const uid = 'TEST-UID';

  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => jest.clearAllMocks());
  afterAll(() => deleteCollectionFirebase(uid));

  test('startNewNote debe de crear uuna nueva nota en blanco', async () => {
    const uid = 'TEST-UID';
    getState.mockReturnValue({ auth: { uid } }); // Valor de una funcion corriente
    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(savingNewNote());

    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        id: expect.any(String),
        body: '',
        title: '',
        date: expect.any(Number),
        imageUrls: expect.any(Array),
      })
    );

    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        id: expect.any(String),
        body: '',
        title: '',
        date: expect.any(Number),
        imageUrls: expect.any(Array),
      })
    );
  });

  test('startLoadingNotes debe cargar las notas', async () => {
    getState.mockReturnValue({ auth: { uid } });

    const resp = await loadNotes(uid);

    await startLoadingNotes()(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(setNotes(resp));
  });
});
