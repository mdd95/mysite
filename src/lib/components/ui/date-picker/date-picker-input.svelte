<script lang="ts">
  import { DatePicker as DatePickerPrimitive } from 'bits-ui';
  import { buttonVariants } from '$lib/components/ui/button';
  import { cn, flyAndScale } from '$lib/utils';
  import ChevronLeft from 'svelte-radix/ChevronLeft.svelte';
  import ChevronRight from 'svelte-radix/ChevronRight.svelte';
  import Calendar from 'svelte-radix/Calendar.svelte';

  type $$Props = DatePickerPrimitive.InputProps;

  let className: $$Props['class'] = undefined;
  export { className as class };
</script>

<DatePickerPrimitive.Input
  let:segments
  class={cn(
    'flex h-9 w-full select-none items-center rounded-md border border-input bg-background px-3 py-1 text-sm text-muted-foreground shadow-sm transition-colors focus-within:outline-none focus-within:ring-1 focus-within:ring-ring',
    className
  )}
  {...$$restProps}
>
  {#each segments as { part, value }}
    <div class="inline-block select-none">
      {#if part === 'literal'}
        <DatePickerPrimitive.Segment {part} class="p-0.5">
          {value}
        </DatePickerPrimitive.Segment>
      {:else}
        <DatePickerPrimitive.Segment
          {part}
          class="rounded-md p-1 hover:bg-muted focus:bg-muted focus:text-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {value}
        </DatePickerPrimitive.Segment>
      {/if}
    </div>
  {/each}
  <DatePickerPrimitive.Trigger
    class={cn(
      buttonVariants({ variant: 'ghost' }),
      'ml-auto h-7 w-7 p-0 transition-all focus-visible:outline-none focus-visible:outline-offset-0'
    )}
  >
    <Calendar class="h-4 w-4" />
  </DatePickerPrimitive.Trigger>
</DatePickerPrimitive.Input>
<DatePickerPrimitive.Content
  sideOffset={6}
  transition={flyAndScale}
  transitionConfig={{ duration: 150, y: -8 }}
  class="z-50"
>
  <DatePickerPrimitive.Calendar
    class="rounded-md border bg-background p-3 shadow-lg"
    let:months
    let:weekdays
  >
    <DatePickerPrimitive.Header class="relative flex w-full items-center justify-between pt-1">
      <DatePickerPrimitive.PrevButton
        class={cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        )}
      >
        <ChevronLeft class="h-4 w-4" />
      </DatePickerPrimitive.PrevButton>
      <DatePickerPrimitive.Heading class="text-sm font-medium" />
      <DatePickerPrimitive.NextButton
        class={cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        )}
      >
        <ChevronRight class="h-4 w-4" />
      </DatePickerPrimitive.NextButton>
    </DatePickerPrimitive.Header>
    <div class="mt-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
      {#each months as month}
        <DatePickerPrimitive.Grid class="w-full border-collapse select-none space-y-1">
          <DatePickerPrimitive.GridHead>
            <DatePickerPrimitive.GridRow class="flex">
              {#each weekdays as day}
                <DatePickerPrimitive.HeadCell
                  class="w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground"
                >
                  <div>{day.slice(0, 2)}</div>
                </DatePickerPrimitive.HeadCell>
              {/each}
            </DatePickerPrimitive.GridRow>
          </DatePickerPrimitive.GridHead>
          <DatePickerPrimitive.GridBody>
            {#each month.weeks as weekDates}
              <DatePickerPrimitive.GridRow class="flex">
                {#each weekDates as date}
                  <DatePickerPrimitive.Cell
                    {date}
                    class="relative p-0 text-center text-sm focus-within:relative focus-within:z-20"
                  >
                    <DatePickerPrimitive.Day
                      {date}
                      month={month.value}
                      class={cn(
                        buttonVariants({ variant: 'ghost' }),
                        'h-8 w-8 p-0 font-normal',
                        '[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground',
                        'data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:opacity-100 data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground data-[selected]:focus:bg-primary data-[selected]:focus:text-primary-foreground',
                        'data-[disabled]:text-muted-foreground data-[disabled]:opacity-50',
                        'data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through',
                        'data-[outside-month]:pointer-events-none data-[outside-month]:text-muted-foreground data-[outside-month]:opacity-50 [&[data-outside-month][data-selected]]:bg-accent/50 [&[data-outside-month][data-selected]]:text-muted-foreground [&[data-outside-month][data-selected]]:opacity-30'
                      )}
                    >
                      <div
                        class="absolute top-[5px] hidden rounded-full bg-foreground transition-all group-data-[today]:block group-data-[selected]:bg-background"
                      />
                      {date.day}
                    </DatePickerPrimitive.Day>
                  </DatePickerPrimitive.Cell>
                {/each}
              </DatePickerPrimitive.GridRow>
            {/each}
          </DatePickerPrimitive.GridBody>
        </DatePickerPrimitive.Grid>
      {/each}
    </div>
  </DatePickerPrimitive.Calendar>
</DatePickerPrimitive.Content>
