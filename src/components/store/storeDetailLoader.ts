import { QueryClient } from '@tanstack/react-query';
import { storeQuery, archivesQuery, commentsQuery } from './queries/queries';
import { LoaderFunctionArgs } from 'react-router-dom';

const storeDetailLoader =
  (queryClient: QueryClient) =>
  async ({ params: { storeId } }: LoaderFunctionArgs) => {
    const tasks = [
      queryClient.ensureQueryData(storeQuery(storeId)),
      queryClient.ensureQueryData(archivesQuery(storeId)),
      queryClient.ensureQueryData(commentsQuery({ storeId, currentPage: 1 })),
    ];

    const result = await Promise.all(tasks);
    console.log('result: ', result);
    return result;
  };

export default storeDetailLoader;
