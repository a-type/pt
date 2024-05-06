import { hooks } from '@/store.js';
import { Button } from '@a-type/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@a-type/ui/components/dialog';
import { FormikForm, TextField } from '@a-type/ui/components/forms';
import { Icon } from '@a-type/ui/components/icon';
import { useState } from 'react';

export interface TagSelectProps {
  selected: string[];
  onSelectedChange: (selected: string[]) => void;
  allowAdd?: boolean;
}

export function TagSelect({
  selected,
  onSelectedChange,
  allowAdd,
}: TagSelectProps) {
  const tags = hooks.useAllTags();
  const client = hooks.useClient();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="row gap-2 flex-wrap">
      {tags.map((tag) => {
        const isSelected = selected.includes(tag.get('name'));
        return (
          <Button
            size="small"
            color="accent"
            toggled={isSelected}
            key={tag.get('name')}
            onClick={() => {
              const newSelected = isSelected
                ? selected.filter((s) => s !== tag.get('name'))
                : [...selected, tag.get('name')];
              onSelectedChange(newSelected);
            }}
          >
            {tag.get('name')}
          </Button>
        );
      })}
      {allowAdd && (
        <Dialog open={showAdd} onOpenChange={setShowAdd}>
          <DialogTrigger asChild>
            <Button size="small">New tag</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>New tag</DialogTitle>
            <FormikForm
              initialValues={{ name: '' }}
              onSubmit={async ({ name }) => {
                client.tags.put({ name });
                setShowAdd(false);
              }}
            >
              <TextField name="name" label="Name" />
              <Button type="submit">Create</Button>
            </FormikForm>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
