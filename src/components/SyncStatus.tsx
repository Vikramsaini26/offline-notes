interface SyncStatusProps {
  isOnline: boolean;
}

function SyncStatus({ isOnline }: SyncStatusProps) {
  return (
    <div className="sync-status">
      Status: {isOnline ? 'Online' : 'Offline'}
    </div>
  );
}

export default SyncStatus;