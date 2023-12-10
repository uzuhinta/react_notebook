import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBooking } from '../../services/apiBookings';

export function useBooking() {
  let { bookingId } = useParams();

  const { isLoading, data: booking } = useQuery({
    queryKey: ['booking', +bookingId],
    queryFn: () => getBooking(+bookingId),
  });

  return { isLoading, booking };
}
