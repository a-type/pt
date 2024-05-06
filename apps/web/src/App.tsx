import { UpdatePrompt } from '@/components/updatePrompt/UpdatePrompt.jsx';
import { clientDescriptor, hooks } from '@/store.js';
import { ReactNode, Suspense } from 'react';
import { Pages } from '@/pages/Pages.jsx';
import { IconSpritesheet } from '@a-type/ui/components/icon';
import { useVisualViewportOffset } from '@a-type/ui/hooks';
import { Toaster } from 'react-hot-toast';

export interface AppProps {}

export function App({}: AppProps) {
  useVisualViewportOffset();
  return (
    <Suspense>
      <VerdantProvider>
        <Pages />
        <UpdatePrompt />
        <IconSpritesheet />
        <Toaster position="bottom-center" containerClassName="mb-10 sm:mb-0" />
      </VerdantProvider>
    </Suspense>
  );
}

function VerdantProvider({ children }: { children: ReactNode }) {
  return <hooks.Provider value={clientDescriptor}>{children}</hooks.Provider>;
}
