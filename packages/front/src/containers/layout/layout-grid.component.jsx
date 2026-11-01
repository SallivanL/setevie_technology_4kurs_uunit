import { useLayoutEffect, useRef, useState } from 'react';
import {
  LayoutGridAtom,
  LayoutGridColumnAtom,
  LayoutGridToggleAtom,
} from './layout.atoms.jsx';
import './layout.css';

const GRID_COLUMNS = 12;
const GRID_GAP = 8;

/**
 * Визуальная 12-колоночная сетка для LayoutContainerAtom.
 * Компонент должен быть непосредственным дочерним элементом LayoutContainerAtom.
 */
export const LayoutGrid = () => {
  const [isVisible, setIsVisible] = useState(true);
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const gridElement = gridRef.current;
    const containerElement = gridElement?.parentElement;

    if (!gridElement || !containerElement) {
      return undefined;
    }

    const updateGridGeometry = () => {
      const rect = containerElement.getBoundingClientRect();
      const styles = window.getComputedStyle(containerElement);

      const borderLeft = Number.parseFloat(styles.borderLeftWidth) || 0;
      const borderRight = Number.parseFloat(styles.borderRightWidth) || 0;
      const paddingLeft = Number.parseFloat(styles.paddingLeft) || 0;
      const paddingRight = Number.parseFloat(styles.paddingRight) || 0;

      // Берём именно content box LayoutContainerAtom, а не ширину viewport.
      const contentLeft = rect.left + borderLeft + paddingLeft;
      const contentWidth = Math.max(
        0,
        rect.width - borderLeft - borderRight - paddingLeft - paddingRight,
      );

      gridElement.style.left = `${contentLeft}px`;
      gridElement.style.width = `${contentWidth}px`;

      const columnWidth = Math.max(
        0,
        (contentWidth - GRID_GAP * (GRID_COLUMNS - 1)) / GRID_COLUMNS,
      );
      const columns = gridElement.children;

      Array.from(columns).forEach((column, index) => {
        column.style.left = `${index * (columnWidth + GRID_GAP)}px`;
        column.style.width = `${columnWidth}px`;
      });
    };

    updateGridGeometry();

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(updateGridGeometry)
      : null;

    resizeObserver?.observe(containerElement);
    window.addEventListener('resize', updateGridGeometry);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('resize', updateGridGeometry);
    };
  }, []);

  return (
    <>
      <LayoutGridAtom
        ref={gridRef}
        data-visible={isVisible}
        aria-hidden="true"
      >
        {Array.from({ length: GRID_COLUMNS }, (_, index) => (
          <LayoutGridColumnAtom key={index}>
            {index + 1}
          </LayoutGridColumnAtom>
        ))}
      </LayoutGridAtom>

      <LayoutGridToggleAtom
        type="button"
        aria-pressed={isVisible}
        onClick={() => setIsVisible((visible) => !visible)}
      >
        {isVisible ? 'Скрыть сетку' : 'Показать сетку'}
      </LayoutGridToggleAtom>
    </>
  );
};
