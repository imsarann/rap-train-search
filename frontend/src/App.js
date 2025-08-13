import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const URL = 'http://localhost:5000/api';

function App() {
  const [stations, setStations] = useState([]);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const response = await axios.get(`${URL}/stations`);
      setStations(response.data);
    } catch (error) {
      console.error('Error fetching stations:', error);
      setError('Failed to fetch stations');
    }
  };

  const handleSearch = async () => {
    if (!source || !destination) {
      setError('Please select both source and destination stations');
      return;
    }

    if (source === destination) {
      setError('Source and destination cannot be the same');
      return;
    }

    setLoading(true);
    setError('');
    setSearchResults([]);

    try {
      const params = { source, destination };
      if (sortBy) {
        params.sort = sortBy;
      }

      const response = await axios.get(`${URL}/search`, { params });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching trains:', error);
      setError('Failed to search trains. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (sortValue) => {
    setSortBy(sortValue);
    if (searchResults.length > 0) {
      handleSearch();
    }
  };

  const clearResults = () => {
    setSearchResults([]);
    setSource('');
    setDestination('');
    setSortBy('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <header className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 shadow-2xl">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            {/* <div className="inline-block mb-6">
              <div className="text-7xl mb-4 animate-bounce">🚂</div>
            </div> */}
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Train Explorer
            </h1>
            <p className="text-lg text-emerald-100 font-medium max-w-2xl mx-auto">
              Discover seamless train journeys with intelligent route planning and real-time pricing
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-white text-sm font-medium">🚉 50+ Stations</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-white text-sm font-medium">🚀 Smart Routes</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-white text-sm font-medium">💰 Best Prices</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container min-h-[55vh] mx-auto px-6 py-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-emerald-700 mb-2">
                🚉 Source Station
              </label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-4 py-3 bg-white/70 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-emerald-800 placeholder-emerald-600 transition-all duration-300 hover:bg-white/90"
              >
                <option value="">Select source station</option>
                {stations.map((station) => (
                  <option key={station} value={station}>
                    {station}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-emerald-700 mb-2">
                🎯 Destination Station
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-3 bg-white/70 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-emerald-800 placeholder-emerald-600 transition-all duration-300 hover:bg-white/90"
              >
                <option value="">Select destination station</option>
                {stations.map((station) => (
                  <option key={station} value={station}>
                    {station}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={loading || !source || !destination}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-6 rounded-xl hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {loading ? (
                  <div className="inline-block mr-2 animate-spin">🔄</div>
                ) : (
                  <span className="mr-2">🔍</span>
                )}
                {loading ? 'Searching...' : 'Search Trains'}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
              ⚠️ {error}
            </div>
          )}
        </div>

        {searchResults.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-emerald-800 mb-2">
                  🎉 Search Results
                </h2>
                <p className="text-emerald-600 text-lg">
                  Found {searchResults.length} train(s) from {source} to {destination}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-6 lg:mt-0">
                <select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  className="px-4 py-3 bg-white/70 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent text-emerald-800 transition-all duration-300 hover:bg-white/90"
                >
                  <option value="">Sort by</option>
                  <option value="price">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                
                <button
                  onClick={clearResults}
                  className="px-6 py-3 text-emerald-600 border border-emerald-300 rounded-xl hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-emerald-50 transition-all duration-300"
                >
                  🗑️ Clear
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-emerald-200">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50/50">
                      🚂 Train Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50/50">
                      📍 Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50/50">
                      🕐 Departure
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50/50">
                      🕕 Arrival
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50/50">
                      📏 Distance
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-emerald-700 uppercase tracking-wider bg-emerald-50/50">
                      💰 Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/50 divide-y divide-emerald-100">
                  {searchResults.map((train, index) => (
                    <tr key={index} className="hover:bg-emerald-50/70 transition-all duration-300">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-emerald-800">
                          {train.trainName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                          train.type === 'Direct' 
                            ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white' 
                            : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white'
                        }`}>
                          {train.type === 'Direct' ? '🚀 Direct' : '🔄 Connecting'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-700 font-medium">
                        {train.departureTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-700 font-medium">
                        {train.arrivalTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-700 font-medium">
                        {train.distance} km
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                          ₹{train.price}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {searchResults.length === 0 && !loading && source && destination && !error && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-12 text-center">
            <div className="text-6xl mb-4 animate-pulse">🚫</div>
            <div className="text-emerald-800">
              <p className="text-2xl font-bold mb-2">No trains found for this route</p>
              <p className="text-emerald-600 text-lg">Try different stations or check back later</p>
            </div>
          </div>
        )}
      </div>

      <footer className=" h-[100px] bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 text-white py-8 mt-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-1 md:mb-0">
              <span className="text-2xl">🚂</span>
              <span className="text-lg font-semibold">Train Explorer</span>
            </div>
            {/* <div className="text-emerald-100 text-sm">
              © 2024 Train Explorer. Made with ❤️ for travelers worldwide.
            </div> */}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
