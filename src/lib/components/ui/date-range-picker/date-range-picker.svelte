<script lang="ts">
  import { DateRangePicker as DateRangePickerPrimitive } from 'bits-ui';

  type $$Props = DateRangePickerPrimitive.Props;

  export let value: $$Props['value'] = undefined;
  export let weekdayFormat: $$Props['weekdayFormat'] = 'short';
  export let fixedWeeks: $$Props['fixedWeeks'] = true;
</script>

<DateRangePickerPrimitive.Root bind:value {weekdayFormat} {fixedWeeks} {...$$restProps}>
  <div class="w-full">
    <slot />
  </div>
</DateRangePickerPrimitive.Root>
