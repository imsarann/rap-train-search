function NoResults() {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="text-gray-500">
          <p className="text-lg">No trains found for this route.</p>
          <p className="text-sm mt-2">Try different stations or check back later.</p>
        </div>
      </div>
    );
  }
  
  export default NoResults;
  