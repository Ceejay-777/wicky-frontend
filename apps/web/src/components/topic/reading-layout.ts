// One source for the reading page grid, so the loaded page, the "preparing" page and the
// loading skeleton are the same shape and nothing moves when the content arrives.
// Tablet: one 620px column. Desktop: 680px reading column plus a 320px rail.
export const READING_GRID = "mx-auto md:max-w-[620px] xl:grid xl:max-w-[1060px] xl:grid-cols-[680px_320px] xl:gap-[60px]";

export const READING_RAIL =
  "mt-[26px] px-[22px] xl:sticky xl:top-[78px] xl:mt-10 xl:max-h-[calc(100dvh-180px)] xl:self-start xl:overflow-y-auto";

// Space for the fixed header above the page, and the footer's default height below it.
export const READING_PAGE = "pt-[62px] pb-[104px]";
