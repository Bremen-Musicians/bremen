/* eslint-disable no-console */
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import useStore from '@/hooks/useStore';
import useUserInfoStore, {IUserInfo} from '@/stores/UserInfo';

const useLoginCheck = ({
  qualified,
  disqualified,
}: {
  qualified: string;
  disqualified: string;
}) => {
  const router = useRouter();

  const userToken = useStore<IUserInfo, string>(
    useUserInfoStore,
    state => state.zustandToken,
  );

  useEffect(() => {
    if (userToken === '') {
      console.log('check', userToken);
      router.push(`${disqualified}`);
    } else {
      router.push(`${qualified}`);
    }
  }, [userToken, router, disqualified, qualified]);
};

export default useLoginCheck;
