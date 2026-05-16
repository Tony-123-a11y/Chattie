export default function Footer() {
  return (
    <footer className="border-t border-border/30 mt-10 py-8 text-center text-sm text-text-muted">
      © {new Date().getFullYear()} Chattie. All rights reserved.
    </footer>
  );
}