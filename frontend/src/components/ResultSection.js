function ResultsSection({ results = [], source, destination, sortBy, onSortChange, onClear }) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Search Results
            </h2>
            <p className="text-gray-600">
              Found {results.length} train(s) from {source} to {destination}
            </p>
          </div>
          <SortAndClearBar sortBy={sortBy} onSortChange={onSortChange} onClear={onClear} />
        </div>
        <ResultsTable searchResults={results} />
      </div>
    );
  }
  