import { Badge } from '@/components/ui/badge';
import { ActionIcon } from '@/components/ui/action-icon';
import MessagesDropdown from '@/layouts/messages-dropdown';
import NotificationDropdown from '@/layouts/notification-dropdown';
import ProfileMenu from '@/layouts/profile-menu';
import SettingsButton from '@/components/settings/settings-button';
import RingBellSolidIcon from '@/components/icons/ring-bell-solid';
import ChatSolidIcon from '@/components/icons/chat-solid';

export default function HeaderMenuRight() {
  return (
    <div className="ms-auto flex shrink-0 items-center justify-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
      <SettingsButton />
      <ProfileMenu />
    </div>
  );
}
