import { UpdatePrompt } from '@/components/updatePrompt/UpdatePrompt.jsx';
import { clientDescriptor, hooks } from '@/store.js';
import { ReactNode, Suspense } from 'react';
import { Pages } from '@/pages/Pages.jsx';
import { IconSpritesheet } from '@a-type/ui/components/icon';

export interface AppProps {}

export function App({}: AppProps) {
  return (
    <Suspense>
      <VerdantProvider>
        <Pages />
        <UpdatePrompt />
        <IconSpritesheet />
      </VerdantProvider>
    </Suspense>
  );
}

function VerdantProvider({ children }: { children: ReactNode }) {
  return <hooks.Provider value={clientDescriptor}>{children}</hooks.Provider>;
}
