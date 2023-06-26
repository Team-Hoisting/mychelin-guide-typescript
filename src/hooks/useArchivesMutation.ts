import axios from 'axios';
import { useRecoilState } from 'recoil';
import useDataMutation from './useDataMutaiton';
import userState from '../recoil/atoms/userState';
import { archiveQueryKey } from '../constants/index';

const archiveURL = '/api/archives';

const useArchivesMutation = ({ storeId, setArchiveCntState }) => {
  const [user, setUser] = useRecoilState(userState);

  const { mutate: addBookMark } = useDataMutation({
    mutationFn: newBookMark => axios.post(`${archiveURL}`, newBookMark),
    onMutate: newBookMark => () => {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const newUser = { ...user, archived: [...user?.archived, newBookMark] };
      setUser(newUser);
      setArchiveCntState(prev => prev + 1);
      return newUser;
    },
    queryKey: [...archiveQueryKey, storeId, user?.email],
  });

  const { mutate: deleteBookMark } = useDataMutation({
    mutationFn: bookMarkToDelete => axios.delete(`${archiveURL}`, { data: bookMarkToDelete }),
    onMutate: bookMarkToDelete => () => {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const [{ archiveId: deleteSeq }] = user?.archived.filter(
        arc => arc.storeId === bookMarkToDelete.storeId && arc.email === user?.email
      );

      const newUserData = {
        ...user,
        archived: user?.archived?.filter(({ archiveId }) => archiveId !== deleteSeq),
      };

      setUser(newUserData);
      setArchiveCntState(prev => prev - 1);

      return newUserData;
    },
    queryKey: [...archiveQueryKey, storeId, user?.email],
  });

  return { addBookMark, deleteBookMark };
};

export default useArchivesMutation;
