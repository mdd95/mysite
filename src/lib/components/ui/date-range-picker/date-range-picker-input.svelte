<script lang="ts">
  import { DateRangePicker as DateRangePickerPrimitive } from 'bits-ui';
  import { buttonVariants } from '$lib/components/ui/button';
  import { cn, flyAndScale } from '$lib/utils';
  import ChevronLeft from 'svelte-radix/ChevronLeft.svelte';
  import ChevronRight from 'svelte-radix/ChevronRight.svelte';
  import Calendar from 'svelte-radix/Calendar.svelte';

  type $$Props = DateRangePickerPrimitive.InputProps;

  let className: $$Props['class'] = undefined;
  export { className as class };
</script>

<DateRangePickerPrimitive.Input
  let:segments
  class={cn(
    'flex h-9 w-full select-none items-center rounded-md border border-input bg-background px-3 py-1 text-sm text-muted-foreground shadow-sm transition-colors focus-within:outline-none focus-within:ring-1 focus-within:ring-ring',
    className
  )}
  {...$$restProps}
>
  {#each segments.start as { part, value }}
    <div class="inline-block select-none">
      {#if part === 'literal'}
        <DateRangePickerPrimitive.Segment type="start" {part} class="p-0.5">
          {value}
        </DateRangePickerPrimitive.Segment>
      {:else}
        <DateRangePickerPrimitive.Segment
          type="start"
          {part}
          class="rounded-md p-1 hover:bg-muted focus:bg-muted focus:text-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {value}
        </DateRangePickerPrimitive.Segment>
      {/if}
    </div>
  {/each}
  <div aria-hidden class="px-1">&ndash;</div>
  {#each segments.end as { part, value }}
    <div class="inline-block select-none">
      {#if part === 'literal'}
        <DateRangePickerPrimitive.Segment type="end" {part} class="p-0.5">
          {value}
        </DateRangePickerPrimitive.Segment>
      {:else}
        <DateRangePickerPrimitive.Segment
          type="end"
          {part}
          class="rounded-md p-1 hover:bg-muted focus:bg-muted focus:text-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {value}
        </DateRangePickerPrimitive.Segment>
      {/if}
    </div>
  {/each}
  <DateRangePickerPrimitive.Trigger
    class={cn(
      buttonVariants({ variant: 'ghost' }),
      'ml-auto h-7 w-7 p-0 transition-all focus-visible:outline-none focus-visible:outline-offset-0'
    )}
  >
    <Calendar class="h-4 w-4" />
  </DateRangePickerPrimitive.Trigger>
</DateRangePickerPrimitive.Input>
<DateRangePickerPrimitive.Content sideOffset={6} transition={flyAndScale} class="z-50">
  <DateRangePickerPrimitive.Calendar
    class="rounded-md border bg-background p-3 shadow-lg"
    let:months
    let:weekdays
  >
    <DateRangePickerPrimitive.Header class="relative flex w-full items-center justify-between pt-1">
      <DateRangePickerPrimitive.PrevButton
        class={cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        )}
      >
        <ChevronLeft class="h-4 w-4" />
      </DateRangePickerPrimitive.PrevButton>
      <DateRangePickerPrimitive.Heading class="text-sm font-medium" />
      <DateRangePickerPrimitive.NextButton
        class={cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        )}
      >
        <ChevronRight class="h-4 w-4" />
      </DateRangePickerPrimitive.NextButton>
    </DateRangePickerPrimitive.Header>
    <div class="mt-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
      {#each months as month}
        <DateRangePickerPrimitive.Grid class="w-full border-collapse select-none space-y-1">
          <DateRangePickerPrimitive.GridHead>
            <DateRangePickerPrimitive.GridRow class="flex">
              {#each weekdays as day}
                <DateRangePickerPrimitive.HeadCell
                  class="w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground"
                >
                  <div>{day.slice(0, 2)}</div>
                </DateRangePickerPrimitive.HeadCell>
              {/each}
            </DateRangePickerPrimitive.GridRow>
          </DateRangePickerPrimitive.GridHead>
          <DateRangePickerPrimitive.GridBody>
            {#each month.weeks as weekDates}
              <DateRangePickerPrimitive.GridRow class="flex">
                {#each weekDates as date}
                  <DateRangePickerPrimitive.Cell
                    {date}
                    class="relative p-0 text-center text-sm focus-within:relative focus-within:z-20"
                  >
                    <DateRangePickerPrimitive.Day
                      {date}
                      month={month.value}
                      class={cn(
                        buttonVariants({ variant: 'ghost' }),
                        'h-8 w-8 p-0 font-normal',
                        'group relative inline-flex items-center justify-center overflow-visible whitespace-nowrap border border-transparent bg-background bg-transparent text-foreground transition-all hover:border-foreground focus-visible:ring-foreground',
                        'data-[disabled]:pointer-events-none data-[disabled]:text-foreground/30',
                        'data-[outside-month]:pointer-events-none',
                        'data-[highlighted]:rounded-none data-[highlighted]:bg-muted',
                        'data-[selected]:bg-muted data-[selection-end]:bg-foreground data-[selection-start]:bg-foreground data-[selected]:font-medium data-[selection-end]:font-medium data-[selection-start]:font-medium data-[selected]:text-foreground data-[selection-end]:text-background data-[selection-start]:text-background data-[selection-start]:focus-visible:ring-2 data-[selection-start]:focus-visible:ring-offset-2 data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:rounded-none data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:focus-visible:border-foreground data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:focus-visible:ring-0 data-[selected]:[&:not([data-selection-start])]:[&:not([data-selection-end])]:focus-visible:ring-offset-0',
                        'data-[unavailable]:text-muted-foreground data-[unavailable]:line-through'
                      )}
                    >
                      <div
                        class="absolute top-[5px] hidden rounded-full bg-foreground transition-all group-data-[today]:block group-data-[selected]:bg-background"
                      ></div>
                      {date.day}
                    </DateRangePickerPrimitive.Day>
                  </DateRangePickerPrimitive.Cell>
                {/each}
              </DateRangePickerPrimitive.GridRow>
            {/each}
          </DateRangePickerPrimitive.GridBody>
        </DateRangePickerPrimitive.Grid>
      {/each}
    </div>
  </DateRangePickerPrimitive.Calendar>
</DateRangePickerPrimitive.Content>
