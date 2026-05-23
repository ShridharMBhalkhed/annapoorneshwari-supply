import { Icon } from "../Icon.jsx";

export function ProductImage({ name, url, className = "" }) {
  if (url) {
    return <img src={url} alt={name} loading="lazy" className={className} />;
  }

  return (
    <div className={`flex items-center justify-center bg-muted text-muted-foreground ${className}`}>
      <div className="flex flex-col items-center gap-2 p-6 text-center">
        <Icon name="package" className="h-10 w-10 opacity-40" />
        <span className="text-xs font-medium">{name}</span>
      </div>
    </div>
  );
}
