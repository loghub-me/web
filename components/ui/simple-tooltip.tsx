import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';
import { Tooltip, TooltipTrigger, TooltipContent } from '@ui/tooltip';

function SimpleTooltip({ content, render, ...props }: TooltipPrimitive.Trigger.Props & { content: string }) {
  return (
    <Tooltip>
      <TooltipTrigger render={render} {...props} />
      <TooltipContent>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export { SimpleTooltip };
