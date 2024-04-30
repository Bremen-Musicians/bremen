'use client';

import useLoginCheck from '@/hooks/useLoginCheck';

export default function Page() {
  useLoginCheck({disqualified: '/user/login', qualified: '/mypage'});
  return <div>나는 마이페이지</div>;
}
