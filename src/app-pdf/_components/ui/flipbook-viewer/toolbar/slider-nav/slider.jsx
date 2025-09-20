// 'use client'
// import { cn } from '@/app-pdf/_lib/utils';
// import React, { useState, useEffect, useRef } from 'react';
// import Draggable from 'react-draggable';
// import HoverItem from './hover-item';
// import { useDebounce } from '@/app-pdf/_hooks/use-debounce';

// const Slider = ({ maxSlide = 10, currentSlide, onSlideChange, totalPages }) => {
//     const [value, setValue] = useState(1);
//     const [hoverValue, setHoverValue] = useState(null);
//     const [thumbPosition, setThumbPosition] = useState(0);
//     const [dragging, setDragging] = useState(false);
//     const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });
//     const sliderRef = useRef(null);
//     const tooltipRef = useRef(null);

//     // Update thumb position on value & screen size change >>>>>>>>>
//     useEffect(() => {
//         const updateThumbPosition = () => {
//             if (sliderRef.current && !dragging) {
//                 const sliderRect = sliderRef.current.getBoundingClientRect();
//                 const sliderWidth = sliderRect.width;
//                 const newPosition = ((value - 1) / (maxSlide - 1)) * sliderWidth;
//                 setThumbPosition(newPosition);
//             }
//         };
//         updateThumbPosition();
//         window.addEventListener('resize', updateThumbPosition);
//         return () => window.removeEventListener('resize', updateThumbPosition);
//     }, [value, maxSlide, dragging]);

//     // Handle dragging the thumb >>>>>>>>>
//     const handleDrag = (e, data) => {
//         if (sliderRef.current) {
//             const sliderRect = sliderRef.current.getBoundingClientRect();
//             const sliderWidth = sliderRect.width;
//             const offsetX = data.x;
//             const thumbWidth = data.node.clientWidth;
//             const newValue = Math.min(
//                 Math.max(1, Math.round((offsetX / (sliderWidth - thumbWidth)) * (maxSlide - 1) + 1)),
//                 maxSlide
//             );
//             setValue(newValue);
//             setHoverValue(newValue);
//             const tooltipWidth = tooltipRef.current.getBoundingClientRect().width;
//             const tooltipHeight = tooltipRef.current.getBoundingClientRect().height;
//             const tooltipLeft = Math.max(0, Math.min(offsetX - tooltipWidth / 2, sliderWidth - tooltipWidth));
//             const tooltipTop = Math.max(0, Math.min(-20 - tooltipHeight / 2, sliderRect.height - tooltipHeight));
//             setTooltipPosition({ left: tooltipLeft, top: tooltipTop });
//         }
//     };

//     // Handle onClick to change slide >>>>>>>>>
//     const handleSlideChange = (e) => {
//         if (sliderRef.current) {
//             const rect = sliderRef.current.getBoundingClientRect();
//             const clickedValue = Math.min(
//                 Math.max(1, Math.round(((e.clientX - rect.left) / rect.width) * (maxSlide - 1) + 1)),
//                 maxSlide
//             );
//             setValue(clickedValue);
//         }
//     }

//     // Handle hover value tooltip >>>>>>>>>
//     const handlePointerMove = (e) => {
//         if (sliderRef.current && tooltipRef.current && !dragging) {
//             const rect = sliderRef.current.getBoundingClientRect();
//             const hoverValue = Math.min(
//                 Math.max(1, Math.round(((e.clientX - rect.left) / rect.width) * (maxSlide - 1) + 1)),
//                 maxSlide
//             );
//             setHoverValue(hoverValue);
//             const tooltipWidth = tooltipRef.current.getBoundingClientRect().width;
//             const tooltipHeight = tooltipRef.current.getBoundingClientRect().height;
//             const tooltipLeft = Math.max(0, Math.min(e.clientX - rect.left - tooltipWidth / 2, rect.width - tooltipWidth));
//             const tooltipTop = Math.max(0, Math.min(e.clientY - rect.top - 20 - tooltipHeight / 2, rect.height - tooltipHeight));
//             setTooltipPosition({ left: tooltipLeft, top: tooltipTop });
//         }
//     };

//     // Hide hover value tooltip >>>>>>>>>
//     const handlePointerLeave = () => {
//         setHoverValue(null);
//     };

