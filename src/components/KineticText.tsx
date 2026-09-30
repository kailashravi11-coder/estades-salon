import React from 'react';

type As = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';

export interface KineticTextProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  as?: As;
  className?: string;
  style?: React.CSSProperties;
}

export function KineticText({
  text,
  as: Tag = 'h1',
  className = '',
  style,
  ...rest
}: KineticTextProps) {
  const mergedStyle = {
    '--hover-padding': 'calc(1em / 16)',
    '--text-stroke-width': 'calc(1em * 125 / 6000)',
    ...(style as React.CSSProperties | undefined),
  } as React.CSSProperties;

  // Split by words to ensure clean wrapping while animating individual characters
  const words = text.split(' ');

  return (
    <Tag
      {...rest}
      className={`inline-flex flex-wrap items-baseline select-none ${className}`}
      style={mergedStyle}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-flex whitespace-nowrap">
          {word.split('').map((letter, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="kinetic-char [will-change:font-weight,-webkit-text-stroke-width,padding] [-webkit-text-stroke-color:transparent] [-webkit-text-stroke-width:var(--text-stroke-width)] [transition:font-weight_0.4s,_-webkit-text-stroke-color_0.4s,_padding_0.4s] hover:[padding-inline:var(--hover-padding)] hover:font-[900] hover:[-webkit-text-stroke-color:currentcolor] hover:[-webkit-text-stroke-width:calc(var(--text-stroke-width)*2)] has-[+span+span:hover]:font-[400] has-[+span:hover]:[padding-inline:var(--hover-padding)] has-[+span:hover]:font-[600] [:hover+&]:[padding-inline:var(--hover-padding)] [:hover+&]:font-[600] [:hover+span+&]:font-[400]"
            >
              {letter}
            </span>
          ))}
          {wordIdx < words.length - 1 && (
            <span className="whitespace-pre">&nbsp;</span>
          )}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </Tag>
  );
}

export default KineticText;
