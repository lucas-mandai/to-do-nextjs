import { Separator } from '../ui/separator';

export default function Footer() {
  return (
    <footer className="mt-auto pb-8">
      <Separator className="mb-8" />
      <section className="flex justify-center">
        <span className="text-muted-foreground">
          &copy; 2024 Lucas Mandai. All rights reserved.
        </span>
      </section>
    </footer>
  );
}
