import React, { useState, useRef, useCallback } from "react";
import _debounce from 'lodash/debounce';
import Refresh from '@icons/refresh.svg?react';
import Close from '@icons/close.svg?react';
import Left from '@icons/left.svg?react';
import Right from '@icons/right.svg?react';
import {
  Modal,
  ModalContent,
  Button,
  useDisclosure,
} from "@heroui/react";
import Image from './Image.tsx';

export default function App({ members }) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [mems, setMems] = useState(members);
  const [angle, setAngle] = useState(0);
  const [current, setCurrent] = useState();
  const refresh = useCallback(_debounce(() => {
    setMems([...mems.sort(() => Math.random() - 0.5)])
    setAngle(prev => prev + 720);
  }, 1000, { leading: true, trailing: false }), []);
  const debouncedSetCurrent = useCallback(
    _debounce((value) => {
      setCurrent(value);
    }, 300, {
      leading: true,
      trailing: false
    }),
    []
  );
  return (
    <div className="relative gap-1 pt-4 columns-2 sm:columns-4 xl:columns-6">
      {
        !isOpen && <Button
          onPress={() => refresh()}
          className="fixed z-10 top-[95dvh] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-tansform duration-1000 hover:scale-150"
          isIconOnly
          aria-label="refush"
          variant="faded"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <Refresh
            className="text-sm"
          />
        </Button>
      }
      {mems.map((mem, idx) => (
        <div key={mem.name} className="relative group overflow-hidden mb-1 shadow-xl">
          <Image
            imageInfo={mem}
            src={mem.name}
            classNames={{
              img: "transition duration-300 ease-in-out active:scale-108 hover:scale-108 object-cover filter grayscale-95 transition duration-500 group-hover:grayscale-0"
            }}
            onTouchStart={e => e.currentTarget.classList.remove('grayscale-95')}
            onTouchEnd={e => e.currentTarget.classList.add('grayscale-95')}
            onClick={() => (setCurrent(idx), onOpen())}
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
          base: "w-full h-full object-cover object-center max-w-full max-h-full !m-0",
          closeButton: "size-10 min-w-[unset] opacity-80 fixed z-99 top-[95dvh] left-1/2 -translate-x-1/2 -translate-y-1/2",
          backdrop: "bg-[#292f46]/60 backdrop-opacity-40",
        }}
        closeButton={
          <Button
            isIconOnly
            aria-label="close"
            variant="faded"
          >
            <Close
              className="text-sm scale-150"
              style={{ transform: `rotate(${angle}deg)` }}
            />
          </Button>
        }
      >
        <ModalContent>
          {(onClose) => (
            <>
              <Button
                onPress={() => debouncedSetCurrent(current - 1 < 0 ? mems.length - 1 : current - 1)}
                className="size-8 min-w-[unset] fixed z-99 top-1/2 left-[1dvw] -translate-y-1/2 opacity-80"
                isIconOnly
                aria-label="left"
                variant="faded"
              >
                <Left />
              </Button>
              <picture class="w-full h-full">
                <source srcSet={`${mems[current].name}.avif`} type="image/avif" />
                <source srcSet={`${mems[current].name}.webp`} type="image/webp" />
                <img
                  className="max-w-full max-h-full w-[90dvw] h-[90dvh] object-contain m-auto mt-[5dvh]"
                  src={`${mems[current].name}.webp`}
                  onContextMenu={e => e.preventDefault()}
                  onTouchStart={e => e.preventDefault()}
                  onTouchEnd={e => e.preventDefault()}
                />
              </picture>
              <Button
                onPress={() => debouncedSetCurrent(current + 1 >= mems.length ? 0 : current + 1)}
                className="size-8 min-w-[unset] fixed z-99 top-1/2 right-[1dvw] -translate-y-1/2 opacity-80"
                isIconOnly
                aria-label="right"
                variant="faded"
              >
                <Right className="text-sm" />
              </Button>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
};
