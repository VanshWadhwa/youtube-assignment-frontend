import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const [totalVideos, setTotalVideos] = useState(0);

    const fetchVideos = async (page, limit, sortOrder) => {
        try {
            const response = await axios.get(`/api/video?page=${page}&limit=${limit}&sortOrder=${sortOrder}`);
            setVideos(response.data.videos);
            setTotalVideos(response.data.total);
        } catch (error) {
            console.error(error);
        }
    };

    const searchVideos = async (page, limit, sortOrder) => {
        if (!searchQuery.trim()) {
            fetchVideos(page, limit, sortOrder);
            return;
        }

        try {
            const response = await axios.get(`/api/video/search?query=${searchQuery}&page=${page}&limit=${limit}&sortOrder=${sortOrder}`);
            setVideos(response.data.videos);
            setTotalVideos(response.data.total);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchVideos(page, limit, sortOrder);
    }, [page, limit, sortOrder]);

    const handleSearch = () => {
        setPage(1);
        searchVideos(1, limit, sortOrder);
    };

    const resetSearch = () => {
        setSearchQuery('');
        setPage(1);
        fetchVideos(1, limit, sortOrder);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
        setPage(1);
    };

    const handleLimitChange = (e) => {
        setLimit(Number(e.target.value));
        setPage(1);
    };

    const startCronJob = async () => {
        try {
            await axios.post(`/api/cron/start`);
            alert('Cron job started!');
        } catch (error) {
            console.error(error);
            alert('Error starting cron job.');
        }
    };

    const stopCronJob = async () => {
        try {
            await axios.post(`/api/cron/stop`);
            alert('Cron job stopped!');
        } catch (error) {
            console.error(error);
            alert('Error stopping cron job.');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-6 text-red-700">Video Library</h1>

            <div className="flex justify-between mb-6">
                <div>
                    <button onClick={startCronJob} className="bg-green-600 text-white py-2 px-4 rounded shadow hover:bg-green-700 hover:scale-105 transition-all">
                        Start Cron Job
                    </button>
                    <button onClick={stopCronJob} className="bg-red-600 text-white py-2 px-4 rounded shadow hover:bg-red-700 hover:scale-105 transition-all ml-2">
                        Stop Cron Job
                    </button>
                </div>
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search videos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border border-gray-300 p-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-red-500 mr-2 transition-all"
                    />
                    <button onClick={handleSearch} className="bg-red-600 text-white py-2 px-4 rounded shadow hover:bg-red-700 hover:scale-105 transition-all">
                        Search
                    </button>
                    <button onClick={resetSearch} className="bg-gray-400 text-white py-2 px-4 rounded shadow hover:bg-gray-500 hover:scale-105 transition-all ml-2">
                        Reset Search
                    </button>
                </div>
            </div>

            <div className="mb-4">
                <label className="mr-2">Sort by:</label>
                <select value={sortOrder} onChange={handleSortChange} className="border border-gray-300 p-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="mr-2">Videos per page:</label>
                <select value={limit} onChange={handleLimitChange} className="border border-gray-300 p-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-red-500">
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                    <div key={video.id} className="border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 bg-white">
                        <img src={video.thumbnailUrl} alt={video.title} className="w-full h-48 object-cover rounded-t-lg" />
                        <div className="p-4">
                            <h2 className="font-semibold text-lg text-gray-800">{video.title}</h2>
                            <p className="text-gray-600">{video.description}</p>
                            <p className="text-gray-500 text-sm">{new Date(video.publishedAt).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between mt-6">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="bg-gray-300 p-2 rounded shadow hover:bg-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <span className="self-center text-lg font-semibold">
                    Page {page} of {Math.ceil(totalVideos / limit)}
                </span>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={totalVideos <= page * limit}
                    className="bg-gray-300 p-2 rounded shadow hover:bg-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default VideoList;
