'use client';

import { useRef, useEffect, useState, ReactNode, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { motion } from 'framer-motion';

interface VirtualGridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  columns?: { md: number; lg: number };
  estimateHeight?: number;
  className?: string;
  gap?: number;
}

export function VirtualGrid<T>({
  items,
  renderItem,
  columns = { md: 2, lg: 3 },
  estimateHeight = 400,
  className = '',
  gap = 16
}: VirtualGridProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const columnCountRef = useRef(1);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (parentRef.current) {
        const width = parentRef.current.clientWidth;
        if (width >= 1024) columnCountRef.current = columns.lg;
        else if (width >= 768) columnCountRef.current = columns.md;
        else columnCountRef.current = 1;
      }
    });

    if (parentRef.current) {
      const width = parentRef.current.clientWidth;
      if (width >= 1024) columnCountRef.current = columns.lg;
      else if (width >= 768) columnCountRef.current = columns.md;
      else columnCountRef.current = 1;
      resizeObserver.observe(parentRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [columns]);

  const rowCount = Math.ceil(items.length / columnCountRef.current);

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateHeight,
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();

  return (
    <div ref={parentRef} className={className} style={{ overflow: 'auto' }}>
      <div
        style={{
          height: `${totalSize}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualItems.map((virtualRow) => {
          const startIndex = virtualRow.index * columnCountRef.current;
          const rowItems = items.slice(startIndex, startIndex + columnCountRef.current);

          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div
                className={`grid gap-${gap > 0 ? gap / 4 : 0}`}
                style={{
                  gridTemplateColumns: `repeat(${columnCountRef.current}, minmax(0, 1fr))`,
                  height: '100%',
                }}
              >
                {rowItems.map((item, colIndex) => (
                  <motion.div
                    key={startIndex + colIndex}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderItem(item, startIndex + colIndex)}
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
