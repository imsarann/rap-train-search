function SortAndClearBar({ sortBy, onSortChange, onClear }) {
    return (
      <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Sort by</option>
          <option value="price">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
        <button
          onClick={onClear}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Clear
        </button>
      </div>
    );
  }
  
  export default SortAndClearBar;
  