//     // Hide hover value tooltip on drag end >>>>>>>>>
//     useEffect(() => {
//         if (!dragging) {
//             handlePointerLeave();
//         }
//     }, [dragging]);

//     // Update value on slide change >>>>>>>>>
//     useEffect(() => {
//         setValue(currentSlide);
//     }, [currentSlide]);

//     // Update debounced value on slide change >>>>>>>>>
//     const debouncedValue = useDebounce(value, 500);
//     useEffect(() => {
//         onSlideChange(debouncedValue);
//     }, [debouncedValue, onSlideChange]);
//     return (
//         <div className="py-4">
//             <div
//                 ref={sliderRef}
//                 className="relative w-full h-1 bg-foreground rounded-full"
//                 onPointerMove={handlePointerMove}
//                 onPointerLeave={handlePointerLeave}
//                 onPointerCancel={handlePointerLeave}
//             >
//                 <Draggable
//                     axis="x"
//                     bounds="parent"
//                     position={{ x: thumbPosition, y: 0 }}
//                     onStart={() => setDragging(true)}
//                     onDrag={handleDrag}
//                     onStop={() => setDragging(false)}
//                 >
//                     <div className="absolute z-20 size-1 bg-primary rounded-full cursor-pointer">
//                         <div className={cn("size-3 hover:size-4 bg-primary absolute -top-1 hover:-top-1.5 -left-1 hover:-left-1.5 rounded-full transition-all", dragging && 'w-3 h-3 -left-1.5 -top-1.5 rounded-full')}></div>
//                     </div>
//                 </Draggable>
//                 {/* // Click to change slide >>>>>>>>> */}
//                 <div
//                     className="absolute inset-0 cursor-pointer w-full h-3 top-1/2 -translate-y-1/2 bg-transparent"
//                     onClick={handleSlideChange}
//                 />
//                 {/* // Tooltip for hover value >>>>>>>>> */}
//                 <div
//                     ref={tooltipRef}
//                     className={cn('bg-primary/20 backdrop-blur-sm text-white rounded p-2 text-xs w-fit h-fit', hoverValue === null && 'opacity-0 w-0 h-0 select-none')}
//                     style={{ position: 'absolute', left: tooltipPosition.left, bottom: '20px' }}
//                 >
//                     <HoverItem
//                         slide={hoverValue}
//                         totalPages={totalPages}
//                         totalSlides={maxSlide}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Slider;


'use client'
import { cn } from '@/app-pdf/_lib/utils'
import React, { useState, useEffect, useRef } from 'react'
import Draggable from 'react-draggable'
import HoverItem from './hover-item'
import { useDebounce } from '@/app-pdf/_hooks/use-debounce'

