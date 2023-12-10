import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useCheckout() {
  const queryClient = useQueryClient();

  const { isPending: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: (id) => updateBooking(id, { status: 'checked-out' }),
    onSuccess: (data) => {
      toast.success('Booking successfully checked out');
      queryClient.invalidateQueries({active: true});
    },
    onError: (err) => toast.error(err.message),
  });

  return { checkout, isCheckingOut };
}
