import { BackButton } from "./Button";
import { SearchBar } from "./SearchBar";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
  showBackButton?: boolean;
  showSearchBar?: boolean;
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
}

export const Layout = ({
  title,
  children,
  showBackButton = false,
  showSearchBar = false,
  value,
  onChange,
  placeholder,
}: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {(title || showSearchBar) && (
        <header className="sticky top-0 z-20 border-b bg-white">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {showBackButton && <BackButton />}
              {title && (
                <h1 className="text-xl font-semibold text-gray-900">
                  {title}
                </h1>
              )}
            </div>

            {showSearchBar && value !== undefined && onChange && (
              <SearchBar
                value={value}
                onChange={onChange}
                placeholder={placeholder}
              />
            )}
          </div>
        </header>
      )}

      <main className="mx-auto max-w-7xl px-6 py-8">
        {children}
      </main>
    </div>
  );
};
