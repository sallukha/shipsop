import { createContext, useContext, useState } from "react";
const FilterContext = createContext();
const FilterProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [keyWord, setKeyWord] = useState("");
    return (
        // Provide all state and setters to the context
        <FilterContext.Provider
            value={{
                searchQuery,
                setSearchQuery,
                selectedCategory,
                setSelectedCategory,
                minPrice,
                setMinPrice,
                maxPrice,
                setMaxPrice,
                keyWord,
                setKeyWord,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};
export const useFilter = () => {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error("useFilter must be used within a FilterProvider");
    }
    return context;
};

export default FilterProvider;
