interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="relative min-h-svh bg-gradient-to-br from-amber-200 via-orange-100 to-orange-300 flex items-center justify-center p-6 md:p-10 overflow-hidden">
      <div className="relative z-10 w-full max-w-sm md:max-w-3xl">
        {children}
      </div>
    </div>
  );
};

export default Layout;
