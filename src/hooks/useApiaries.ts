// useApiaries.ts
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  fetchApiaries,
  fetchApiaryDetails,
  createApiary,
  updateApiary,
  deleteApiary,
} from '../utils/api';

export const useApiaries = () => {
  return useQuery('apiaries', fetchApiaries);
};

export const useApiaryDetails = (id) => {
  return useQuery(['apiary', id], () => fetchApiaryDetails(id));
};

export const useCreateApiary = () => {
  const queryClient = useQueryClient();
  return useMutation(createApiary, {
    onSuccess: () => {
      queryClient.invalidateQueries('apiaries');
    },
  });
};

export const useUpdateApiary = () => {
  const queryClient = useQueryClient();
  return useMutation(updateApiary, {
    onSuccess: () => {
      queryClient.invalidateQueries('apiaries');
    },
  });
};

export const useDeleteApiary = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteApiary, {
    onSuccess: () => {
      queryClient.invalidateQueries('apiaries');
    },
  });
};