const Slider = ({ maxSlide = 10, currentSlide, onSlideChange, totalPages }) => {
  const [value, setValue] = useState(1)
  const [hoverValue, setHoverValue] = useState(null)
  const [thumbPosition, setThumbPosition] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 })

  const sliderRef = useRef(null)
  const tooltipRef = useRef(null)

  // ⭐ NEW: give Draggable an explicit nodeRef and attach it to the draggable element
  const thumbRef = useRef(null)

  // Update thumb position on value & screen size change
  useEffect(() => {
    const updateThumbPosition = () => {
      if (sliderRef.current && !dragging) {
        const sliderRect = sliderRef.current.getBoundingClientRect()
        const sliderWidth = sliderRect.width
        const newPosition = ((value - 1) / (maxSlide - 1)) * sliderWidth
        setThumbPosition(newPosition)
      }
    }
    updateThumbPosition()
    window.addEventListener('resize', updateThumbPosition)
    return () => window.removeEventListener('resize', updateThumbPosition)
  }, [value, maxSlide, dragging])

  // Handle dragging the thumb
  const handleDrag = (e, data) => {
    if (!sliderRef.current) return

    const sliderRect = sliderRef.current.getBoundingClientRect()
    const sliderWidth = sliderRect.width

    // ⭐ UPDATED: use thumbRef instead of data.node to avoid findDOMNode
    const thumbWidth = thumbRef.current ? thumbRef.current.clientWidth : 0

    // data.x is the left offset within bounds="parent"
    const offsetX = data.x

    const newValue = Math.min(
      Math.max(1, Math.round((offsetX / (sliderWidth - thumbWidth)) * (maxSlide - 1) + 1)),
      maxSlide
    )
    setValue(newValue)
    setHoverValue(newValue)

    if (tooltipRef.current) {
      const tooltipWidth = tooltipRef.current.getBoundingClientRect().width
      const tooltipHeight = tooltipRef.current.getBoundingClientRect().height
      const tooltipLeft = Math.max(0, Math.min(offsetX - tooltipWidth / 2, sliderWidth - tooltipWidth))
      const tooltipTop = Math.max(0, Math.min(-20 - tooltipHeight / 2, sliderRect.height - tooltipHeight))
      setTooltipPosition({ left: tooltipLeft, top: tooltipTop })
    }
  }

  // Click to change slide
  const handleSlideChange = (e) => {
    if (!sliderRef.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    const clickedValue = Math.min(
      Math.max(1, Math.round(((e.clientX - rect.left) / rect.width) * (maxSlide - 1) + 1)),
      maxSlide
    )
    setValue(clickedValue)
  }

  // Hover tooltip
  const handlePointerMove = (e) => {
    if (!sliderRef.current || !tooltipRef.current || dragging) return
    const rect = sliderRef.current.getBoundingClientRect()
    const hv = Math.min(
      Math.max(1, Math.round(((e.clientX - rect.left) / rect.width) * (maxSlide - 1) + 1)),
      maxSlide
    )
    setHoverValue(hv)
    const tooltipWidth = tooltipRef.current.getBoundingClientRect().width
    const tooltipHeight = tooltipRef.current.getBoundingClientRect().height
    const tooltipLeft = Math.max(0, Math.min(e.clientX - rect.left - tooltipWidth / 2, rect.width - tooltipWidth))
    const tooltipTop = Math.max(0, Math.min(e.clientY - rect.top - 20 - tooltipHeight / 2, rect.height - tooltipHeight))
    setTooltipPosition({ left: tooltipLeft, top: tooltipTop })
  }

  const handlePointerLeave = () => setHoverValue(null)

  useEffect(() => {
    if (!dragging) handlePointerLeave()
  }, [dragging])

  useEffect(() => {
    setValue(currentSlide)
  }, [currentSlide])

  const debouncedValue = useDebounce(value, 500)
  useEffect(() => {
    onSlideChange(debouncedValue)
  }, [debouncedValue, onSlideChange])

  return (
    <div className="py-4">
      <div
        ref={sliderRef}
        className="relative w-full h-1 bg-transparent rounded-full"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerLeave}
      >
        <Draggable
          axis="x"
          bounds="parent"
          position={{ x: thumbPosition, y: 0 }}
          onStart={() => setDragging(true)}
          onDrag={handleDrag}
          onStop={() => setDragging(false)}
          nodeRef={thumbRef}   // ⭐ tell react-draggable which DOM node to use
        >
          <div
            ref={thumbRef}     // ⭐ attach the same ref here
            className="absolute z-20 size-1 bg-primary rounded-full cursor-pointer"
          >
            <div className={cn(
              "size-3 hover:size-4 bg-primary absolute -top-1 hover:-top-1.5 -left-1 hover:-left-1.5 rounded-full transition-all",
              dragging && 'w-3 h-3 -left-1.5 -top-1.5 rounded-full'
            )} />
          </div>
        </Draggable>

        {/* Click to change slide */}
        <div
          className="absolute inset-0 cursor-pointer w-full h-3 top-1/2 -translate-y-1/2 bg-transparent"
          onClick={handleSlideChange}
        />

        {/* Tooltip for hover value */}
        <div
          ref={tooltipRef}
          className={cn('bg-primary/20 backdrop-blur-sm text-white rounded p-2 text-xs w-fit h-fit', hoverValue === null && 'opacity-0 w-0 h-0 select-none')}
          style={{ position: 'absolute', left: tooltipPosition.left, bottom: '20px' }}
        >
          <HoverItem
            slide={hoverValue}
            totalPages={totalPages}
            totalSlides={maxSlide}
          />
        </div>
      </div>
    </div>
  )
}

export default Slider
