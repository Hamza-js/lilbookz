import Image from 'next/image';
import { siteConfig } from '../config/site.config';
import { useTheme } from 'next-themes';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconOnly?: boolean;
}

export default function Logo({ iconOnly = false, ...props }: IconProps) {
  const { theme } = useTheme();

  return (
    <>
      {theme === 'light' ? (
        <Image src={siteConfig.blackLogo} alt={siteConfig.title} height={100} />
      ) : (
        <Image src={siteConfig.blackLogo} alt={siteConfig.title} height={100} />
      )}
    </>
    // {!iconOnly && (

    // )}
  );
}
