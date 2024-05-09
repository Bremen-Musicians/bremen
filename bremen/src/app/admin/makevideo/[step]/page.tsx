'use client';

import {usePathname} from 'next/navigation';
import SelectVideo from '@/components/Admin/MakeVideo/Select/SelectVideo';
import EditVideo from '@/components/Admin/MakeVideo/Edit/EditVideo';
import IntroVideo from '@/components/Admin/MakeVideo/Intro/IntroVideo';

export default function Page() {
  const pathname = usePathname();

  return (
    <div>
      {pathname === '/admin/makevideo/1' && <SelectVideo />}
      {pathname === '/admin/makevideo/2' && <EditVideo />}
      {pathname === '/admin/makevideo/3' && <IntroVideo />}
    </div>
  );
}
