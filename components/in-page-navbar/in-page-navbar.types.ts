import { MotionValue } from "motion";

interface NavSection {
  label: string;
  id: string;
}

interface NavButtonGroupProps {
  sections: NavSection[];
  isServer: boolean;
  className?: string;
}

interface NavItemProps extends NavSection {
  scrollY: MotionValue<number>;
  isServer: boolean;
}

interface InPageNavbarProps {
  Logo: React.ReactNode;
  sections: NavSection[];
}

export type { InPageNavbarProps, NavButtonGroupProps, NavItemProps };
