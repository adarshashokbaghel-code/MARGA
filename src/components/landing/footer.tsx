export function Footer() {
  return (
    <footer className="border-t bg-muted/30 py-10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-semibold text-foreground">Marga.me</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Deep career self-knowledge for everyone.
        </p>
        <p className="mt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Marga. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
