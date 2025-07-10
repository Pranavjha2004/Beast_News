import React, { useState, useEffect } from 'react';
import Cards from '../Components/Cards';
import axios from 'axios';
import Navbar from '../Components/NavBar';
const ApiKey = import.meta.env.VITE_NEWS_API_KEY;

const Home = () => {
    const [search, setSearch] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [loadingHeadlines, setLoadingHeadlines] = useState(false);
    const [loadingArticles, setLoadingArticles] = useState(false);
    const [articles, setArticles] = useState([]);
    const [headlines, setHeadlines] = useState([]);


    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase());
    };

    // Debounce search
    useEffect(() => {
        const delay = setTimeout(() => {
            setSearchQuery(search.trim());
        }, 1000);
        return () => clearTimeout(delay);
    }, [search]);

    // 🔍 Fetch search/general articles
    useEffect(() => {
        const fetchArticles = async () => {
            if (!searchQuery && search !== '') return;
            setLoadingArticles(true);
            try {
                const res = await axios.get('https://newsapi.org/v2/everything', {
                    params: {
                        q: searchQuery || 'India',
                        sortBy: 'relevancy',
                        language: 'en',
                        apiKey: ApiKey,
                    },
                });
                const filtered = res.data.articles.filter(article => article.urlToImage && article.author);
                setArticles(filtered);
            } catch (err) {
                console.error("Error fetching articles:", err);
            } finally {
                setLoadingArticles(false);
            }
        };

        fetchArticles();
    }, [searchQuery]);

    // 📰 Fetch top headlines
    useEffect(() => {
        const fetchHeadlines = async () => {
            setLoadingHeadlines(true);
            try {
                const res = await axios.get('https://newsapi.org/v2/top-headlines', {
                    params: {
                        category: 'general',
                        sortBy: 'publishedAt',
                        pageSize: 8,
                        apiKey: ApiKey,
                    },
                });
                const filtered = res.data.articles.filter(article => article.urlToImage && article.author);
                setHeadlines(filtered);
            } catch (err) {
                console.error('Error fetching headlines:', err);
            } finally {
                setLoadingHeadlines(false);
            }
        };

        fetchHeadlines();
    }, []);

    return (
        <div className='min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex flex-col' id='/'>
            <Navbar></Navbar>
            {/* Search input */}
            <input
                value={search}
                onChange={handleSearch}
                type='text'
                name='search'
                placeholder='Search News...'
                className='
    outline-none 
    w-[90%] sm:w-4/5 md:w-3/5 lg:w-2/5 
    px-5 py-4 
    rounded-2xl 
    mx-auto mb-6 mt-24 
    bg-zinc-400 
    shadow-2xl 
    font-bold 
    text-sm sm:text-base
  '
            />


            {/* Search Query Title */}
            {searchQuery && !loadingArticles && (
                <h2 className="text-center text-2xl text-white mb-6">
                    Search results for "<span className="italic text-zinc-300">{searchQuery}</span>"
                </h2>
            )}

            {/* 📰 Headlines */}
            {!searchQuery && (
                <>
                    <h1 className='text-4xl font-bold text-zinc-300 text-center my-8' id='headlines'>Top Headlines</h1>
                    {loadingHeadlines ? (
                        <p className="text-white text-center text-xl">Loading Headlines...</p>
                    ) : headlines.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center px-8 pb-12">
                            {headlines.map((article, index) => (
                                <Cards key={index} article={article} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-white text-center text-xl">No headlines found.</p>
                    )}

                    {console.log(headlines.length)}
                </>
            )}

            {/* 🌐 General / Search */}
            {!searchQuery && (
                <h1 className='text-4xl font-bold text-zinc-300 text-center my-8' id='general'>General</h1>
            )}
            {loadingArticles ? (
                <div className='flex justify-center items-center'>
                    <h1 className="text-white text-2xl">Loading General News...</h1>
                </div>
            ) : articles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center px-8 pb-12">
                    {articles.map((article, index) => (
                        <Cards key={index} article={article} />
                    ))}
                </div>
            ) : (
                <p className="text-white text-center text-xl mt-10">No articles found.</p>
            )}
        </div>
    );
};

export default Home;
