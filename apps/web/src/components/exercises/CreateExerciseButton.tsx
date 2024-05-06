import { hooks } from '@/store.js';
import { Button, ButtonProps } from '@a-type/ui/components/button';
import { useNavigate } from '@verdant-web/react-router';

export interface CreateExerciseButtonProps extends ButtonProps {}

export function CreateExerciseButton({
  children,
  onClick: _,
  ...rest
}: CreateExerciseButtonProps) {
  const client = hooks.useClient();
  const navigate = useNavigate();

  return (
    <Button
      onClick={async () => {
        const ex = await client.exercises.put({});
        navigate(`/edit/${ex.get('id')}`);
      }}
      {...rest}
    >
      {children ?? 'New Exercise'}
    </Button>
  );
}
