import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { login as loginApi } from '../../services/apiAuth';
export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending: isLoading, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log('user', user);
      queryClient.setQueryData(['user'], user.user);
      navigate('/dashboard');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isLoading, login };
}
