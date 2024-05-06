import { hooks } from '@/store.js';
import { Button } from '@a-type/ui/components/button';
import { Chip } from '@a-type/ui/components/chip';
import { Icon } from '@a-type/ui/components/icon';
import { H2 } from '@a-type/ui/components/typography';
import { toast } from 'react-hot-toast';

export interface ManageTagsProps {}

export function ManageTags({}: ManageTagsProps) {
  const tags = hooks.useAllTags();
  const client = hooks.useClient();

  return (
    <div className="flex flex-col items-start">
      <H2>Manage Tags</H2>
      <div className="flex flex-row gap-2 flex-wrap">
        {tags.map((tag) => (
          <Chip key={tag.get('name')}>
            <span>{tag.get('name')}</span>
            <Button
              size="icon"
              color="destructive"
              onClick={async () => {
                const withTag = await client.exercises.findAll({
                  index: {
                    where: 'tags',
                    equals: tag.get('name'),
                  },
                }).resolved;
                client
                  .batch({ max: null, timeout: null })
                  .run(() => {
                    for (const ex of withTag) {
                      ex.get('tags').removeAll(tag.get('name'));
                    }
                    client.tags.delete(tag.get('name'));
                  })
                  .commit();
                toast.success(
                  <div className="row gap-2">
                    <span>Tag deleted</span>
                    <Button
                      size="small"
                      color="accent"
                      onClick={() => client.undoHistory.undo()}
                    >
                      Undo
                    </Button>
                  </div>,
                  {
                    duration: 10000,
                  },
                );
              }}
            >
              <Icon name="x" />
            </Button>
          </Chip>
        ))}
      </div>
    </div>
  );
}
