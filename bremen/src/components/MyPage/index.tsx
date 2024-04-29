import MyPageHeader from '@/components/MyPage/Profile/MyPageHeader';
import MyInfo from './Profile/MyInfo';
import Tabs from './Plays/Tabs';
import MyButtons from './Profile/MyButtons';

export default function index() {
  return (
    <div>
      <MyPageHeader />
      <MyInfo />
      <MyButtons />
      <Tabs />
    </div>
  );
}
