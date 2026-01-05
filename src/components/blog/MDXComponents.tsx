import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

export const mdxComponents = {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  h1: ({ ...props }) => <h1 className="mt-10 mb-6 pb-2 text-3xl font-bold border-b border-white/10" {...props} />,
  h2: ({ ...props }) => <h2 className="mt-8 mb-4 pb-2 text-2xl font-bold border-b border-white/10" {...props} />,
  h3: ({ ...props }) => <h3 className="mt-6 mb-4 text-xl font-bold" {...props} />,
  p: ({ ...props }) => <p className="my-4 text-gray-300 leading-7" {...props} />,
  ul: ({ ...props }) => <ul className="my-4 ml-6 list-disc text-gray-300 space-y-2" {...props} />,
  ol: ({ ...props }) => <ol className="my-4 ml-6 list-decimal text-gray-300 space-y-2" {...props} />,
  li: ({ ...props }) => <li className="pl-1" {...props} />,
  blockquote: ({ ...props }) => (
    <blockquote className="my-6 border-l-4 border-white/20 pl-4 py-1 italic text-gray-400 bg-white/5 rounded-r" {...props} />
  ),
  code: ({ ...props }) => (
    <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm font-medium text-purple-300"
      style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
      {...props} />
  ),
  pre: ({ ...props }) => (
    <pre className="my-6 overflow-x-auto rounded-lg bg-[#0d1117] p-4 font-mono text-sm leading-6 border border-white/10"
      style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
      {...props} />
  ),
  table: ({ ...props }) => (
    <div className="my-6 w-full overflow-y-auto rounded-lg border border-white/10">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: ({ ...props }) => <thead className="bg-[#161b22] text-white" {...props} />,
  tbody: ({ ...props }) => <tbody className="divide-y divide-white/10 bg-[#0d1117]" {...props} />,
  tr: ({ ...props }) => <tr className="transition-colors hover:bg-white/5" {...props} />,
  th: ({ ...props }) => (
    <th
      className="px-4 py-3 text-left font-bold"
      {...props}
    />
  ),
  td: ({ ...props }) => (
    <td
      className="px-4 py-3 text-gray-300"
      {...props}
    />
  ),
};
