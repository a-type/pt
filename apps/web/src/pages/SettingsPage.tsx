import { DarkModeToggle } from '@/components/settings/DarkModeToggle.jsx';
import { ManageTags } from '@/components/settings/ManageTags.jsx';
import { ManageStorage } from '@/components/settings/storage.jsx';
import { Button } from '@a-type/ui/components/button';
import { Icon } from '@a-type/ui/components/icon';
import { PageContent, PageFixedArea } from '@a-type/ui/components/layouts';
import { H1 } from '@a-type/ui/components/typography';
import { Link } from '@verdant-web/react-router';
import { toast } from 'react-hot-toast';

export interface SettingsPageProps {}

export function SettingsPage({}: SettingsPageProps) {
  return (
    <PageContent>
      <PageFixedArea className="row py-3 justify-start">
        <Button color="ghost" asChild>
          <Link to="/">
            <Icon name="arrowLeft" /> Back
          </Link>
        </Button>
      </PageFixedArea>
      <div className="col items-stretch gap-6">
        <H1>Settings</H1>
        <DarkModeToggle />
        <ManageStorage onError={(e) => toast.error(e.message)} />
        <ManageTags />
      </div>
    </PageContent>
  );
}
