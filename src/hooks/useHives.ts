// useHives.ts
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  fetchHives,
  fetchHiveDetails,
  createHive,
  updateHive,
  deleteHive,
} from '../utils/api';

export const useHives = (apiaryId) => {
  return useQuery(['hives', apiaryId], () => fetchHives(apiaryId));
};

export const useHiveDetails = (id) => {
  return useQuery(['hive', id], () => fetchHiveDetails(id));
};

export const useCreateHive = () => {
  const queryClient = useQueryClient();
  return useMutation(createHive, {
    onSuccess: () => {
      queryClient.invalidateQueries('hives');
    },
  });
};

export const useUpdateHive = () => {
  const queryClient = useQueryClient();
  return useMutation(updateHive, {
    onSuccess: () => {
      queryClient.invalidateQueries('hives');
    },
  });
};

export const useDeleteHive = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteHive, {
    onSuccess: () => {
      queryClient.invalidateQueries('hives');
    },
  });
};