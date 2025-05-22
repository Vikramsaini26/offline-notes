interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search notes..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

export default SearchBar;