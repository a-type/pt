import { Button } from '@a-type/ui/components/button';
import {
  Dialog,
  DialogActions,
  DialogClose,
  DialogContent,
  DialogTitle,
} from '@a-type/ui/components/dialog';
import { useRegisterSW } from 'virtual:pwa-register/react';

export interface UpdatePromptProps {}

const TEST = false;

/**
 * This is an example of a component that responds to the
 * service worker downloading a new version of the app and
 * prompts the user to update.
 *
 * To avoid sync complications for synced apps, you may
 * want to make this a blocking modal that prevents
 * the user from using the app until they update.
 */
export function UpdatePrompt({}: UpdatePromptProps) {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      console.log('Service worker registered', swUrl);
      r &&
        setInterval(
          () => {
            r.update();
            // hourly
          },
          60 * 60 * 1000,
        );
    },
    onRegisterError(error) {
      console.error('Service worker registration error', error);
    },
  });

  if (needRefresh || TEST) {
    return (
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Update available!</DialogTitle>
          <DialogActions>
            <DialogClose>
              <Button>Close</Button>
            </DialogClose>
            <Button color="primary" onClick={() => updateServiceWorker(true)}>
              Update
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
