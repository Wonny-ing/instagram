import UserSearch from '@/components/UserSearch';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    default: 'User Search',
    template: 'Search users to follow',
  },
};

export default function SearchPage() {
  return <UserSearch />;
}
