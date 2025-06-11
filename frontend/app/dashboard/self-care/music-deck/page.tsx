import MusicPlayground from '@/components/data-display/music-playground';
import React from 'react';

function page() {
    return (
        <div className="h-[calc(100vh-4rem)] overflow-hidden">
            <MusicPlayground />
        </div>
    );
}

export default page;
