<script lang="ts">
  import { DatePicker as DatePickerPrimitive } from 'bits-ui';

  type $$Props = DatePickerPrimitive.Props;

  export let value: $$Props['value'] = undefined;
  export let weekdayFormat: $$Props['weekdayFormat'] = 'short';
  export let fixedWeeks: $$Props['fixedWeeks'] = true;
</script>

<DatePickerPrimitive.Root bind:value {weekdayFormat} {fixedWeeks} {...$$restProps}>
  <div class="w-full">
    <slot />
  </div>
</DatePickerPrimitive.Root>
