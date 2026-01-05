import { useMDXComponents } from 'mdx-components';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

export function useMDXComponents(components: {
  Alert?: typeof Alert;
  Badge?: typeof Badge;
}) {
  return {
    Alert,
    AlertDescription,
    AlertTitle,
    Badge,
    ...components,
  };
}
