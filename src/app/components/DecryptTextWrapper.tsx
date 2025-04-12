'use client';

import dynamic from 'next/dynamic';

const DecryptText = dynamic(() => import('./DecryptText'), {
  ssr: false,
  loading: () => <span className="text-5xl font-bold">Construction Cost Estimation Made Simple</span>
});

interface DecryptTextWrapperProps {
  text: string;
}

export default function DecryptTextWrapper({ text }: DecryptTextWrapperProps) {
  return <DecryptText text={text} />;
}
