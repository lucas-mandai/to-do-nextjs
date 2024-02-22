import Link from 'next/link';
import { ModeToggle } from '../theme/theme-toggle';
import Image from 'next/image';

export default function Navbar() {
  return (
    <div className="flex h-16 border-b border-slate-500 border-opacity-20">
      <header className="container flex items-center justify-between">
        <Link href="/">
          <Image src="/logo-todo.png" width="70" height="70" alt="logo"></Image>
        </Link>
        <ModeToggle />
      </header>
    </div>
  );
}
