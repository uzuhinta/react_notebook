import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../../services/apiBookings';

export function useActivityTodayStays() {
  const { isLoading, data: stays } = useQuery({
    queryKey: ['today-activiry'],
    queryFn: getStaysTodayActivity,
  });

  return { isLoading, stays };
}
