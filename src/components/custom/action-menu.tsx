import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type Option = {
  key: string | number;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

type Props = {
  trigger?: React.ReactNode;
  options: Option[];
};

export function ActionMenu({ trigger, options }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger ?? (
          <Button variant="ghost" size="icon">
            •••
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt.key}
            onClick={(v) => {
              v.stopPropagation();
              opt?.onClick?.();
            }}
          >
            {opt.icon && <span className="mr-2">{opt.icon}</span>}
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
