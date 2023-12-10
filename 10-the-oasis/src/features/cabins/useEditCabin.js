import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEditCabin as createEditCabinApi } from '../../services/apiCarbins';

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabinApi(newCabinData, id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      toast.success('Cabin successfully edited');
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });

  return { isEditing, editCabin };
}
