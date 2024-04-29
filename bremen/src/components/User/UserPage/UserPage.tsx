import UserPageHeader from './Profile/MyPageHeader';
import UserInfo from './Profile/MyInfo';
import UserButtons from './Profile/MyButtons';
import Tabs from './Plays/Tabs';

export default function UserPage() {
  return (
    <div>
      <UserPageHeader />
      <UserInfo />
      <UserButtons />
      <Tabs />
    </div>
  );
}
