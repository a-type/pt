import { Button, ButtonProps } from '@a-type/ui/components/button';
import { useContext, useState } from 'react';
import { Icon } from '@a-type/ui/components/icon';
import { clsx } from '@a-type/ui';
import { H2, P } from '@a-type/ui/components/typography';
import { ConfirmedButton } from '@a-type/ui/components/button';
import { hooks } from '@/store.js';

export interface ExportDataButtonProps extends Omit<ButtonProps, 'onError'> {
  onError: (error: Error) => void;
}

export function ExportDataButton({
  children,
  onError,
  ...props
}: ExportDataButtonProps) {
  const [loading, setLoading] = useState(false);
  const client = hooks.useClient();
  return (
    <Button
      onClick={async () => {
        setLoading(true);
        try {
          const backup = await import('@verdant-web/store/backup');
          const file = await backup.createClientBackup(client);
          const url = URL.createObjectURL(file);
          const a = document.createElement('a');
          a.href = url;
          a.download = `pt-backup-${new Date().toISOString()}.zip`;
          a.click();
        } catch (e) {
          console.error(e);
          onError(e as Error);
        } finally {
          setLoading(false);
        }
      }}
      loading={loading}
      {...props}
    >
      {children || (
        <>
          Export Data <Icon name="download" />
        </>
      )}
    </Button>
  );
}

export function ImportDataButton({
  children,
  onError,
  ...props
}: ExportDataButtonProps) {
  const [loading, setLoading] = useState(false);
  const client = hooks.useClient();

  return (
    <Button asChild loading={loading} {...props}>
      <label>
        <input
          type="file"
          hidden
          accept=".zip"
          onChange={async (ev) => {
            setLoading(true);
            try {
              const backup = await import('@verdant-web/store/backup');
              const file = ev.target.files?.[0];
              if (!file) {
                throw new Error('No file selected');
              }
              await backup.importClientBackup(client, file);
              window.location.reload();
            } catch (e) {
              console.error(e);
              onError(e as Error);
            } finally {
              setLoading(false);
            }
          }}
        ></input>
        {children || (
          <>
            Import Data <Icon name="upload" />
          </>
        )}
      </label>
    </Button>
  );
}

export interface ManageStorageProps {
  className?: string;
  onError: (error: Error) => void;
}

export function ManageStorage({ className, onError }: ManageStorageProps) {
  const client = hooks.useClient();
  return (
    <div className={clsx('flex flex-col items-start', className)}>
      <H2>Manage App Storage</H2>
      <P className="text-xs mb-2">
        This app stores all data on your device. You can export and import your
        data, or reset it.
      </P>
      <div className="flex flex-row gap-2 flex-wrap">
        <ExportDataButton onError={onError} />
        <ImportDataButton onError={onError} />
        <ConfirmedButton
          color="destructive"
          confirmText="This will delete your data. It cannot be undone."
          onConfirm={() => {
            client.__dangerous__resetLocal();
          }}
        >
          Reset data
        </ConfirmedButton>
      </div>
    </div>
  );
}
