import { ChangeEvent, FC } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <input
            type="text"
            placeholder="Buscar..."
            onChange={handleChange}
        />
    );
};

export default SearchBar;
