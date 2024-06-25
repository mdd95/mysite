<script lang="ts">
  import { DateRangePicker as DateRangePickerPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils';

  type $$Props = DateRangePickerPrimitive.LabelProps;

  let className: $$Props['class'] = undefined;
  export { className as class };
</script>

<DateRangePickerPrimitive.Label
  class={cn('text-sm font-medium leading-none', className)}
  {...$$restProps}
>
  <slot />
</DateRangePickerPrimitive.Label>
