import { bem, withBem } from '@bru-public/oc-utils';

const layoutBem = 'layout';
export const LayoutAtom = withBem(bem(layoutBem))('div');

export const LayoutContainerAtom = withBem(bem(layoutBem, 'container'))('div');

export const LayoutNavbarAtom = withBem(bem(layoutBem, 'navbar'))('div');

export const LayoutHeaderAtom = withBem(bem(layoutBem, 'header-section-content'))('header');
export const LayoutMainContentAtom = withBem(bem(layoutBem, 'main-content'))('main');

export const LayoutLoadingWrapperAtom = withBem(bem(layoutBem, 'loading-wrapper'))('div');

export const LayoutGridAtom = withBem(bem(layoutBem, 'grid'))('div');
export const LayoutGridColumnAtom = withBem(bem(layoutBem, 'grid-column'))('span');
export const LayoutGridToggleAtom = withBem(bem(layoutBem, 'grid-toggle'))('button');