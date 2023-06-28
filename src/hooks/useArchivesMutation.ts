import axios from 'axios';
import useDataMutation from './useDataMutaiton';
import { archiveQueryKey } from '../constants/index';

const archiveURL = '/api/archives';

interface ArchiveType {
  storeId: string;
  email: string;
}

interface ArchivesType {
  archivesData: ArchiveType[];
  totalArchivesCnt: number;
  isUserArchived: boolean;
}

const useArchivesMutation = (storeId: string) => {
  const { mutate: addBookMark } = useDataMutation<ArchiveType, ArchivesType>({
    mutationFn: newArchive => axios.post(`${archiveURL}`, newArchive),
    // eslint-disable-next-line consistent-return
    onMutate: newArchive => archives => {
      if (archives) return { ...archives, archivesData: [...archives.archivesData, newArchive] };
    },
    queryKey: [...archiveQueryKey, storeId],
  });

  const { mutate: deleteBookMark } = useDataMutation<ArchiveType, ArchivesType>({
    mutationFn: archiveToDelete => axios.delete(`${archiveURL}`, { data: archiveToDelete }),
    onMutate: archiveToDelete => archives => {
      if (archives)
        // eslint-disable-next-line no-unsafe-optional-chaining
        return {
          ...archives,
          archiveData: archives?.archivesData.filter(
            archive => archive.email !== archiveToDelete.email && archive.storeId !== archiveToDelete.storeId
          ),
        };
    },
    queryKey: [...archiveQueryKey, storeId],
  });

  return { addBookMark, deleteBookMark };
};

export default useArchivesMutation;
