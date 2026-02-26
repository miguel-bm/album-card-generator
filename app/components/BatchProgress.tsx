// ---------------------------------------------------------------------------
// BatchProgress — progress bar for batch PDF generation
// ---------------------------------------------------------------------------

interface BatchProgressProps {
  message: string;
  isActive: boolean;
}

export default function BatchProgress({ message, isActive }: BatchProgressProps) {
  if (!isActive) return null;

  return (
    <div className="space-y-2">
      {/* Indeterminate animated bar */}
      <div className="h-2 rounded-full bg-surface-alt overflow-hidden">
        <div className="h-full bg-accent rounded-full animate-pulse w-2/3" />
      </div>

      {/* Status text */}
      {message && (
        <p className="text-sm text-text-muted text-center">{message}</p>
      )}
    </div>
  );
}
