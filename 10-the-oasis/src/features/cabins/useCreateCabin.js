import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEditCabin as createEditCabinApi } from '../../services/apiCarbins';

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabinApi,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.success('New cabin successfully created');
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });

  return { isCreating, createCabin };
}
