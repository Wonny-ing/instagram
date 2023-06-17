import UserPosts from '@/components/UserPosts';
import UserProfile from '@/components/UserProfile';
import { getUserForProfile } from '@/service/user';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

type Props = {
  params: {
    username: string;
  };
};

// SSR이 될때, Metadata에서도 getUserForProfile을 호출하고, 실제 페이지 컴포넌트에서도 getUserForProfile을 호출함
// 여러번 호출하지 않고 한번만 호출하도록 재사용하려면 cache 사용하면 됨
// 그럼 이 페이지가 렌더링 되는 사이클 내에서는 cache된 결과를 반복해서 사용함
const getUser = cache(async (username: string) => getUserForProfile(username));

export default async function UserPage({ params: { username } }: Props) {
  // 상단: 사용자의 프로필 이미지 정보(username, name, 숫자)
  // 하단: 3개의 탭 (posts, liked, bookmarks)
  const user = await getUser(username);

  if (!user) {
    notFound();
  }

  return (
    <section className='w-full'>
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const user = await getUser(username);
  return {
    title: `${user?.name} (@${user?.username}) · Instantgram Photos`,
    description: `${user?.name}'s all Instantgram posts`,
  };
}
