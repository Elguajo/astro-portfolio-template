import React, { useState, useCallback, useMemo } from 'react';
import _debounce from 'lodash/debounce';
import { Modal, ModalContent, Button, useDisclosure } from '@heroui/react';
import Image from '@/components/common/Image.tsx';
import ErrorBoundaryWrapper from '@/components/common/ErrorBoundaryWrapper.tsx';
import { preloadGalleryImages } from '@/lib/imagePreloader';

interface Member {
  name: string;
  width: number;
  height: number;
}

interface AppProps {
  members: Member[];
}

export default function App({ members }: AppProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [mems, setMems] = useState(members);
  const [angle, setAngle] = useState(0);
  const [current, setCurrent] = useState<number | undefined>();

  // Memoize processed members data to avoid recalculation
  const processedMembers = useMemo(() => {
    return mems.map(member => ({
      ...member,
      aspectRatio: member.width / member.height,
      // Pre-calculate optimized image paths
      webpSrc: `${member.name}.webp`,
      avifSrc: `${member.name}.avif`,
    }));
  }, [mems]);
  const refresh = useCallback(
    _debounce(
      () => {
        setMems([...mems.sort(() => Math.random() - 0.5)]);
        setAngle(prev => prev + 720);
      },
      1000,
      { leading: true, trailing: false }
    ),
    []
  );
  const debouncedSetCurrent = useCallback(
    _debounce(
      (value: number) => {
        setCurrent(value);
        
        // Preload adjacent images when navigating
        if (isOpen) {
          const imageSrcs = processedMembers.map(member => member.name);
          preloadGalleryImages(value, imageSrcs, { priority: 'high' });
        }
      },
      300,
      {
        leading: true,
        trailing: false,
      }
    ),
    [isOpen, processedMembers]
  );
  return (
    <ErrorBoundaryWrapper
      fallback={
        <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="text-center">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Portfolio temporarily unavailable
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Please refresh the page to try again.
            </p>
          </div>
        </div>
      }
    >
      <div className="relative gap-1 pt-4 columns-2 sm:columns-4 xl:columns-6">
      {!isOpen && (
        <Button
          onPress={() => refresh()}
          className="hidden bg-white border border-black rounded-full fixed z-10 top-[95dvh] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-tansform duration-1000 hover:scale-150 p-0"
          isIconOnly
          aria-label="refush"
          variant="faded"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <span className="icon-[material-symbols-light--refresh-rounded] size-full" />
        </Button>
      )}
      {processedMembers.map((mem, idx: number) => (
        <div
          key={mem.name}
          className="relative group overflow-hidden mb-1 shadow-xl"
        >
          <Image
            imageInfo={mem}
            src={mem.name}
            lazy={true}
            preloadOnHover={true}
            classNames={{
              img: 'transition duration-300 ease-in-out active:scale-108 hover:scale-108 object-cover filter grayscale-95 transition duration-500 group-hover:grayscale-0',
            }}
            onTouchStart={(e: React.TouchEvent) => e.currentTarget.classList.remove('grayscale-95')}
            onTouchEnd={(e: React.TouchEvent) => e.currentTarget.classList.add('grayscale-95')}
            onClick={() => {
              setCurrent(idx);
              onOpen();
              
              // Preload adjacent images when opening modal
              const imageSrcs = processedMembers.map(member => member.name);
              preloadGalleryImages(idx, imageSrcs, { priority: 'high' });
            }}
          />
        </div>
      ))}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        scrollBehavior="inside"
        backdrop="opaque"
        classNames={{
          base: 'w-full h-full object-cover object-center max-w-full max-h-full !m-0',
          closeButton:
            'size-10 min-w-[unset] opacity-80 fixed z-99 top-4 right-4',
          backdrop: 'bg-[#292f46]/60 backdrop-opacity-40',
        }}
        closeButton={
          <Button isIconOnly aria-label="close" variant="faded">
            <span
              className="icon-[carbon--close-filled] bg-white size-full scale-150"
              style={{ transform: `rotate(${angle}deg)` }}
            />
          </Button>
        }
      >
        <ModalContent>
          {_onClose => (
            <>
              <Button
                onPress={() =>
                  current !== undefined && debouncedSetCurrent(
                    current - 1 < 0 ? mems.length - 1 : current - 1
                  )
                }
                className="size-8 min-w-[unset] fixed z-99 top-1/2 left-[1dvw] -translate-y-1/2 opacity-80"
                isIconOnly
                aria-label="left"
                variant="faded"
              >
                <span className="icon-[pepicons-pop--angle-left-circle-filled] bg-white size-full" />
              </Button>
              <picture className="w-full h-full">
                {current !== undefined && (
                  <>
                    <source
                      srcSet={processedMembers[current].avifSrc}
                      type="image/avif"
                    />
                    <source
                      srcSet={processedMembers[current].webpSrc}
                      type="image/webp"
                    />
                    <img
                      className="max-w-full max-h-full w-[90dvw] h-[90dvh] object-contain m-auto mt-[5dvh]"
                      src={processedMembers[current].webpSrc}
                      alt={`Portfolio work: ${processedMembers[current].name.split('/').pop()}`}
                      onContextMenu={e => e.preventDefault()}
                      onTouchStart={e => e.preventDefault()}
                      onTouchEnd={e => e.preventDefault()}
                    />
                  </>
                )}
              </picture>
              <Button
                onPress={() =>
                  current !== undefined && debouncedSetCurrent(
                    current + 1 >= mems.length ? 0 : current + 1
                  )
                }
                className="size-8 min-w-[unset] fixed z-99 top-1/2 right-[1dvw] -translate-y-1/2 opacity-80"
                isIconOnly
                aria-label="right"
                variant="faded"
              >
                <span className="icon-[pepicons-pop--angle-right-circle-filled] bg-white size-full" />
              </Button>
            </>
          )}
        </ModalContent>
      </Modal>
      </div>
    </ErrorBoundaryWrapper>
  );
}
