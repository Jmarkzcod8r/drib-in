

export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <main className="flex-grow container mx-auto px-4 bg-black-200"> {children}</main>
  );
}
