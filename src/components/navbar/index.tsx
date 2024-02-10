import Link from 'next/link';
import { ModeToggle } from '../theme/theme-toggle';

export default function Navbar() {
  return (
    <div className="flex h-16 border-b border-slate-500 border-opacity-20">
      <header className="container flex items-center justify-between">
        <Link href="/">
          <span className="font-bold dark:text-white">TODO</span>
        </Link>
        <ModeToggle />
      </header>
    </div>
  );
}
