import React from 'react';
import { Button } from './ui/Button';

export const Banner = () => {
    return (
        <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#2c3e50] to-[#000000] p-1 border border-white/10 shadow-2xl">
            <div className="relative z-10 flex flex-col items-start justify-center px-8 py-12 md:flex-row md:items-center md:justify-between md:px-12">

                {/* Text Content */}
                <div className="max-w-2xl">
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white md:text-4xl shadow-black drop-shadow-lg">
                        Ever dreamt of a better version of yourself?
                    </h2>
                    <p className="mt-4 text-base font-medium text-gray-300 md:text-lg">
                        Get annual and all-time stats, filtering by your favorite streaming services, watchlist notifications, no third-party ads and more...
                    </p>
                </div>

                {/* CTA */}
                <div className="mt-8 flex items-center gap-2 md:mt-0">
                    <span className="text-xl font-bold uppercase tracking-tight text-white">Upgrade to</span>
                    <div className="rounded bg-[#1DB954] px-3 py-1 text-sm font-black text-black shadow-[0_0_15px_rgba(29,185,84,0.5)]">
                        PRO
                    </div>
                </div>
            </div>

            {/* Decorative Background Overlay */}
            <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-20 bg-blend-overlay mix-blend-overlay grayscale"></div>
        </div>
    );
};
