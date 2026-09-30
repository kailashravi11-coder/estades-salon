import React, { memo, useId, type ReactNode } from 'react';
import {
  AnimatePresence,
  motion,
  type MotionProps,
  type Variants,
} from 'motion/react';
import { cn } from '../lib/utils';

type AnimationType = 'text' | 'word' | 'character' | 'line';
type AnimationVariant =
  | 'fadeIn'
  | 'blurIn'
  | 'blurInUp'
  | 'blurInDown'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scaleUp'
  | 'scaleDown';

const motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span,
} as const;

type MotionElementType = keyof typeof motionElements;

export interface TextAnimateProps extends Omit<MotionProps, 'children'> {
  /**
   * The text or node content to animate
   */
  children: React.ReactNode;
  /**
   * The class name to be applied to the component
   */
  className?: string;
  /**
   * The class name to be applied to each segment
   */
  segmentClassName?: string;
  /**
   * The delay before the animation starts
   */
  delay?: number;
  /**
   * The duration of the animation
   */
  duration?: number;
  /**
   * Custom motion variants for the animation
   */
  variants?: Variants;
  /**
   * The element type to render
   */
  as?: MotionElementType;
  /**
   * How to split the text ("text", "word", "character", "line")
   */
  by?: AnimationType;
  /**
   * Whether to trigger animation on scroll into view
   */
  startOnView?: boolean;
  /**
   * Whether to animate only once
   */
  once?: boolean;
  /**
   * Animation preset name
   */
  animation?: AnimationVariant;
  /**
   * Whether to enable accessibility features
   */
  accessible?: boolean;
}

const defaultContainerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const defaultItemAnimationVariants: Record<
  AnimationVariant,
  { container: Variants; item: Variants }
> = {
  fadeIn: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 },
      },
      exit: {
        opacity: 0,
        y: 20,
        transition: { duration: 0.3 },
      },
    },
  },
  blurIn: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(10px)' },
      show: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        },
      },
      exit: {
        opacity: 0,
        filter: 'blur(10px)',
        transition: { duration: 0.3 },
      },
    },
  },
  blurInUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(10px)', y: 20 },
      show: {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: {
          y: { duration: 0.4 },
          opacity: { duration: 0.5 },
          filter: { duration: 0.4 },
        },
      },
    },
  },
  blurInDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(10px)', y: -20 },
      show: {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: {
          y: { duration: 0.4 },
          opacity: { duration: 0.5 },
          filter: { duration: 0.4 },
        },
      },
    },
  },
  slideUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: 20, opacity: 0 },
      show: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.4 },
      },
      exit: {
        y: -20,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  slideDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: -20, opacity: 0 },
      show: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.4 },
      },
      exit: {
        y: 20,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  slideLeft: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: 20, opacity: 0 },
      show: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.4 },
      },
      exit: {
        x: -20,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  slideRight: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: -20, opacity: 0 },
      show: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.4 },
      },
      exit: {
        x: 20,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  scaleUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { scale: 0.5, opacity: 0 },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.4,
          scale: {
            type: 'spring',
            damping: 15,
            stiffness: 300,
          },
        },
      },
      exit: {
        scale: 0.5,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
  scaleDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { scale: 1.5, opacity: 0 },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.4,
          scale: {
            type: 'spring',
            damping: 15,
            stiffness: 300,
          },
        },
      },
      exit: {
        scale: 1.5,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
};

const TextAnimateBase = ({
  children,
  delay = 0,
  duration = 0.5,
  variants,
  className,
  segmentClassName,
  as: Component = 'p',
  startOnView = true,
  once = true,
  by = 'text',
  animation = 'blurIn',
  accessible = true,
  style,
  ...props
}: TextAnimateProps) => {
  const instanceId = useId();
  const MotionComponent = motionElements[Component] || motion.p;

  const isString = typeof children === 'string';
  let segments: string[] = [];
  if (isString) {
    switch (by) {
      case 'word':
        segments = children.split(/(\s+)/);
        break;
      case 'character':
        segments = children.split('');
        break;
      case 'line':
        segments = children.split('\n');
        break;
      case 'text':
      default:
        segments = [children];
        break;
    }
  } else {
    segments = [''];
  }

  const animationPreset = defaultItemAnimationVariants[animation] || defaultItemAnimationVariants.blurIn;

  const finalVariants = variants
    ? {
        container: {
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              opacity: { duration: 0.01, delay },
              delayChildren: delay,
              staggerChildren: duration / Math.max(segments.length, 1),
            },
          },
          exit: {
            opacity: 0,
            transition: {
              staggerChildren: duration / Math.max(segments.length, 1),
              staggerDirection: -1,
            },
          },
        },
        item: variants,
      }
    : {
        container: {
          ...animationPreset.container,
          show: {
            ...animationPreset.container.show,
            transition: {
              delayChildren: delay,
              staggerChildren: duration / Math.max(segments.length, 1),
            },
          },
          exit: {
            ...animationPreset.container.exit,
            transition: {
              staggerChildren: duration / Math.max(segments.length, 1),
              staggerDirection: -1,
            },
          },
        },
        item: animationPreset.item,
      };

  return (
    <AnimatePresence mode="popLayout">
      <MotionComponent
        variants={finalVariants.container}
        initial="hidden"
        whileInView={startOnView ? 'show' : undefined}
        animate={startOnView ? undefined : 'show'}
        exit="exit"
        className={cn('whitespace-pre-wrap', className)}
        viewport={{ once }}
        aria-label={accessible ? children : undefined}
        style={style}
        {...props}
      >
        {accessible && isString && <span className="sr-only">{children}</span>}
        {isString ? (
          segments.map((segment, i) => (
            <motion.span
              key={`${instanceId}-${by}-${i}`}
              variants={finalVariants.item}
              className={cn(
                by === 'line' ? 'block' : by === 'text' ? 'inline' : 'inline-block whitespace-pre',
                segmentClassName
              )}
              aria-hidden={accessible ? true : undefined}
            >
              {segment}
            </motion.span>
          ))
        ) : (
          <motion.span variants={finalVariants.item} className={cn('inline', segmentClassName)}>
            {children}
          </motion.span>
        )}
      </MotionComponent>
    </AnimatePresence>
  );
};

export const TextAnimate = memo(TextAnimateBase);
export default TextAnimate;
