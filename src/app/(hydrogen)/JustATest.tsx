import { metaObject } from '@/config/site.config';
import StudentCurrent from './students/current/page';

export const metadata = {
  ...metaObject(),
};

export default function FileDashboardPage() {
  return <StudentCurrent />;
}
