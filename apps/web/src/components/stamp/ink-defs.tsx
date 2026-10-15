// Mounted once in the root layout. Stamps apply it through the `.stamp-ink`
// class in globals.css, which drops it under reduced motion.
export function InkDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <filter id="ink-2" x="-6%" y="-6%" width="112%" height="112%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="9" result="rough" />
          <feDisplacementMap in="SourceGraphic" in2="rough" scale="2.8" xChannelSelector="R" yChannelSelector="G" result="edge" />
          <feTurbulence type="fractalNoise" baseFrequency="0.04 0.028" numOctaves="3" seed="2" result="blot" />
          <feColorMatrix in="blot" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  2.4 0 0 0 -0.3" result="blotA" />
          <feComposite in="edge" in2="blotA" operator="in" result="uneven" />
          <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="1" seed="33" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  9 0 0 0 -3.0" result="grainA" />
          <feComposite in="uneven" in2="grainA" operator="in" />
        </filter>
        <filter id="foil-2" x="-6%" y="-6%" width="112%" height="112%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="rough" />
          <feDisplacementMap in="SourceGraphic" in2="rough" scale="1.6" xChannelSelector="R" yChannelSelector="G" result="edge" />
          <feTurbulence type="fractalNoise" baseFrequency="0.03 0.045" numOctaves="3" seed="11" result="blot" />
          <feColorMatrix in="blot" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  2.4 0 0 0 -0.3" result="blotA" />
          <feComposite in="edge" in2="blotA" operator="in" result="uneven" />
          <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="1" seed="21" result="grain" />
          <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  9 0 0 0 -3.0" result="grainA" />
          <feComposite in="uneven" in2="grainA" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}
