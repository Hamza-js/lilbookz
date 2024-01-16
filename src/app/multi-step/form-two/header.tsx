'use client';

import cn from '@/utils/class-names';
import Image from 'next/image';
import Link from 'next/link';
import StepCounter from '@/app/shared/multi-step/step-counter';
import {
  useStepperTwo,
  stepTwoTotalSteps,
} from '@/app/shared/multi-step/multi-step-2';
import { siteConfig } from '@/config/site.config';
import { useTheme } from 'next-themes';

interface FooterProps {
  className?: string;
}

export default function Header({ className }: FooterProps) {
  const { theme } = useTheme();
  const { step } = useStepperTwo();
  return (
    <header
      className={cn(
        'fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-gray-0/60 px-4 py-5 backdrop-blur-lg dark:bg-gray-100/5 md:h-20 md:px-5 lg:px-8 4xl:px-10',
        className
      )}
    >
      <Link href={'/'}>
        {theme === 'light' ? (
          <Image
            src={siteConfig.whiteLogo}
            alt={siteConfig.title}
            height={100}
          />
        ) : (
          <Image
            src={siteConfig.blackLogo}
            alt={siteConfig.title}
            height={100}
          />
        )}
      </Link>
      <StepCounter currentStep={step + 1} totalSteps={stepTwoTotalSteps} />
    </header>
  );
}
