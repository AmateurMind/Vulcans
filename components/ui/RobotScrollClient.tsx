'use client';

import dynamic from 'next/dynamic';

const RobotScroll = dynamic(() => import('./RobotScroll'), { ssr: false });

export function RobotScrollClient() {
    return <RobotScroll />;
}
