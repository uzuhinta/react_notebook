import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: updateUser,
    onSuccess: (user) => {
      // Invalidate and refetch
      queryClient.setQueryData(['user'], user.user);
      toast.success('Account successfully updated');
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });

  return { isLoading, mutate };
}
