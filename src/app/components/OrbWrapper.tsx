'use client';

import dynamic from 'next/dynamic';

const Orb = dynamic(() => import('./Orb'), {
  ssr: false,
  loading: () => null
});

export default function OrbWrapper() {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
      <Orb
        hoverIntensity={0.2}
        rotateOnHover={true}
        hue={0}
        forceHoverState={false}
      />
    </div>
  );
}
