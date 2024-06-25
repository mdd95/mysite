<script lang="ts">
  import { DatePicker as DatePickerPrimitive } from 'bits-ui';
  import { cn } from '$lib/utils';

  type $$Props = DatePickerPrimitive.LabelProps;

  let className: $$Props['class'] = undefined;
  export { className as class };
</script>

<DatePickerPrimitive.Label
  class={cn('text-sm font-medium leading-none', className)}
  {...$$restProps}
>
  <slot />
</DatePickerPrimitive.Label>
