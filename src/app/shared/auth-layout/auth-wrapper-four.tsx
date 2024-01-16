'use client';

import Link from 'next/link';
import { routes } from '@/config/routes';
import cn from '@/utils/class-names';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Title } from '@/components/ui/text';
import { PiArrowLineRight, PiUserCirclePlus } from 'react-icons/pi';
import { siteConfig } from '@/config/site.config';
import { useTheme } from 'next-themes';

function AuthNavLink({
  href,
  children,
}: React.PropsWithChildren<{
  href: string;
}>) {
  const pathname = usePathname();
  function isActive(href: string) {
    if (pathname === href) {
      return true;
    }
    return false;
  }

  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-x-1 rounded-3xl p-2 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 md:px-4 md:py-2.5 [&>svg]:w-4 [&>svg]:text-gray-500',
        isActive(href) ? 'bg-gray-100 text-gray-900 [&>svg]:text-gray-900' : ' '
      )}
    >
      {children}
    </Link>
  );
}

export default function AuthWrapperFour({
  children,
  title,
  isSignIn = false,
  className = '',
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  isSignIn?: boolean;
  className?: string;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col justify-between">
      <AuthHeader />

      <div className="flex w-full flex-col justify-center px-5">
        <div
          className={cn(
            'mx-auto w-full max-w-md py-12 md:max-w-lg lg:max-w-xl 2xl:pb-8 2xl:pt-2',
            className
          )}
        >
          <div className="flex flex-col items-center">
            <Link href={'/'} className="mb-7 inline-block max-w-[64px] lg:mb-9">
              <Image src={siteConfig.icon} alt={siteConfig.title} />
            </Link>
            <Title
              as="h2"
              className="mb-7 text-center text-[28px] font-bold leading-snug md:text-3xl md:!leading-normal lg:mb-10 lg:text-4xl"
            >
              {title}
            </Title>
          </div>

          {children}
        </div>
      </div>

      <AuthFooter />
    </div>
  );
}

function AuthHeader() {
  const { theme } = useTheme();

  return (
    <header className="flex items-center justify-between p-4 lg:px-16 lg:py-6 2xl:px-24">
      <Link href={'/'}>
        {theme === 'light' ? (
          <Image
            src={siteConfig.blackLogo}
            alt={siteConfig.title}
            height={100}
          />
        ) : (
          <Image
            src={siteConfig.whiteLogo}
            alt={siteConfig.title}
            height={100}
          />
        )}
      </Link>
      <div className="flex items-center space-x-2 md:space-x-4">
        <AuthNavLink href={routes.auth.signIn}>
          <PiArrowLineRight className="h-4 w-4" />
          <span>Login</span>
        </AuthNavLink>
        <AuthNavLink href={routes.auth.signUp}>
          <PiUserCirclePlus className="h-4 w-4" />
          <span>Sign Up</span>
        </AuthNavLink>
      </div>
    </header>
  );
}

const footerMenu = [
  {
    name: 'Help',
    href: '/',
  },
  {
    name: 'Privacy',
    href: '/',
  },
  {
    name: 'Terms',
    href: '/',
  },
];

function AuthFooter() {
  return (
    <footer className="flex flex-col-reverse items-center justify-between px-4 py-5 lg:flex-row lg:px-16 lg:py-6 2xl:px-24 2xl:py-10">
      <div className="text-center leading-relaxed text-gray-500 lg:text-start">
        © Copyright 2023. Theme by{' '}
        <Link
          href="https://redq.io/"
          className="font-medium transition-colors hover:text-primary"
        >
          RedQ
        </Link>
        , all rights reserved.
      </div>
      <div className="-mx-2.5 flex items-center justify-end pb-3 font-medium text-gray-700 lg:w-1/2 lg:pb-0">
        {footerMenu.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="px-2.5 py-1.5 transition-colors hover:text-primary"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </footer>
  );
}
