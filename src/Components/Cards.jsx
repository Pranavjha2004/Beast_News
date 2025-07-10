import React from 'react';

const Cards = ({ article }) => {
  return (
    <div className="max-w-sm w-full h-[500px] bg-zinc-800/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105 cursor-pointer flex flex-col">
      <img
        loading="lazy"
        className="w-full h-48 object-cover"
        src={article.urlToImage}
        alt="News"
      />

      <div className="p-6 flex flex-col flex-grow text-white">
        {/* Title */}
        <h2 className="text-lg font-semibold text-center line-clamp-2 mb-2">
          {article.title || 'No Title Available'}
        </h2>

        {/* Description */}
        <p className="text-sm text-zinc-300 flex-grow line-clamp-4 mt-8 text-center">
          {article.description || 'No description available.'}
        </p>

        {/* Footer */}
        <div className="flex justify-between text-xs text-zinc-400 border-t border-white/10 pt-3 mt-4">
          <span className="truncate w-1/2">{article.author || 'Unknown Author'}</span>
          <span className="text-right w-1/2">
            {new Date(article.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Cards;
